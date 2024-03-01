import Length from "../src/Length";
import LengthUnit from "../src/LengthUnit";

test('Add 2 Objects', () => {
    const length = new Length(1, LengthUnit.METRE);
    length.add(new Length(1, LengthUnit.METRE));
    expect(length.metres).toBe(2);
});

test('Add object with arguments', () => {
    const length = new Length(1, LengthUnit.METRE);
    length.add(1, LengthUnit.METRE);
    expect(length.metres).toBe(2);
});
