import CurrencyCode from "@/enums/enums"
import { z } from "zod"

export const interestRateFormSchema = z.object({
    startDate: z.date({
        required_error: "Start date required"
    }),
    endDate: z.date({
        required_error: "End date required"
    }),
    currency: z.nativeEnum(CurrencyCode),
    principal: z.number({
        required_error: "Principal required"
    }).positive("Principal must be a positive number."),
    baseInterestRate: z.number({
        required_error: "Base rate required"
    })
    .min(0, { message: "Base interest rate cannot be negative." }),
    margin: z.number({required_error: "Margin required"})
    .min(0, { message: "Margin cannot be negative." }),
}).refine(
  (data) => data.endDate > data.startDate,
  {
    path: ["endDate"],
    message: "End date must be after the start date.",
  }
);

