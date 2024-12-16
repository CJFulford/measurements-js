import {AreaUnit} from "../src/AreaUnit";
import {Area} from "../src/Measurements";

test('Area Basic Multi Formatting', () => {
    const area = new Area(10.5, AreaUnit.SQUARE_FOOT);
    const units = [AreaUnit.SQUARE_FOOT, AreaUnit.SQUARE_INCH];
    expect(area.multiFormat(2, units, 'acronym')).toBe("10ft²,72.00in²");
});

test('Area Multi Formatting With First Unit Not Needed', () => {
    const area = new Area(1.5, AreaUnit.SQUARE_FOOT);
    const units = [AreaUnit.SQUARE_YARD, AreaUnit.SQUARE_FOOT, AreaUnit.SQUARE_INCH];
    expect(area.multiFormat(2, units, 'acronym')).toBe("1ft²,72.00in²");
});

test('Area Multi Formatting With Middle Unit Not Needed', () => {
    const area = new Area(1, AreaUnit.SQUARE_YARD).add(1, AreaUnit.SQUARE_INCH);
    const units = [AreaUnit.SQUARE_YARD, AreaUnit.SQUARE_FOOT, AreaUnit.SQUARE_INCH];
    expect(area.multiFormat(2, units, 'acronym')).toBe("1yd²,1.00in²");
});

test('Area Multi Formatting With Units Out Of Order', () => {
    const area = new Area(3, AreaUnit.SQUARE_YARD).add(1.5, AreaUnit.SQUARE_FOOT);
    const units = [AreaUnit.SQUARE_INCH, AreaUnit.SQUARE_FOOT, AreaUnit.SQUARE_YARD];
    expect(area.multiFormat(2, units, 'acronym')).toBe("3yd²,1ft²,72.00in²");
});

test('Area Multi Formatting With Zero Last Unit', () => {
    const area = new Area(10, AreaUnit.SQUARE_FOOT);
    const units = [AreaUnit.SQUARE_FOOT, AreaUnit.SQUARE_INCH];
    expect(area.multiFormat(2, units, 'acronym')).toBe("10ft²,0.00in²");
});
