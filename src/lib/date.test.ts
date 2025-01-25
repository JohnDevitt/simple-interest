import { daysToYearsAndDays } from "./date";

describe("daysToYearsAndDays", () => {
  test("returns 0 years and 0 days for 0 days elapsed", () => {
    const startDate = new Date(2025, 0, 1);
    const result = daysToYearsAndDays(startDate, 0);
    expect(result).toEqual({ years: 0, days: 0 });
  });

  test("returns 0 years and n days for less than a year", () => {
    const startDate = new Date(2025, 0, 1);
    const result = daysToYearsAndDays(startDate, 100);
    expect(result).toEqual({ years: 0, days: 100 });
  });

  test("returns 1 year and 0 days for exactly 1 year (non-leap)", () => {
    const startDate = new Date(2025, 0, 1);
    const result = daysToYearsAndDays(startDate, 365);
    expect(result).toEqual({ years: 1, days: 0 });
  });

  test("handles leap years correctly", () => {
    const startDate = new Date(2024, 0, 1);
    const result = daysToYearsAndDays(startDate, 366);
    expect(result).toEqual({ years: 1, days: 0 });
  });

  test("returns correct years and days when crossing a leap year", () => {
    const startDate = new Date(2024, 0, 1);
    const result = daysToYearsAndDays(startDate, 400);
    expect(result).toEqual({ years: 1, days: 34 });
  });

  test("handles multiple years", () => {
    const startDate = new Date(2010, 0, 1);
    const result = daysToYearsAndDays(startDate, 1096);
    expect(result).toEqual({ years: 3, days: 0 });
  });

  test("handles remaining days after multiple years", () => {
    const startDate = new Date(2020, 0, 1);
    const result = daysToYearsAndDays(startDate, 800);
    expect(result).toEqual({ years: 2, days: 69 });
  });

  test("works correctly with a non-January start date", () => {
    const startDate = new Date(2023, 5, 15);
    const result = daysToYearsAndDays(startDate, 500);
    expect(result).toEqual({ years: 1, days: 134 });
  });

  test("handles large inputs gracefully", () => {
    const startDate = new Date(2000, 0, 1);
    const result = daysToYearsAndDays(startDate, 10000);
    expect(result).toEqual({ years: 27, days: 138 });
  });

  test("returns correct result for dates starting at year end", () => {
    const startDate = new Date(2022, 11, 31);
    const result = daysToYearsAndDays(startDate, 1);
    expect(result).toEqual({ years: 0, days: 1 });
  });
});
