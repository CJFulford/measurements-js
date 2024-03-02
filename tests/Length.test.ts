import Length from "../src/Length";
import LengthUnit from "../src/LengthUnit";

test('Addition', () => {
    const length1 = new Length(1, LengthUnit.METRE);
    length1.add(new Length(1, LengthUnit.METRE));
    expect(length1.metres).toBe(2);

    const length2 = new Length(1, LengthUnit.METRE);
    length2.add(1, LengthUnit.METRE);
    expect(length2.metres).toBe(2);
});

test('Subtraction', () => {
    const length1 = new Length(5, LengthUnit.METRE);
    length1.sub(new Length(3, LengthUnit.METRE));
    expect(length1.metres).toBe(2);

    const length2 = new Length(5, LengthUnit.METRE);
    length2.sub(3, LengthUnit.METRE);
    expect(length2.metres).toBe(2);
});

test('Multiplication', () => {
    const length1 = new Length(5, LengthUnit.METRE);
    const area1 = length1.mul(new Length(3, LengthUnit.METRE));
    expect(length1.metres).toBe(5);
    expect(area1.squareMetres).toBe(15);

    const length2 = new Length(5, LengthUnit.METRE);
    const area2 = length2.mul(3, LengthUnit.METRE);
    expect(length2.metres).toBe(5);
    expect(area2.squareMetres).toBe(15);

    const length3 = new Length(5, LengthUnit.METRE);
    const length4 = length3.mul(3);
    expect(length3.metres).toBe(15);
    expect(length4.metres).toBe(15);
});
