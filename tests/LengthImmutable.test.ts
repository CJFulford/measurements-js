import LengthUnit from "../src/LengthUnit";
import LengthImmutable from "../src/LengthImmutable";

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
