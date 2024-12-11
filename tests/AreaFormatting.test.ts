import {AreaUnit} from "../src/AreaUnit";
import {Area} from "../src/Concretes";

test("Area Formatting", () => {
    const area1 = new Area(1, AreaUnit.SQUARE_METRE);
    expect(area1.format(0, AreaUnit.SQUARE_METRE)).toBe("1m²");
    expect(area1.format(0, AreaUnit.SQUARE_METRE, 'name')).toBe("1 square metre");

    const area2 = new Area(2, AreaUnit.SQUARE_METRE);
    expect(area2.format(0, AreaUnit.SQUARE_METRE)).toBe("2m²");
    expect(area2.format(0, AreaUnit.SQUARE_METRE, 'name')).toBe("2 square metres");

    const area3 = new Area(1, AreaUnit.SQUARE_INCH);
    expect(area3.format(0, AreaUnit.SQUARE_INCH)).toBe("1in²");
    expect(area3.format(0, AreaUnit.SQUARE_INCH, 'name')).toBe("1 square inch");

    const area4 = new Area(2, AreaUnit.SQUARE_INCH);
    expect(area4.format(0, AreaUnit.SQUARE_INCH)).toBe("2in²");
    expect(area4.format(0, AreaUnit.SQUARE_INCH, 'name')).toBe("2 square inches");

    const area5 = new Area(2, AreaUnit.SQUARE_INCH);
    expect(area5.format(2, AreaUnit.SQUARE_INCH)).toBe("2.00in²");
    expect(area5.format(2, AreaUnit.SQUARE_INCH, 'name')).toBe("2.00 square inches");
});
