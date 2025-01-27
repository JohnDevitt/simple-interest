import { renderHook } from '@testing-library/react'
import { useImitationAPI } from './store';
import CurrencyCode from '@/enums/enums';
import { act } from 'react';

const loan = {
  startDate: new Date(2025, 0, 1),
  endDate: new Date(2025, 0, 1),
  currency: CurrencyCode.USD,
  principal: 1000,
  baseInterestRate: 2.5,
  margin: 1
}

describe('useImitationAPI', () => {
  it('should initialize with an empty loans array', () => {
    const { result } = renderHook(() => useImitationAPI());
    expect(result.current.loans).toEqual([]);
  });

  it('should add a loan', () => {
    const { result } = renderHook(() => useImitationAPI());

    act(() => {
      result.current.addLoan(loan);
    });

    expect(result.current.loans).toHaveLength(1);
    expect(result.current.loans[0]).toMatchObject(loan);
    expect(result.current.loans[0]).toHaveProperty('id');
  });

  it('should update a loan by ID', () => {
    const { result } = renderHook(() => useImitationAPI());

    act(() => {
      result.current.addLoan(loan);
    });

    const addedLoanId = result.current.loans[0].id;
    const updatedLoan = { ...loan, principal: 1500 };

    act(() => {
      result.current.updateLoan(addedLoanId, updatedLoan);
    });

    expect(result.current.loans[0]).toMatchObject(updatedLoan);
  });

  it('should retrieve a loan by ID', () => {
    const { result } = renderHook(() => useImitationAPI());

    act(() => {
      result.current.addLoan(loan);
    });

    const addedLoanId = result.current.loans[1].id;

    const retrievedLoan = result.current.getLoan(addedLoanId);
    expect(retrievedLoan).toMatchObject(loan);
    expect(retrievedLoan?.id).toBe(addedLoanId);
  });

  it('should return undefined for a non-existent ID', () => {
    const { result } = renderHook(() => useImitationAPI());

    const retrievedLoan = result.current.getLoan('non-existent-id');
    expect(retrievedLoan).toBeUndefined();
  });
});
