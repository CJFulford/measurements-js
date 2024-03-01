import LengthUnit from "../src/LengthUnit";
import LengthImmutable from "../src/LengthImmutable";

test('Addition', () => {
    const length1 = new LengthImmutable(1, LengthUnit.METRE);
    const length2 = length1.add(new LengthImmutable(1, LengthUnit.METRE));
    expect(length1.metres).toBe(1);
    expect(length2.metres).toBe(2);
});

test('Add object with arguments', () => {
    const length1 = new LengthImmutable(1, LengthUnit.METRE);
    const length2 = length1.add(1, LengthUnit.METRE);
    expect(length1.metres).toBe(1);
    expect(length2.metres).toBe(2);
});
