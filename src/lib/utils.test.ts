import CurrencyCode from "@/enums/enums"
import { generateLoanTitle } from "./utils"

describe('generateLoanTitle', () => {
    it('generates a title for under without a year', () => {
        const title = generateLoanTitle({
            startDate: new Date(2025, 0, 1),
            endDate: new Date(2025, 0, 31),
            currency: CurrencyCode.EUR,
            principal: 1000,
            baseInterestRate: 2.5,
            margin: 1.75
        })
            
        expect(title).toBe('€1000 @ 4.25% for 31 day(s)') 
    })

        it('generates a title with a year', () => {
        const title = generateLoanTitle({
            startDate: new Date(2025, 0, 1),
            endDate: new Date(2026, 0, 31),
            currency: CurrencyCode.EUR,
            principal: 1000,
            baseInterestRate: 2.5,
            margin: 1.75
        })
            
        expect(title).toBe('€1000 @ 4.25% for 1 year(s), 31 day(s)') 
    })
})