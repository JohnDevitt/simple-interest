import { addDays, differenceInDays, isLeapYear } from "date-fns";
import { daysToYearsAndDays } from "./date";

const DAYS_IN_A_NORMAL_YEAR = 365 as const;
const DAYS_IN_A_LEAP_YEAR = 366 as const;

export const calculateDailyInterest = (
  principal: number,
  interestRate: number,
  date: Date
) => {
  const annualInterest = (principal * interestRate) / 100;
  if (isLeapYear(date)) return annualInterest / DAYS_IN_A_LEAP_YEAR;
  return annualInterest / DAYS_IN_A_NORMAL_YEAR;
};

export const calculateInterestAccrued = (
  principal: number,
  interestRate: number,
  startDate: Date,
  daysElapsed: number
) => {
  const { years, days } = daysToYearsAndDays(startDate, daysElapsed);

  const annualInterestAmount = (principal * interestRate) / 100;
  const previousYearsInterest = annualInterestAmount * years;

  const dailyInterestAmount = calculateDailyInterest(
    principal,
    interestRate,
    startDate
  );
  const thisYearsInterest = dailyInterestAmount * days;

  return previousYearsInterest + thisYearsInterest;
};

export const calculateSimpleInterest = (
  startDate: Date,
  endDate: Date,
  principal: number,
  baseRate: number,
  margin: number
) => {
  const termInDays = differenceInDays(endDate, startDate) + 1;
  const totalInterestRate = baseRate + margin;
  const dailyInterestWithoutMargin = calculateDailyInterest(
    principal,
    baseRate,
    startDate
  );
  const dailyInterest = calculateDailyInterest(
    principal,
    totalInterestRate,
    startDate
  );

  const loanData = Array.from({ length: termInDays }, (_, daysElapsed) => {
    const date = addDays(startDate, daysElapsed);
    const interestAccrued = calculateInterestAccrued(
      principal,
      totalInterestRate,
      startDate,
      daysElapsed
    );
    return {
      dailyInterestWithoutMargin,
      dailyInterest,
      date,
      daysElapsed,
      interestAccrued,
    };
  });

  return loanData;
};
