import Area from "../src/Area";
import AreaUnit from "../src/AreaUnit";

test('Addition', () => {
    const area1 = new Area(1, AreaUnit.SQUARE_METRE);
    area1.add(new Area(1, AreaUnit.SQUARE_METRE));
    expect(area1.squareMetres).toBe(2);

    const area2 = new Area(1, AreaUnit.SQUARE_METRE);
    area2.add(1, AreaUnit.SQUARE_METRE);
    expect(area2.squareMetres).toBe(2);
});

test('Subtraction', () => {
    const area1 = new Area(5, AreaUnit.SQUARE_METRE);
    area1.sub(new Area(3, AreaUnit.SQUARE_METRE));
    expect(area1.squareMetres).toBe(2);

    const area2 = new Area(5, AreaUnit.SQUARE_METRE);
    area2.sub(3, AreaUnit.SQUARE_METRE);
    expect(area2.squareMetres).toBe(2);
});

test('Multiplication', () => {
    const area1 = new Area(5, AreaUnit.SQUARE_METRE);
    const area2 = area1.mul(3);
    expect(area1.squareMetres).toBe(15);
    expect(area2.squareMetres).toBe(15);
});
