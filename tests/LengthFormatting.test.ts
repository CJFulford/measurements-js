import {LengthUnit} from "../src/LengthUnit";
import {Length} from "../src/Concretes";

test("Length Formatting", () => {
    const length1 = new Length(1, LengthUnit.METRE);
    expect(length1.format(0, LengthUnit.METRE)).toBe("1m");
    expect(length1.format(0, LengthUnit.METRE, 'name')).toBe("1 metre");
    expect(length1.format(0, LengthUnit.METRE, 'symbol')).toBe("1m");

    const length2 = new Length(2, LengthUnit.METRE);
    expect(length2.format(0, LengthUnit.METRE)).toBe("2m");
    expect(length2.format(0, LengthUnit.METRE, 'name')).toBe("2 metres");
    expect(length2.format(0, LengthUnit.METRE, 'symbol')).toBe("2m");

    const length3 = new Length(1, LengthUnit.INCH);
    expect(length3.format(0, LengthUnit.INCH)).toBe("1in");
    expect(length3.format(0, LengthUnit.INCH, 'name')).toBe("1 inch");
    expect(length3.format(0, LengthUnit.INCH, 'symbol')).toBe("1\"");

    const length4 = new Length(2, LengthUnit.INCH);
    expect(length4.format(0, LengthUnit.INCH)).toBe("2in");
    expect(length4.format(0, LengthUnit.INCH, 'name')).toBe("2 inches");
    expect(length4.format(0, LengthUnit.INCH, 'symbol')).toBe("2\"");

    const length5 = new Length(2, LengthUnit.INCH);
    expect(length5.format(2, LengthUnit.INCH)).toBe("2.00in");
    expect(length5.format(2, LengthUnit.INCH, 'name')).toBe("2.00 inches");
    expect(length5.format(2, LengthUnit.INCH, 'symbol')).toBe("2.00\"");
});
