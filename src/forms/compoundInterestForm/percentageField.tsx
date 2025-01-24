import PercentageInput from "@/components/percentageInput";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
}

const PercentageField = <T extends FieldValues>({
  control,
  name,
  label,
}: Props<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <PercentageInput field={field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default PercentageField;
