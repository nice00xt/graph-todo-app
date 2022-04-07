import { FC, forwardRef } from "react";
type TypeInput = { label: string; errors: object };

export const TextInput: FC<TypeInput> = forwardRef(
  ({ children, label, errors, ...props }, ref: any) => {
    return (
      <div className="flex flex-col mt-4">
        <label className="mb-2">{label}</label>
        <input
          {...props}
          ref={ref}
          className={`input input-bordered ${
            errors?.exampleRequired && "input-error"
          }`}
        />
      </div>
    );
  }
);

export default TextInput;
