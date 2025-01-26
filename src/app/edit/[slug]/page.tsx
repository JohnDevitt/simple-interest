"use client";

import CompoundInterestForm from "@/forms/compoundInterestForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Loan } from "@/interfaces";
import { useImitationAPI } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { generateLoanTitle } from "@/lib/utils";

export default function EditLoan({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-x-8">
        <Button variant="outline" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft />
        </Button>

        <h2 className="text-3xl font-bold tracking-tight">
          Upate {loanTitle} 📈
        </h2>
      </div>

      <main className="flex-grow w-full flex flex-col items-center justify-start md:justify-center">
        <div className="flex gap-4 justify-between pt-8">
          <CompoundInterestForm onSubmit={onSubmit} defaultValues={loan} />
        </div>
      </main>
    </div>
  );
}
