import {AreaUnit} from "../src/AreaUnit";
import {LengthUnit} from "../src/LengthUnit";
import {Area, AreaImmutable, Length} from "../src/Measurements";

test('Addition', () => {
    const area1 = new Area(1, AreaUnit.SQUARE_METRE);
    const area2 = area1.add(new Area(1, AreaUnit.SQUARE_METRE));
    expect(area1.squareMetres).toBe(2);
    expect(area2.squareMetres).toBe(2);
    expect(area2).toBe(area1);

    const area3 = new Area(1, AreaUnit.SQUARE_METRE);
    const area4 = area3.add(1, AreaUnit.SQUARE_METRE);
    expect(area3.squareMetres).toBe(2);
    expect(area4.squareMetres).toBe(2);
    expect(area4).toBe(area3);
});

test('Subtraction', () => {
    const area1 = new Area(5, AreaUnit.SQUARE_METRE);
    const area2 = area1.sub(new Area(3, AreaUnit.SQUARE_METRE));
    expect(area1.squareMetres).toBe(2);
    expect(area2.squareMetres).toBe(2);
    expect(area2).toBe(area1);

    const area3 = new Area(5, AreaUnit.SQUARE_METRE);
    const area4 = area3.sub(3, AreaUnit.SQUARE_METRE);
    expect(area3.squareMetres).toBe(2);
    expect(area4.squareMetres).toBe(2);
    expect(area4).toBe(area3);
});

test('Multiplication By Number', () => {
    const area1 = new Area(5, AreaUnit.SQUARE_METRE);
    const area2 = area1.mulByNumber(3);
    expect(area1.squareMetres).toBe(15);
    expect(area2.squareMetres).toBe(15);
    expect(area2).toBe(area1);
});

test('Division By Number', () => {
    const area1 = new Area(15, AreaUnit.SQUARE_METRE);
    const area2 = area1.divByNumber(3);
    expect(area1.squareMetres).toBe(5);
    expect(area2.squareMetres).toBe(5);
    expect(area2).toBeInstanceOf(Area);
});

test('Division By Length', () => {
    const area1 = new Area(15, AreaUnit.SQUARE_METRE);
    const Length1 = area1.divByLength(new Length(3, LengthUnit.METRE));
    expect(area1.squareMetres).toBe(15);
    expect(Length1.metres).toBe(5);
    expect(Length1).toBeInstanceOf(Length);

    const area2 = new Area(15, AreaUnit.SQUARE_METRE);
    const Length2 = area2.divByLength(3, LengthUnit.METRE);
    expect(area2.squareMetres).toBe(15);
    expect(Length2.metres).toBe(5);
    expect(Length2).toBeInstanceOf(Length);
});

test('Division By Area', () => {
    const area1 = new Area(15, AreaUnit.SQUARE_METRE);
    const value1 = area1.divByArea(new Area(3, AreaUnit.SQUARE_METRE));
    expect(area1.squareMetres).toBe(15);
    expect(value1).toBe(5);

    const area2 = new Area(15, AreaUnit.SQUARE_METRE);
    const value2 = area2.divByArea(3, AreaUnit.SQUARE_METRE);
    expect(area2.squareMetres).toBe(15);
    expect(value2).toBe(5);
});

test('Is Equal To', () => {
    const area1 = new Area(15, AreaUnit.SQUARE_METRE);
    const area2 = new Area(15, AreaUnit.SQUARE_METRE);
    const area3 = new Area(20, AreaUnit.SQUARE_METRE);
    expect(area1.isEqualTo(area2)).toBe(true);
    expect(area1.isEqualTo(area3)).toBe(false);
});

test('Is Less Than', () => {
    const area1 = new Area(10, AreaUnit.SQUARE_METRE);
    const area2 = new Area(15, AreaUnit.SQUARE_METRE);
    const area3 = new Area(15, AreaUnit.SQUARE_METRE);
    const area4 = new Area(20, AreaUnit.SQUARE_METRE);

    expect(area1.isLessThan(area2)).toBe(true);
    expect(area1.isLessThan(area3)).toBe(true);
    expect(area1.isLessThan(area4)).toBe(true);

    expect(area2.isLessThan(area1)).toBe(false);
    expect(area2.isLessThan(area3)).toBe(false);
    expect(area2.isLessThan(area4)).toBe(true);

    expect(area3.isLessThan(area1)).toBe(false);
    expect(area3.isLessThan(area2)).toBe(false);
    expect(area3.isLessThan(area4)).toBe(true);

    expect(area4.isLessThan(area1)).toBe(false);
    expect(area4.isLessThan(area2)).toBe(false);
    expect(area4.isLessThan(area3)).toBe(false);
});

