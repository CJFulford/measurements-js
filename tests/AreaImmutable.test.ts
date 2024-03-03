import AreaUnit from "../src/AreaUnit";
import LengthUnit from "../src/LengthUnit";
import AreaImmutable from "../src/AreaImmutable";
import LengthImmutable from "../src/LengthImmutable";

test('Addition', () => {
    const area1 = new AreaImmutable(1, AreaUnit.SQUARE_METRE);
    const area2 = area1.add(new AreaImmutable(1, AreaUnit.SQUARE_METRE));
    expect(area1.squareMetres).toBe(1);
    expect(area2.squareMetres).toBe(2);
    expect(area2).toBeInstanceOf(AreaImmutable);

    const area3 = new AreaImmutable(1, AreaUnit.SQUARE_METRE);
    const area4 = area3.add(1, AreaUnit.SQUARE_METRE);
    expect(area3.squareMetres).toBe(1);
    expect(area4.squareMetres).toBe(2);
    expect(area4).toBeInstanceOf(AreaImmutable);
});

test('Subtraction', () => {
    const area1 = new AreaImmutable(5, AreaUnit.SQUARE_METRE);
    const area2 = area1.sub(new AreaImmutable(3, AreaUnit.SQUARE_METRE));
    expect(area1.squareMetres).toBe(5);
    expect(area2.squareMetres).toBe(2);
    expect(area2).toBeInstanceOf(AreaImmutable);

    const area3 = new AreaImmutable(5, AreaUnit.SQUARE_METRE);
    const area4 = area3.sub(3, AreaUnit.SQUARE_METRE);
    expect(area3.squareMetres).toBe(5);
    expect(area4.squareMetres).toBe(2);
    expect(area4).toBeInstanceOf(AreaImmutable);
});

test('Multiplication By Number', () => {
    const area1 = new AreaImmutable(5, AreaUnit.SQUARE_METRE);
    const area2 = area1.mulByNumber(3);
    expect(area1.squareMetres).toBe(5);
    expect(area2.squareMetres).toBe(15);
    expect(area2).toBeInstanceOf(AreaImmutable);
});

test('Division By Number', () => {
    const area1 = new AreaImmutable(15, AreaUnit.SQUARE_METRE);
    const area2 = area1.divByNumber(3);
    expect(area1.squareMetres).toBe(15);
    expect(area2.squareMetres).toBe(5);
    expect(area2).toBeInstanceOf(AreaImmutable);
});

test('Division By Length', () => {
    const area1 = new AreaImmutable(15, AreaUnit.SQUARE_METRE);
    const Length1 = area1.divByLength(new LengthImmutable(3, LengthUnit.METRE));
    expect(area1.squareMetres).toBe(15);
    expect(Length1.metres).toBe(5);
    expect(Length1).toBeInstanceOf(LengthImmutable);

    const area2 = new AreaImmutable(15, AreaUnit.SQUARE_METRE);
    const Length2 = area2.divByLength(3, LengthUnit.METRE);
    expect(area2.squareMetres).toBe(15);
    expect(Length2.metres).toBe(5);
    expect(Length2).toBeInstanceOf(LengthImmutable);
});

test('Division By Area', () => {
    const area1 = new AreaImmutable(15, AreaUnit.SQUARE_METRE);
    const value1 = area1.divByArea(new AreaImmutable(3, AreaUnit.SQUARE_METRE));
    expect(area1.squareMetres).toBe(15);
    expect(value1).toBe(5);

    const area2 = new AreaImmutable(15, AreaUnit.SQUARE_METRE);
    const value2 = area2.divByArea(3, AreaUnit.SQUARE_METRE);
    expect(area2.squareMetres).toBe(15);
    expect(value2).toBe(5);
});
