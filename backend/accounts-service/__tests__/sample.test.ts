import { soma } from '../src/soma'

describe('The sum between 2 and 1, just return 3', ()=>{
    it('testing sum between 2 and 1 then 3', ()=>{
        const result = soma(2,1);

        expect(result).toEqual(3);
    })
})