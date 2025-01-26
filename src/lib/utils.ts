import { clsx, type ClassValue } from "clsx"
import { differenceInDays } from "date-fns";
import { twMerge } from "tailwind-merge"
import { daysToYearsAndDays } from "./date";
import CurrencyCode from "@/enums/enums";
import { Loan } from "@/interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateLoanTitle = (loan: Omit<Loan, 'id'>) => {
  const { baseInterestRate, margin, startDate, endDate, currency, principal } = loan
  const totalInterestRate = baseInterestRate + margin;
  const termInDays = differenceInDays(endDate, startDate) + 1;
  const { years, days } = daysToYearsAndDays(startDate, termInDays);
  const titleLength =
    years === 0 ? `${days} days` : `${years} years, ${days} days`;
  return `${currency} ${principal} @ ${totalInterestRate}% for ${titleLength}`
}