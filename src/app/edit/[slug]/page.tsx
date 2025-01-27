"use client";

import CompoundInterestForm from "@/forms/compoundInterestForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Loan } from "@/interfaces";
import { useImitationAPI } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { generateLoanTitle } from "@/lib/utils";

const EditLoan = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { updateLoan, getLoan } = useImitationAPI((state) => state);
  const loanId = useParams().slug as string;

  if (!loanId) {
    router.replace("/");
  }

  const loan = getLoan(loanId);

  if (!loan) {
    return `Loan ${loanId} not found`;
  }

  const { id, ...loanData } = loan;
  const loanTitle = generateLoanTitle(loanData);

  const onSubmit = (updatedLoan: Omit<Loan, "id">) => {
    updateLoan(loanId, updatedLoan);
    const updatedLoanTitle = generateLoanTitle(updatedLoan);
    toast({
      title: "Loan updated",
      description: updatedLoanTitle,
    });
    router.push("/");
  };

  return (
    <main className="flex-grow w-full flex flex-col items-center justify-start md:justify-center">
      <div className="flex items-center gap-8">
        <Button variant="outline" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft />
        </Button>

        <h2 className="text-3xl font-bold tracking-tight">
          Upate {loanTitle} 📈
        </h2>
      </div>

      <div className="flex flex-grow items-start sm:items-center gap-4 pt-8">
        <CompoundInterestForm onSubmit={onSubmit} defaultValues={loan} />
      </div>
    </main>
  );
};

export default EditLoan;
