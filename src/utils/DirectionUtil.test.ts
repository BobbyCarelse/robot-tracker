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
            const response = calculateCoordinates(1, 1, 'E', 'RFRFRFRF', 5, 3)

            expect(response).toStrictEqual({robotFellOff: false, x: 1, y: 1, currentStep: 'E'})
        })

        it('should calculate and pick up that robot has fell off', () => {
            const response = calculateCoordinates(3, 2, 'N', 'FRRFLLFFRRFLL', 5, 3)

            expect(response).toStrictEqual({robotFellOff: true, x: 3, y: 3, currentStep: 'N'})
        })

        it('should ignore a move off the grid at a point that already has a scent', () => {
            const response = calculateCoordinates(0, 3, 'W', 'LLFFFLFLFL', 5, 3, [{ x: 3, y: 3 }])

            expect(response).toStrictEqual({robotFellOff: false, x: 2, y: 3, currentStep: 'S'})
        })
    })
})