import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Input } from "./ui/input";

interface Props<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
}

const PercentageInput = <T extends FieldValues>({ field }: Props<T>) => (
  <div className="flex items-center w-32">
    <Input
      type="number"
      placeholder="25"
      {...field}
      onChange={(event) => field.onChange(Number(event.target.value))}
      className="mr-2"
    />
    <span className="text-gray-500">%</span>
  </div>
);

export default PercentageInput;
