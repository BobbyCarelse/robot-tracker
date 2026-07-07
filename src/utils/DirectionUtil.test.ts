import { calculateCoordinates, isStepValid } from "./DirectionUtil"

describe('DirectionUtil', () => {

    describe('isStepValid', () => {
        it('should consider F a valid step', () => {
            expect(isStepValid('F')).toStrictEqual(true)
        })

        it('should consider R a valid step', () => {
            expect(isStepValid('R')).toStrictEqual(true)
        })

        it('should consider L a valid step', () => {
            expect(isStepValid('L')).toStrictEqual(true)
        })

        it('should return false for an invalid step', () => {
            expect(isStepValid('S')).toStrictEqual(false)
        })
    })

    describe('calculateCoordinates', () => {
        it('should calculate and return robots coords', () => {
            const response = calculateCoordinates(3, 2, 'N', 'FRRFLLFFRRFLL', 5, 3)

            expect(response).toStrictEqual({robotFellOff: false, x: 3, y: 3, currentStep: 'N'})
        })
    })
})