test('Is Less Than Or Equal To', () => {
    const area1 = new Area(10, AreaUnit.SQUARE_METRE);
    const area2 = new Area(15, AreaUnit.SQUARE_METRE);
    const area3 = new Area(15, AreaUnit.SQUARE_METRE);
    const area4 = new Area(20, AreaUnit.SQUARE_METRE);

    expect(area1.isLessThanOrEqualTo(area2)).toBe(true);
    expect(area1.isLessThanOrEqualTo(area3)).toBe(true);
    expect(area1.isLessThanOrEqualTo(area4)).toBe(true);

    expect(area2.isLessThanOrEqualTo(area1)).toBe(false);
    expect(area2.isLessThanOrEqualTo(area3)).toBe(true);
    expect(area2.isLessThanOrEqualTo(area4)).toBe(true);

    expect(area3.isLessThanOrEqualTo(area1)).toBe(false);
    expect(area3.isLessThanOrEqualTo(area2)).toBe(true);
    expect(area3.isLessThanOrEqualTo(area4)).toBe(true);

    expect(area4.isLessThanOrEqualTo(area1)).toBe(false);
    expect(area4.isLessThanOrEqualTo(area2)).toBe(false);
    expect(area4.isLessThanOrEqualTo(area3)).toBe(false);
});

test('Is Greater Than', () => {
    const area1 = new Area(10, AreaUnit.SQUARE_METRE);
    const area2 = new Area(15, AreaUnit.SQUARE_METRE);
    const area3 = new Area(15, AreaUnit.SQUARE_METRE);
    const area4 = new Area(20, AreaUnit.SQUARE_METRE);

    expect(area1.isGreaterThan(area2)).toBe(false);
    expect(area1.isGreaterThan(area3)).toBe(false);
    expect(area1.isGreaterThan(area4)).toBe(false);

    expect(area2.isGreaterThan(area1)).toBe(true);
    expect(area2.isGreaterThan(area3)).toBe(false);
    expect(area2.isGreaterThan(area4)).toBe(false);

    expect(area3.isGreaterThan(area1)).toBe(true);
    expect(area3.isGreaterThan(area2)).toBe(false);
    expect(area3.isGreaterThan(area4)).toBe(false);

    expect(area4.isGreaterThan(area1)).toBe(true);
    expect(area4.isGreaterThan(area2)).toBe(true);
    expect(area4.isGreaterThan(area3)).toBe(true);
});

test('Is Greater Than Or Equal To', () => {
    const area1 = new Area(10, AreaUnit.SQUARE_METRE);
    const area2 = new Area(15, AreaUnit.SQUARE_METRE);
    const area3 = new Area(15, AreaUnit.SQUARE_METRE);
    const area4 = new Area(20, AreaUnit.SQUARE_METRE);

    expect(area1.isGreaterThanOrEqualTo(area2)).toBe(false);
    expect(area1.isGreaterThanOrEqualTo(area3)).toBe(false);
    expect(area1.isGreaterThanOrEqualTo(area4)).toBe(false);

    expect(area2.isGreaterThanOrEqualTo(area1)).toBe(true);
    expect(area2.isGreaterThanOrEqualTo(area3)).toBe(true);
    expect(area2.isGreaterThanOrEqualTo(area4)).toBe(false);

    expect(area3.isGreaterThanOrEqualTo(area1)).toBe(true);
    expect(area3.isGreaterThanOrEqualTo(area2)).toBe(true);
    expect(area3.isGreaterThanOrEqualTo(area4)).toBe(false);

    expect(area4.isGreaterThanOrEqualTo(area1)).toBe(true);
    expect(area4.isGreaterThanOrEqualTo(area2)).toBe(true);
    expect(area4.isGreaterThanOrEqualTo(area3)).toBe(true);
});

