import {LengthUnit} from "../src/LengthUnit";
import {LengthImmutable} from "../src/Concretes";

test('Addition', () => {
    const length1 = new LengthImmutable(1, LengthUnit.METRE);
    const length2 = length1.add(new LengthImmutable(1, LengthUnit.METRE));
    expect(length1.metres).toBe(1);
    expect(length2.metres).toBe(2);

    const length3 = new LengthImmutable(1, LengthUnit.METRE);
    const length4 = length3.add(1, LengthUnit.METRE);
    expect(length3.metres).toBe(1);
    expect(length4.metres).toBe(2);
});

test('Subtraction', () => {
    const length1 = new LengthImmutable(5, LengthUnit.METRE);
    const length2 = length1.sub(new LengthImmutable(3, LengthUnit.METRE));
    expect(length1.metres).toBe(5);
    expect(length2.metres).toBe(2);

    const length3 = new LengthImmutable(5, LengthUnit.METRE);
    const length4 = length3.sub(3, LengthUnit.METRE);
    expect(length3.metres).toBe(5);
    expect(length4.metres).toBe(2);
});

test('Multiplication By Number', () => {
    const length3 = new LengthImmutable(5, LengthUnit.METRE);
    const length4 = length3.mulByNumber(3);
    expect(length3.metres).toBe(5);
    expect(length4.metres).toBe(15);
});

test('Multiplication By Length', () => {
    const length1 = new LengthImmutable(5, LengthUnit.METRE);
    const area1 = length1.mulByLength(new LengthImmutable(3, LengthUnit.METRE));
    expect(length1.metres).toBe(5);
    expect(area1.squareMetres).toBe(15);

    const length2 = new LengthImmutable(5, LengthUnit.METRE);
    const area2 = length2.mulByLength(3, LengthUnit.METRE);
    expect(length2.metres).toBe(5);
    expect(area2.squareMetres).toBe(15);
});

test('Division By Number', () => {
    const length1 = new LengthImmutable(15, LengthUnit.METRE);
    const length2 = length1.divByNumber(3);
    expect(length1.metres).toBe(15);
    expect(length2.metres).toBe(5);
});

test('Division By Length', () => {
    const length1 = new LengthImmutable(15, LengthUnit.METRE);
    const value1 = length1.divByLength(new LengthImmutable(3, LengthUnit.METRE));
    expect(length1.metres).toBe(15);
    expect(value1).toBe(5);

    const length2 = new LengthImmutable(15, LengthUnit.METRE);
    const value2 = length2.divByLength(3, LengthUnit.METRE);
    expect(length2.metres).toBe(15);
    expect(value2).toBe(5);
});

test('Is Equal To', () => {
    const length1 = new LengthImmutable(15, LengthUnit.METRE);
    const length2 = new LengthImmutable(15, LengthUnit.METRE);
    const length3 = new LengthImmutable(20, LengthUnit.METRE);
    expect(length1.isEqualTo(length2)).toBe(true);
    expect(length1.isEqualTo(length3)).toBe(false);
});

test('Is Less Than', () => {
    const length1 = new LengthImmutable(10, LengthUnit.METRE);
    const length2 = new LengthImmutable(15, LengthUnit.METRE);
    const length3 = new LengthImmutable(15, LengthUnit.METRE);
    const length4 = new LengthImmutable(20, LengthUnit.METRE);

    expect(length1.isLessThan(length2)).toBe(true);
    expect(length1.isLessThan(length3)).toBe(true);
    expect(length1.isLessThan(length4)).toBe(true);

    expect(length2.isLessThan(length1)).toBe(false);
    expect(length2.isLessThan(length3)).toBe(false);
    expect(length2.isLessThan(length4)).toBe(true);

    expect(length3.isLessThan(length1)).toBe(false);
    expect(length3.isLessThan(length2)).toBe(false);
    expect(length3.isLessThan(length4)).toBe(true);

    expect(length4.isLessThan(length1)).toBe(false);
    expect(length4.isLessThan(length2)).toBe(false);
    expect(length4.isLessThan(length3)).toBe(false);
});

