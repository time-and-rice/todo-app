import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaCheck, FaEllipsisVertical } from "react-icons/fa6";

import { useDeleteTask } from "~/hooks/tasks/use-delete-task";
import { useToggleTaskComplete } from "~/hooks/tasks/use-toggle-task-complete";
import { Task } from "~/infra/api";

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  const deleteTask = useDeleteTask();
  const toggleTaskComplete = useToggleTaskComplete();

  async function onDelete(taskId: string) {
    if (window.confirm("Are you sure to delete?")) {
      await deleteTask.mutate(taskId);
    }
  }

  return (
    <Flex justifyContent="space-between" alignItems="start">
      <HStack alignItems="start" spacing="4" py="1">
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
            size="sm"
            variant="ghost"
          />
          <MenuList>
            <MenuItem onClick={() => onDelete(task.id)}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
