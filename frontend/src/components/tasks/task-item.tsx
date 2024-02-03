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

import { useSortable } from "~/hooks/misc/use-sortable";
import { useDeleteTask } from "~/hooks/tasks/use-delete-task";
import { useToggleTaskComplete } from "~/hooks/tasks/use-toggle-task-complete";
import { Task } from "~/infra/api";

type TaskItemProps = {
  task: Task;
  index: number;
  onMove: (prevIndex: number, nextIndex: number) => void;
};

export function TaskItem({ task, index, onMove }: TaskItemProps) {
  const { ref, drop, drag, isDragging } = useSortable({
    sortableItem: { index },
    sortableItemType: "TaskItem",
    onMove,
  });
  drag(drop(ref));

  const deleteTask = useDeleteTask();
  const toggleTaskComplete = useToggleTaskComplete();

  async function onDelete(taskId: string) {
    if (window.confirm("Are you sure to delete?")) {
      await deleteTask.mutate(taskId);
    }
  }

  return (
    <Flex
      justifyContent="space-between"
      alignItems="start"
      opacity={isDragging ? 0 : 1}
    >
      <HStack
        ref={ref}
        flex="1"
        alignItems="start"
        spacing="4"
        py="1"
        cursor="pointer"
      >
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