test('Is Less Than Or Equal To', () => {
    const length1 = new LengthImmutable(10, LengthUnit.METRE);
    const length2 = new LengthImmutable(15, LengthUnit.METRE);
    const length3 = new LengthImmutable(15, LengthUnit.METRE);
    const length4 = new LengthImmutable(20, LengthUnit.METRE);

    expect(length1.isLessThanOrEqualTo(length2)).toBe(true);
    expect(length1.isLessThanOrEqualTo(length3)).toBe(true);
    expect(length1.isLessThanOrEqualTo(length4)).toBe(true);

    expect(length2.isLessThanOrEqualTo(length1)).toBe(false);
    expect(length2.isLessThanOrEqualTo(length3)).toBe(true);
    expect(length2.isLessThanOrEqualTo(length4)).toBe(true);

    expect(length3.isLessThanOrEqualTo(length1)).toBe(false);
    expect(length3.isLessThanOrEqualTo(length2)).toBe(true);
    expect(length3.isLessThanOrEqualTo(length4)).toBe(true);

    expect(length4.isLessThanOrEqualTo(length1)).toBe(false);
    expect(length4.isLessThanOrEqualTo(length2)).toBe(false);
    expect(length4.isLessThanOrEqualTo(length3)).toBe(false);
});

test('Is Greater Than', () => {
    const length1 = new LengthImmutable(10, LengthUnit.METRE);
    const length2 = new LengthImmutable(15, LengthUnit.METRE);
    const length3 = new LengthImmutable(15, LengthUnit.METRE);
    const length4 = new LengthImmutable(20, LengthUnit.METRE);

    expect(length1.isGreaterThan(length2)).toBe(false);
    expect(length1.isGreaterThan(length3)).toBe(false);
    expect(length1.isGreaterThan(length4)).toBe(false);

    expect(length2.isGreaterThan(length1)).toBe(true);
    expect(length2.isGreaterThan(length3)).toBe(false);
    expect(length2.isGreaterThan(length4)).toBe(false);

    expect(length3.isGreaterThan(length1)).toBe(true);
    expect(length3.isGreaterThan(length2)).toBe(false);
    expect(length3.isGreaterThan(length4)).toBe(false);

    expect(length4.isGreaterThan(length1)).toBe(true);
    expect(length4.isGreaterThan(length2)).toBe(true);
    expect(length4.isGreaterThan(length3)).toBe(true);
});

test('Is Greater Than Or Equal To', () => {
    const length1 = new LengthImmutable(10, LengthUnit.METRE);
    const length2 = new LengthImmutable(15, LengthUnit.METRE);
    const length3 = new LengthImmutable(15, LengthUnit.METRE);
    const length4 = new LengthImmutable(20, LengthUnit.METRE);

    expect(length1.isGreaterThanOrEqualTo(length2)).toBe(false);
    expect(length1.isGreaterThanOrEqualTo(length3)).toBe(false);
    expect(length1.isGreaterThanOrEqualTo(length4)).toBe(false);

    expect(length2.isGreaterThanOrEqualTo(length1)).toBe(true);
    expect(length2.isGreaterThanOrEqualTo(length3)).toBe(true);
    expect(length2.isGreaterThanOrEqualTo(length4)).toBe(false);

    expect(length3.isGreaterThanOrEqualTo(length1)).toBe(true);
    expect(length3.isGreaterThanOrEqualTo(length2)).toBe(true);
    expect(length3.isGreaterThanOrEqualTo(length4)).toBe(false);

    expect(length4.isGreaterThanOrEqualTo(length1)).toBe(true);
    expect(length4.isGreaterThanOrEqualTo(length2)).toBe(true);
    expect(length4.isGreaterThanOrEqualTo(length3)).toBe(true);
});
