import {AngleImmutable} from '../src/Measurements';
import {AngleUnit} from "../src/AngleUnit";

describe('AngleImmutable (immutable)', () => {
    test('add does not mutate original', () => {
        const a = new AngleImmutable(1, AngleUnit.RADIANS);
        const result = a.add(2, AngleUnit.RADIANS);
        expect(a.radians).toBeCloseTo(1);
        expect(result).not.toBe(a);
        expect(result.radians).toBeCloseTo(3);
    });

    test('sub does not mutate original', () => {
        const a = new AngleImmutable(5, AngleUnit.RADIANS);
        const result = a.sub(2, AngleUnit.RADIANS);
        expect(a.radians).toBeCloseTo(5);
        expect(result).not.toBe(a);
        expect(result.radians).toBeCloseTo(3);
    });

    test('mulByNumber does not mutate original', () => {
        const a = new AngleImmutable(2, AngleUnit.RADIANS);
        const result = a.mulByNumber(3);
        expect(a.radians).toBeCloseTo(2);
        expect(result).not.toBe(a);
        expect(result.radians).toBeCloseTo(6);
    });

    test('divByNumber does not mutate original', () => {
        const a = new AngleImmutable(6, AngleUnit.RADIANS);
        const result = a.divByNumber(2);
        expect(a.radians).toBeCloseTo(6);
        expect(result).not.toBe(a);
        expect(result.radians).toBeCloseTo(3);
    });

    test('normalize returns new instance', () => {
        const a = new AngleImmutable(7 * Math.PI, AngleUnit.RADIANS);
        const normalized = a.normalize();
        expect(a.radians).toBeCloseTo(7 * Math.PI);
        expect(normalized.radians).toBeCloseTo(Math.PI);
        expect(normalized).not.toBe(a);
    });
});

