import { Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useCreateTask } from "~/hooks/tasks/use-create-task";

import { InputField } from "../form/input-filed";
import { ErrorOrNull } from "../misc/error-or-null";

type TaskCreateForm = {
  title: string;
};

export function TaskCreateForm() {
  const createTask = useCreateTask();

  const { register, handleSubmit, reset } = useForm<TaskCreateForm>();

  async function onSubmit(v: TaskCreateForm) {
    await createTask.mutate(v);
    reset();
  }

  return (
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
  );
}
