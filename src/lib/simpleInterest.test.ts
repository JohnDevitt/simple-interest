import {
  calculateDailyInterest,
  calculateInterestAccrued,
  calculateSimpleInterest,
} from "./simpleInterest";

describe("calculateDailyInterest", () => {
  it("should correctly calculate daily interest for a non-leap year (365 days)", () => {
    const date = new Date(2025, 0, 1);
    const interest = calculateDailyInterest(1000, 5, date);
    expect(interest).toBeCloseTo(0.1369863);
  });

  it("should correctly calculate daily interest for a non-leap year (365 days)", () => {
    const date = new Date(2025, 0, 1);
    const interest = calculateDailyInterest(1000, 5, date);
    expect(interest).toBeCloseTo(0.13661202);
  });

  it("handles a principal of 0 correctly", () => {
    const date = new Date(2025, 0, 1);
    const result = calculateDailyInterest(0, 5, date);
    expect(result).toBe(0);
  });

  it("handles an interest rate of 0 correctly", () => {
    const date = new Date(2025, 0, 1);
    const result = calculateDailyInterest(1000, 0, date);
    expect(result).toBe(0);
  });
});

describe("calculateSimpleInterest", () => {
  it('calculates interest for full years and partial year correctly', () => {
    const date = new Date(2025, 6, 13);
    const result = calculateInterestAccrued(1000, 5, date, 500);
    expect(result).toBeCloseTo(68.49315068);
  });

  it('calculates interest correctly for a zero principal', () => {
    const date = new Date(2025, 0, 1);
    const result = calculateInterestAccrued(0, 5, date, 500);
    expect(result).toBe(0);
  });

  it('calculates interest correctly for zero interest rate', () => {
    const date = new Date(2025, 0, 1);
    const result = calculateInterestAccrued(1000, 0, date, 500);
    expect(result).toBe(0);
  });
});

describe("calculateSimpleInterest", () => {
 it("should correctly calculate daily interest correctly", () => {
    const startDate = new Date(2025, 6, 13);
    const endDate = new Date(2026, 10, 25);

    const interest = calculateSimpleInterest(
      startDate,
      endDate,
      1000,
      3.75,
      1.25,
    );
    expect(interest[interest.length - 1].interestAccrued).toBeCloseTo(68.49315068);
  });

  it("should correctly calculate daily interest for long periods", () => {
    const principal = 1000;

    const startDate = new Date(2020, 0, 1);
    const endDate = new Date(2100, 0, 1);

    const interest = calculateSimpleInterest(
      startDate,
      endDate,
      principal,
      2,
      1.25,
    );
    expect(interest[interest.length - 1].interestAccrued).toBe(2600.0);
  });
});
