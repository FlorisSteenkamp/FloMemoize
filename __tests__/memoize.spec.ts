import { expect, test } from '@jest/globals';
import { memoize } from '../src/memoize.js';


test('Test `memoize`', function() {
    function id(a: number) {
        return a;
    }
    const id$ = memoize(id);
    
    expect(id$(1)).toEqual(1);
    expect(id$(2)).toEqual(2);
    expect(id$(3)).toEqual(3);
    expect(id$(1)).toEqual(1);
    expect(id$(1)).toEqual(1);
    expect(id$(1)).toEqual(1);
    expect(id$(1)).toEqual(1);
    expect(id$(1)).toEqual(1);
    expect(id$(1)).toEqual(1);
    expect(id$(1)).toEqual(1);
    expect(id$(1)).toEqual(1);


    {
        interface NumA { v: number }
        interface NumB { v: number, u1: 0 }
        interface NumC { v: number, u2: 0 }
        interface NumD { v: number, u3: 0 }
        interface NumE { v: number, u4: 0 }
        interface NumF { v: number, u5: 0 }

        const A0: NumA = { v: 0 };
        const A1: NumA = { v: 1 };
        const A2: NumA = { v: 2 };
        const A4: NumA = { v: 4 };
        const A8: NumA = { v: 8 };

        const B0: NumB = { v: 0, u1: 0 };
        const B1: NumB = { v: 1, u1: 0 };
        const B2: NumB = { v: 2, u1: 0 };
        const B4: NumB = { v: 4, u1: 0 };
        const B8: NumB = { v: 8, u1: 0 };

        const C0: NumC = { v: 0, u2: 0 };
        const C1: NumC = { v: 1, u2: 0 };
        const C2: NumC = { v: 2, u2: 0 };
        const C4: NumC = { v: 4, u2: 0 };
        const C8: NumC = { v: 8, u2: 0 };

        const D0: NumD = { v: 0, u3: 0 };
        const D1: NumD = { v: 1, u3: 0 };
        const D2: NumD = { v: 2, u3: 0 };
        const D4: NumD = { v: 4, u3: 0 };
        const D8: NumD = { v: 8, u3: 0 };

        const E0: NumE = { v: 0, u4: 0 };
        const E1: NumE = { v: 1, u4: 0 };
        const E2: NumE = { v: 2, u4: 0 };
        const E4: NumE = { v: 4, u4: 0 };
        const E8: NumE = { v: 8, u4: 0 };


        function add0() {
            return 4;
        }

        function add1(a: NumA) {
            return a.v;
        }

        function add2(a: NumA, b: NumB) {
            return a.v + b.v;
        }

        function add3(a: NumA, b: NumB, c: NumC) {
            return a.v + b.v + c.v;
        }

        function add4(a: NumA, b: NumB, c: NumC, d: NumD) {
            return a.v + b.v + c.v + d.v;
        }

        function add5(a: NumA, b: NumB, c: NumC, d: NumD, e: NumE) {
            return a.v + b.v + c.v + d.v + e.v;
        }

        function add6(a: NumA, b: NumB, c: NumC, d: NumD, e: NumE, f: NumF) {
            return a.v + b.v + c.v + d.v + e.v + f.v;
        }

        const add0$$ = memoize(add0);
        const add1$$ = memoize(add1);
        const add2$$ = memoize(add2);
        const add3$$ = memoize(add3);
        const add4$$ = memoize(add4);
        const add5$$ = memoize(add5);
        // const add6$$ = memoizeN(add6);

        // ------------------------------------------
        expect(add0$$()).toEqual(4);
        expect(add0$$()).toEqual(4);
        // ------------------------------------------
        expect(add1$$(A0)).toEqual(0);
        expect(add1$$(A1)).toEqual(1);
        expect(add1$$(A1)).toEqual(1);
        expect(add1$$(A2)).toEqual(2);
        // ------------------------------------------
        expect(add2$$(A0,B1)).toEqual(1);
        expect(add2$$(A0,B1)).toEqual(1);
        expect(add2$$(A0,B2)).toEqual(2);
        expect(add2$$(A0,B1)).toEqual(1);
        expect(add2$$(A0,B2)).toEqual(2);
        expect(add2$$(A1,B0)).toEqual(1);
        expect(add2$$(A0,B4)).toEqual(4);
        expect(add2$$(A2,B4)).toEqual(6);
        expect(add2$$(A2,B8)).toEqual(10);

        expect(add2$$(A8,B4)).toEqual(12);
        expect(add2$$(A8,B4)).toEqual(12);
        expect(add2$$(A8,B4)).toEqual(12);

        expect(add2$$(A8,B0)).toEqual(8);
        expect(add2$$(A8,B1)).toEqual(9);
        expect(add2$$(A8,B2)).toEqual(10);
        expect(add2$$(A8,B1)).toEqual(9);
        // ------------------------------------------
        expect(add3$$(A0,B1,C1)).toEqual(2);
        expect(add3$$(A0,B1,C1)).toEqual(2);
        expect(add3$$(A0,B2,C1)).toEqual(3);
        expect(add3$$(A0,B1,C1)).toEqual(2);
        expect(add3$$(A0,B1,C1)).toEqual(2);
        expect(add3$$(A0,B1,C1)).toEqual(2);
        expect(add3$$(A0,B1,C1)).toEqual(2);
        expect(add3$$(C1,B1,C1)).toEqual(3);
        expect(add3$$(C1,B1,C1)).toEqual(3);
        // ------------------------------------------
        expect(add4$$(A4,B1,C1,D4)).toEqual(10);
        expect(add4$$(A8,B1,C1,D4)).toEqual(14);
        expect(add4$$(A8,B2,C1,D4)).toEqual(15);
        expect(add4$$(A8,B2,C1,D4)).toEqual(15);
        expect(add4$$(A4,B1,C1,D4)).toEqual(10);
        // ------------------------------------------
        expect(add5$$(A4,B1,C1,D4,E1)).toEqual(11);
        expect(add5$$(A8,B1,C1,D4,E1)).toEqual(15);
        expect(add5$$(A8,B2,C1,D4,E1)).toEqual(16);
        expect(add5$$(A8,B2,C1,D4,E1)).toEqual(16);
        expect(add5$$(A8,B2,C1,D4,E1)).toEqual(16);
        expect(add5$$(A4,B1,C1,D4,E2)).toEqual(12);
        // ------------------------------------------

        expect(add5$$(A8,B2,C1,D4,E8)).toEqual(23);
        for (let i=0; i<10; i++) {
            expect(add5$$(A8,B2,C1,D4,E8)).toEqual(23);
        }
    }

    const one = new Number(1);
    const two = new Number(2);
    const three = new Number(3);
    const four = new Number(4);
    const five = new Number(5);
    const six = new Number(6);
    {
        function id(a: Number) {
            return a;
        }

        const id$ = memoize(id);
        
        expect(Number(id$(two))).toEqual(2);
        expect(Number(id$(two))).toEqual(2);
        expect(Number(id$(24))).toEqual(24);
        expect(Number(id$(24))).toEqual(24);
    }
    {
        function add2(a: Number | number, b: Number | number) {
            return +a + +b;
        }
        const add$ = memoize(add2);
        expect(add$(two, 1)).toEqual(3);
        expect(add$(two, 1)).toEqual(3);
        expect(add$(two, 1)).toEqual(3);
        expect(add$(1, two)).toEqual(3);
        expect(add$(1, two)).toEqual(3);
        expect(add$(1, two)).toEqual(3);
        expect(add$(two, two)).toEqual(4);
        expect(add$(two, two)).toEqual(4);
        expect(add$(one, two)).toEqual(3);
        expect(add$(two, one)).toEqual(3);
    }
    {
        function add3(a: Number | number, b: Number | number, c: Number | number) {
            return +a + +b + +c;
        }
        const add3$ = memoize(add3);
        expect(add3$(two, 1, three)).toEqual(6);
        expect(add3$(two, 1, three)).toEqual(6);
        expect(add3$(1, two, three)).toEqual(6);
        expect(add3$(1, 2, 3)).toEqual(6);
        expect(add3$(1, 2, 3)).toEqual(6);
        expect(add3$(1, 2, 3)).toEqual(6);
        expect(add3$(one, two, three)).toEqual(6);
        expect(add3$(one, two, three)).toEqual(6);
        expect(add3$(one, two, three)).toEqual(6);
    }
    {
        function add4(a: Number | number, b: Number | number, c: Number | number, d: Number | number) {
            return +a + +b + +c + +d;
        }
        const add4$ = memoize(add4);
        expect(add4$(two, 1, three, 4)).toEqual(10);
        expect(add4$(two, 1, three, 4)).toEqual(10);
        expect(add4$(two, 1, three, 4)).toEqual(10);
        expect(add4$(1, 2, 3, 4)).toEqual(10);
        expect(add4$(1, 2, 3, 4)).toEqual(10);
        expect(add4$(1, 2, 3, 4)).toEqual(10);
        expect(add4$(2, one, two, three)).toEqual(8);
        expect(add4$(2, one, two, three)).toEqual(8);
        expect(add4$(2, one, two, three)).toEqual(8);
        expect(add4$(1, 2, 3, 4)).toEqual(10);
    }
    {
        function add5(a: Number | number, b: Number | number, c: Number | number, d: Number | number, e: Number | number) {
            return +a + +b + +c + +d + +e;
        }
        const add5$ = memoize(add5);
        expect(add5$(two, 1, three, 4, 5)).toEqual(15)
        expect(add5$(two, 1, three, 4, 5)).toEqual(15)
        expect(add5$(two, 1, three, 4, 5)).toEqual(15)
        expect(add5$(1, 2, 3, 4, 5)).toEqual(15)
        expect(add5$(1, 2, 3, 4, 5)).toEqual(15)
        expect(add5$(1, 2, 3, 4, 5)).toEqual(15)
        expect(add5$(one, two, three, four, five)).toEqual(15)
        expect(add5$(one, two, three, four, five)).toEqual(15)
        expect(add5$(one, two, three, four, five)).toEqual(15)
        expect(add5$(1, 2, 3, 4, 5)).toEqual(15)
    }
    {
        function add6(a: Number | number, b: Number | number, c: Number | number, d: Number | number, e: Number | number, f: Number | number) {
            return +a + +b + +c + +d + +e + +f;
        }
        const add6$ = memoize(add6);
        expect(add6$(two, 1, three, 4, 5, six)).toEqual(21);
        expect(add6$(two, 1, three, 4, 5, six)).toEqual(21);
        expect(add6$(two, 1, three, 4, 5, six)).toEqual(21);
        expect(add6$(1, 2, 3, 4, 5, 6)).toEqual(21);
        expect(add6$(1, 2, 3, 4, 5, 6)).toEqual(21);
        expect(add6$(1, 2, 3, 4, 5, 6)).toEqual(21);
        expect(add6$(one, two, three, four, five, six)).toEqual(21);
        expect(add6$(one, two, three, four, five, six)).toEqual(21);
        expect(add6$(one, two, three, four, five, six)).toEqual(21);
        expect(add6$(1, 2, 3, 4, 5, 6)).toEqual(21);
    }
    {
        function add6(a: Number | number, b: Number | number, c: Number | number, d: Number | number, e: Number | number, f: Number | number) {
            return +a + +b + +c + +d + +e + +f;
        }
        const add6$ = memoize(add6);
        expect(add6$(two, 1, three, 4, 5, six)).toEqual(21);
        expect(add6$(two, 1, three, 4, 5, six)).toEqual(21);
        expect(add6$(two, 1, three, 4, 5, six)).toEqual(21);
        expect(add6$(1, 2, 3, 4, 5, 6)).toEqual(21);
        expect(add6$(1, 2, 3, 4, 5, 6)).toEqual(21);
        expect(add6$(1, 2, 3, 4, 5, 6)).toEqual(21);
        expect(add6$(one, two, three, four, five, six)).toEqual(21);
        expect(add6$(one, two, three, four, five, six)).toEqual(21);
        expect(add6$(one, two, three, four, five, six)).toEqual(21);
        expect(add6$(1, 2, 3, 4, 5, 6)).toEqual(21);
    }
});