test('Handling of non number types', () => {

    expect(new Area(1, AreaUnit.SQUARE_METRE).squareMetres).toBe(1);

    // @ts-ignore, for testing purposes
    expect(new Area("1", AreaUnit.SQUARE_METRE).squareMetres).toBe(1);

    expect(new Area(1.5, AreaUnit.SQUARE_METRE).squareMetres).toBe(1.5);

    // @ts-ignore, for testing purposes
    expect(new Area("1.5", AreaUnit.SQUARE_METRE).squareMetres).toBe(1.5);

    expect(new Area(1, AreaUnit.SQUARE_METRE).add(new Area(1, AreaUnit.SQUARE_METRE)).squareMetres).toBe(2);
    // @ts-ignore, for testing purposes
    expect(new Area(1, AreaUnit.SQUARE_METRE).add(new Area('1', AreaUnit.SQUARE_METRE)).squareMetres).toBe(2);
    // @ts-ignore, for testing purposes
    expect(new Area('1', AreaUnit.SQUARE_METRE).add(new Area(1, AreaUnit.SQUARE_METRE)).squareMetres).toBe(2);
    // @ts-ignore, for testing purposes
    expect(new Area('1', AreaUnit.SQUARE_METRE).add(new Area('1', AreaUnit.SQUARE_METRE)).squareMetres).toBe(2);

    expect(new Area(1.5, AreaUnit.SQUARE_METRE).add(new Area(1.5, AreaUnit.SQUARE_METRE)).squareMetres).toBe(3);
    // @ts-ignore, for testing purposes
    expect(new Area(1.5, AreaUnit.SQUARE_METRE).add(new Area('1.5', AreaUnit.SQUARE_METRE)).squareMetres).toBe(3);
    // @ts-ignore, for testing purposes
    expect(new Area('1.5', AreaUnit.SQUARE_METRE).add(new Area(1.5, AreaUnit.SQUARE_METRE)).squareMetres).toBe(3);
    // @ts-ignore, for testing purposes
    expect(new Area('1.5', AreaUnit.SQUARE_METRE).add(new Area('1.5', AreaUnit.SQUARE_METRE)).squareMetres).toBe(3);

    expect(new Area(1, AreaUnit.SQUARE_METRE).add(1, AreaUnit.SQUARE_METRE).squareMetres).toBe(2);
    // @ts-ignore, for testing purposes
    expect(new Area(1, AreaUnit.SQUARE_METRE).add('1', AreaUnit.SQUARE_METRE).squareMetres).toBe(2);
    // @ts-ignore, for testing purposes
    expect(new Area('1', AreaUnit.SQUARE_METRE).add(1, AreaUnit.SQUARE_METRE).squareMetres).toBe(2);
    // @ts-ignore, for testing purposes
    expect(new Area('1', AreaUnit.SQUARE_METRE).add('1', AreaUnit.SQUARE_METRE).squareMetres).toBe(2);

    expect(new Area(1.5, AreaUnit.SQUARE_METRE).add(1.5, AreaUnit.SQUARE_METRE).squareMetres).toBe(3);
    // @ts-ignore, for testing purposes
    expect(new Area(1.5, AreaUnit.SQUARE_METRE).add('1.5', AreaUnit.SQUARE_METRE).squareMetres).toBe(3);
    // @ts-ignore, for testing purposes
    expect(new Area('1.5', AreaUnit.SQUARE_METRE).add(1.5, AreaUnit.SQUARE_METRE).squareMetres).toBe(3);
    // @ts-ignore, for testing purposes
    expect(new Area('1.5', AreaUnit.SQUARE_METRE).add('1.5', AreaUnit.SQUARE_METRE).squareMetres).toBe(3);
});

test('Comparison of different units', () => {
    expect(new Area(1, AreaUnit.SQUARE_METRE).compare(new Area(1, AreaUnit.SQUARE_CENTIMETRE))).toBe(1);
    expect(new Area(1, AreaUnit.SQUARE_METRE).compare(new Area(1, AreaUnit.SQUARE_MILLIMETRE))).toBe(1);
    expect(new Area(1, AreaUnit.SQUARE_METRE).compare(new Area(1, AreaUnit.SQUARE_METRE))).toBe(0);
    expect(new Area(1, AreaUnit.SQUARE_METRE).compare(new Area(1, AreaUnit.SQUARE_KILOMETRE))).toBe(-1);
    expect(new Area(1, AreaUnit.SQUARE_METRE).compare(new Area(1, AreaUnit.SQUARE_INCH))).toBe(1);
    expect(new Area(1, AreaUnit.SQUARE_METRE).compare(new Area(1, AreaUnit.SQUARE_FOOT))).toBe(1);
    expect(new Area(1, AreaUnit.SQUARE_METRE).compare(new Area(1, AreaUnit.SQUARE_YARD))).toBe(1);
    expect(new Area(1, AreaUnit.SQUARE_METRE).compare(new Area(1, AreaUnit.SQUARE_MILE))).toBe(-1);

});

test('Conversion', () => {
    expect(Area.zero().toImmutable()).toBeInstanceOf(AreaImmutable);
    expect(AreaImmutable.zero().toMutable()).toBeInstanceOf(Area);
});

test('Multiplication By Length', () => {
    const area = new Area(9, AreaUnit.SQUARE_METRE);
    const length = new Length(3, LengthUnit.METRE);
    const volume = area.mulByLength(length);
    expect(volume.cubeMetres).toBe(27);

    const volume2 = area.mulByLength(3, LengthUnit.METRE);
    expect(volume2.cubeMetres).toBe(27);
});
