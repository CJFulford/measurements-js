import {LengthUnit} from "../src/LengthUnit";
import {Length} from "../src/Measurements";

test('Length Basic Multi Formatting', () => {
    const length = new Length(10.5, LengthUnit.FOOT);
    const units = [LengthUnit.FOOT, LengthUnit.INCH];
    expect(length.multiFormat(2, units, 'symbol')).toBe("10',6.00\"");
});

test('Length Multi Formatting With First Unit Not Needed', () => {
    const length = new Length(1.5, LengthUnit.FOOT);
    const units = [LengthUnit.YARD, LengthUnit.FOOT, LengthUnit.INCH];
    expect(length.multiFormat(2, units, 'symbol')).toBe("1',6.00\"");
});

test('Length Multi Formatting With Middle Unit Not Needed', () => {
    const length = new Length(1, LengthUnit.YARD).add(1, LengthUnit.INCH);
    const units = [LengthUnit.YARD, LengthUnit.FOOT, LengthUnit.INCH];
    expect(length.multiFormat(2, units, 'symbol')).toBe("1yd,1.00\"");
});

test('Length Multi Formatting With Units Out Of Order', () => {
    const length = new Length(10.5, LengthUnit.FOOT);
    const units = [LengthUnit.INCH, LengthUnit.FOOT, LengthUnit.YARD];
    expect(length.multiFormat(2, units, 'symbol')).toBe("3yd,1',6.00\"");
});

test('Length Multi Formatting With Zero Last Unit', () => {
    const length = new Length(10, LengthUnit.FOOT);
    const units = [LengthUnit.FOOT, LengthUnit.INCH];
    expect(length.multiFormat(2, units, 'symbol')).toBe("10',0.00\"");
});
