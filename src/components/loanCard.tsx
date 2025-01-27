import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { generateLoanTitle } from "@/lib/utils";
import { Loan } from "@/interfaces";
import { useRouter } from "next/navigation";
import React from "react";
import { calculateSimpleInterest } from "@/lib/simpleInterest";

interface Props {
  loan: Loan;
}

const LoanCard = ({ loan }: Props) => {
  const router = useRouter();
  const loanTitle = generateLoanTitle(loan);
  const { startDate, endDate } = loan;
  const loanData = calculateSimpleInterest(
    loan.startDate,
    loan.endDate,
    loan.principal,
    loan.baseInterestRate,
    loan.margin
  );

  const dailyInterest = loanData[loanData.length - 1].dailyInterest;

  return (
    <Card
      onClick={() => router.push(`/edit/${loan.id}`)}
      className="cursor-pointer"
    >
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{loanTitle}</CardTitle>
          <CardDescription>
            {startDate.toDateString()} - {endDate.toDateString()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 p-6">
        <div className="flex flex-row justify-around">
          <div className="flex flex-1 flex-col items-center justify-center gap-1">
            <span className="text-xs text-muted-foreground">
              Total interest
            </span>
            <span className="font-bold leading-none">
              {loan.currency}{" "}
              {loanData[loanData.length - 1].interestAccrued.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-1 border-l">
            <span className="text-xs text-muted-foreground">
              Daily Interest
            </span>
            <span className="font-bold leading-none">
              {"~"}
              {loan.currency} {dailyInterest.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-muted-foreground">{loan.id}</span>
      </CardFooter>
    </Card>
  );
};

export default LoanCard;
