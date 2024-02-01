import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaEllipsisVertical } from "react-icons/fa6";

import { InputField } from "~/components/form/input-filed";
import { ErrorOrNull } from "~/components/misc/error-or-null";
import { Fallback } from "~/components/misc/fallback";
import { useCreateTask } from "~/hooks/tasks/use-create-task";
import { useDeleteTask } from "~/hooks/tasks/use-delete-task";
import { useTasks } from "~/hooks/tasks/use-tasks";
import { useToggleTaskComplete } from "~/hooks/tasks/use-toggle-task-complete";

type CreateTaskForm = {
  title: string;
};

export default function Tasks() {
  const { tasks, loading, error } = useTasks();

  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();
  const toggleTaskComplete = useToggleTaskComplete();

  const { register, handleSubmit, reset } = useForm<CreateTaskForm>();

  async function onSubmit(v: CreateTaskForm) {
    await createTask.mutate(v);
    reset();
  }

  async function onDelete(taskId: string) {
    if (window.confirm("Are you sure to delete?")) {
      await deleteTask.mutate(taskId);
    }
  }

  return (
    <Fallback loading={loading} error={error}>
      <Stack py="2">
        {tasks?.map((task) => (
          <Fragment key={task.id}>
            <Flex justifyContent="space-between">
              <HStack>
                {task.status == "Incomplete" && (
                  <Button
                    size="xs"
                    rounded="full"
                    onClick={() => toggleTaskComplete.mutate(task.id)}
                  />
                )}
                {task.status == "Complete" && (
                  <IconButton
                    icon={<FaCheck />}
                    aria-label="fa-check"
                    size="xs"
                    rounded="full"
                    colorScheme="green"
                    onClick={() => toggleTaskComplete.mutate(task.id)}
                  />
                )}
                <Box>{task.title}</Box>
              </HStack>
              <Box>
                <Menu placement="bottom-end">
                  <MenuButton
                    as={IconButton}
                    icon={<FaEllipsisVertical />}
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

        <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
          <ErrorOrNull error={createTask.error} />
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
    </Fallback>
  );
}
