import { Button, Divider, Stack } from "@chakra-ui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

import { InputField } from "~/components/form/input-filed";
import { ErrorOrNull } from "~/components/misc/error-or-null";
import { Fallback } from "~/components/misc/fallback";
import { TaskItem } from "~/components/tasks/task-item";
import { useCreateTask } from "~/hooks/tasks/use-create-task";
import { useTasks } from "~/hooks/tasks/use-tasks";

type CreateTaskForm = {
  title: string;
};

export default function Tasks() {
  const { tasks, loading, error } = useTasks();

  const createTask = useCreateTask();

  const { register, handleSubmit, reset } = useForm<CreateTaskForm>();

  async function onSubmit(v: CreateTaskForm) {
    await createTask.mutate(v);
    reset();
  }

  return (
    <Fallback loading={loading} error={error}>
      <Stack py="2">
        {tasks?.map((task) => (
          <Fragment key={task.id}>
            <TaskItem task={task} />
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
