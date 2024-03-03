import Area from "../src/Area";
import AreaUnit from "../src/AreaUnit";
import Length from "../src/Length";
import LengthUnit from "../src/LengthUnit";

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
