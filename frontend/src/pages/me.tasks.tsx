import { Divider, Stack } from "@chakra-ui/react";
import update from "immutability-helper";
import { useEffect, useState } from "react";

import { Fallback } from "~/components/misc/fallback";
import { TaskCreateForm } from "~/components/tasks/task-create-form";
import { TaskItem } from "~/components/tasks/task-item";
import { useTasks } from "~/hooks/tasks/use-tasks";

export default function Tasks() {
  const { tasks: origTasks, loading, error } = useTasks();

  const [tasks, setTasks] = useState(origTasks);

  useEffect(() => {
    setTasks(origTasks);
  }, [origTasks]);

  function onMove(prevIndex: number, nextIndex: number) {
    setTasks((prev) =>
      update(prev, {
        $splice: [
          [prevIndex, 1],
          [nextIndex, 0, prev[prevIndex]],
        ],
      }),
    );
  }

  return (
    <Fallback loading={loading} error={error}>
      <Stack py="2">
        {tasks.map((task, index) => (
          <Stack key={task.id}>
            <TaskItem task={task} index={index} onMove={onMove} />
            <Divider />
          </Stack>
        ))}
        <TaskCreateForm />
      </Stack>
    </Fallback>
  );
}
