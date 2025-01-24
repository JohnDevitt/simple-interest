"use client";

import { interestRateFormSchema } from "@/schemas/compountInterestForm";
import { z } from "zod";
import CompoundInterestForm from "@/forms/compoundInterestForm";

export default function Home() {
  function onSubmit(values: z.infer<typeof interestRateFormSchema>) {
    console.log(values);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-2 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-3xl font-bold tracking-tight">
        Compound Interest Calculator 📈
      </h2>

      <CompoundInterestForm onSubmit={onSubmit} />
    </div>
  );
}
