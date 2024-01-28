import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

import { InputField } from "~/components/form/input-filed";
import { Fallback } from "~/components/misc/fallback";
import { useAppToast } from "~/hooks/misc/use-app-toast";
import { createTask, deleteTask, getTasks } from "~/infra/api/tasks";

type CreateTaskForm = {
  title: string;
};

export default function Tasks() {
  const toast = useAppToast();
  const client = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => {
      return getTasks();
    },
    queryKey: ["me", "tasks"],
  });

  const createTaskFn = useMutation({
    mutationFn: (v: CreateTaskForm) => {
      return createTask(v);
    },
    onSuccess: () => {
      toast.success("Created.");
      client.invalidateQueries({
        queryKey: ["me", "tasks"],
      });
    },
  });

  const deleteTaskFn = useMutation({
    mutationFn: (taskId: string) => {
      return deleteTask(taskId);
    },
    onSuccess: () => {
      toast.success("Deleted");
      client.invalidateQueries({
        queryKey: ["me", "tasks"],
      });
    },
  });

  const { register, handleSubmit, reset } = useForm<CreateTaskForm>();

  async function onSubmit(v: CreateTaskForm) {
    await createTaskFn.mutate(v);
    reset();
  }

  async function onDelete(taskId: string) {
    if (window.confirm("Are you sure to delete?")) {
      await deleteTaskFn.mutate(taskId);
    }
  }

  return (
    <Stack py="2">
      <Fallback loading={isLoading} error={error}>
        {tasks?.map((task) => (
          <Fragment key={task.id}>
            <Flex justifyContent="space-between">
              <Box>{task.title}</Box>
              <Box>
                <Menu placement="bottom-end">
                  <MenuButton
                    as={IconButton}
                    icon={<TriangleDownIcon />}
                    size="xs"
                    variant="ghost"
                  />
                  <MenuList>
                    <MenuItem onClick={() => onDelete(task.id)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
            <Divider />
          </Fragment>
        ))}
      </Fallback>

      <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          placeholder="Task title"
          isRequired
          register={register("title")}
        />
        <Button type="submit" colorScheme="blue" size="sm" alignSelf="end">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
