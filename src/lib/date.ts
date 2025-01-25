import { addDays, differenceInDays, differenceInYears } from "date-fns";

export const daysToYearsAndDays = (startDate: Date, daysElapsed: number) => {
    const endDate = addDays(startDate, daysElapsed);
    const years = differenceInYears(endDate, startDate);
    
    if (years === 0)
        return { years: 0, days: daysElapsed }
    
    const baseDate = new Date(endDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const remainingDays = differenceInDays(endDate, baseDate);
    
    return {years, days: remainingDays}
};