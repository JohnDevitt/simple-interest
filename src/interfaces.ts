
import { z } from "zod";
import { interestRateFormSchema } from "./schemas/compountInterestForm";

export type Loan = z.infer<typeof interestRateFormSchema> & { id: string }