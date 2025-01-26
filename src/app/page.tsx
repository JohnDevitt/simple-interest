"use client";

import { useRouter } from "next/navigation";
import FAB from "@/components/fab";
import { useImitationAPI } from "@/store/store";
import LoanCard from "@/components/loanCard";

export default function Home() {
  const router = useRouter();
  const loans = useImitationAPI(({ loans }) => loans);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen py-8 px-4 pb-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex-grow w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Simple Interest Calculator 📈
        </h2>

        {loans.length === 0 ? (
          <div className="flex flex-grow items-center">No loans added yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 items-center pt-8 gap-8 w-full">
            {loans.map((loan) => {
              return <LoanCard key={loan.id} loan={loan} />;
            })}
          </div>
        )}

        <FAB onClick={() => router.push("/add")} />
      </main>
    </div>
  );
}
