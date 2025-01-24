import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CurrencyCode from "@/enums/enums";
import { useForm } from "react-hook-form";
import { DateField } from "./dateField";
import { interestRateFormSchema } from "@/schemas/compountInterestForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PercentageField from "./percentageField";
import { Button } from "@/components/ui/button";

interface Props {
  onSubmit: (values: {
    startDate: Date;
    endDate: Date;
    currency: CurrencyCode;
    principal: number;
    baseInterestRate: number;
    margin: number;
  }) => void;
}

const CompoundInterestForm = ({ onSubmit }: Props) => {
  const form = useForm<z.infer<typeof interestRateFormSchema>>({
    resolver: zodResolver(interestRateFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col"
      >
        <DateField
          control={form.control}
          name="startDate"
          label="Start Date"
          description="When should the loan start?"
        />

        <DateField
          control={form.control}
          name="endDate"
          label="End Date"
          description="When should the loan end?"
        />

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="principal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Principal</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1000"
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormDescription>How much is the loan for?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            defaultValue={CurrencyCode.USD}
            render={({ field }) => (
              <FormItem className="flex-shrink-0">
                <FormLabel>Currency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={CurrencyCode.USD}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select a verified email to display"
                        defaultValue={CurrencyCode.USD}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(CurrencyCode).map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          <PercentageField
            control={form.control}
            name="baseInterestRate"
            label="Base rate"
          />

          <PercentageField
            control={form.control}
            name="margin"
            label="Margin"
          />
        </div>

        <div>
          <div className="text-muted-foreground italic pt-6">
            All fields required*
          </div>

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default CompoundInterestForm;
