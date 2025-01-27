"use client";

import CompoundInterestForm from "@/forms/compoundInterestForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Loan } from "@/interfaces";
import { useImitationAPI } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { generateLoanTitle } from "@/lib/utils";

const AddLoan = () => {
  const router = useRouter();
  const { toast } = useToast();
  const addLoan = useImitationAPI(({ addLoan }) => addLoan);

  function onSubmit(loan: Omit<Loan, "id">) {
    addLoan(loan);
    const loanTitle = generateLoanTitle(loan);
    toast({
      title: "New loan added",
      description: loanTitle,
    });
    router.push("/");
  }

  return (
    <main className="flex-grow w-full flex flex-col items-center ">
      <div className="flex items-center gap-8">
        <Button variant="outline" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft />
        </Button>

        <h2 className="text-3xl font-bold tracking-tight">
          Calculate Simple Interest 📈
        </h2>
      </div>

      <div className="flex flex-grow items-start sm:items-center gap-4 pt-8">
        <CompoundInterestForm onSubmit={onSubmit} />
      </div>
    </main>
  );
};

export default AddLoan;
