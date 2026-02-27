import {Angle} from '../src/Measurements';
import {AngleUnit} from "../src/AngleUnit";

describe('Angle (mutable)', () => {
    test('add mutates original', () => {
        const a = new Angle(1, AngleUnit.RADIANS);
        const result = a.add(2, AngleUnit.RADIANS);
        expect(a.radians).toBeCloseTo(3);
        expect(result).toBe(a);
    });

    test('sub mutates original', () => {
        const a = new Angle(5, AngleUnit.RADIANS);
        const result = a.sub(2, AngleUnit.RADIANS);
        expect(a.radians).toBeCloseTo(3);
        expect(result).toBe(a);
    });

    test('mulByNumber mutates original', () => {
        const a = new Angle(2, AngleUnit.RADIANS);
        const result = a.mulByNumber(3);
        expect(a.radians).toBeCloseTo(6);
        expect(result).toBe(a);
    });

    test('divByNumber mutates original', () => {
        const a = new Angle(6, AngleUnit.RADIANS);
        const result = a.divByNumber(2);
        expect(a.radians).toBeCloseTo(3);
        expect(result).toBe(a);
    });

    test('normalize mutates original', () => {
        const a = new Angle(7 * Math.PI, AngleUnit.RADIANS);
        a.normalize();
        expect(a.radians).toBeCloseTo(Math.PI);
    });
});

