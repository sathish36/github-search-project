import { CommonUtils } from '../../../src/utils'

describe('Common Utils', () => {
    describe('getObjectValues method', () => {
        it('Should return all values in the object', ()=>{
            const object = {
                a:1,
                b:2,
                c:3,
            }
            const result = CommonUtils.getObjectValues(object)
            expect(result).toStrictEqual([1,2,3])
        })
    })
    
})
