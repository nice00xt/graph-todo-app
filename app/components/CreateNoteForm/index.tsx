import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { createNote } from "~/queries/notes";
import TextInput from "../Form/TextInput";

export default function CreateNote({ refetch }: { refetch: any }) {
  const [onCreateNote] = useMutation(createNote);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { title, description } = data;
    try {
      const res = await onCreateNote({
        variables: {
          title,
          description,
        },
      });
    } finally {
      refetch();
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <TextInput
        label="Title"
        errors={errors}
        {...register("title", { required: true })}
      />
      <TextInput
        label="Description"
        errors={errors}
        {...register("description", { required: true })}
      />
      <button type="submit" className="btn btn-primary mt-7">
        Add Note
      </button>
    </form>
  );
}
