
import { Loan } from '@/interfaces';
import {v4 as uuidv4} from 'uuid';
import { create } from 'zustand'
export interface LoanStore {
  loans: Loan[];
  addLoan: (loan: Omit<Loan, 'id'>) => void;
  updateLoan: (id: string, updatedLoan: Omit<Loan, 'id'>) => void;
  getLoan: (id: string) => Loan | undefined
}

export const useImitationAPI = create<LoanStore>((set, get) => ({
  loans: [],
  addLoan: (loan) => {
    const newLoan: Loan = {
      ...loan,
      id: uuidv4()
    };
    set((state) => ({ loans: [...state.loans, newLoan] }));
  },

  updateLoan: (id, updatedLoan) => {
    set((state) => ({
      loans: state.loans.map((loan) =>
        loan.id === id ? { ...loan, ...updatedLoan } : loan
      ),
    }));
  },

  getLoan: (id) => {
    return get().loans.find((loan) => loan.id === id);
  },
}))