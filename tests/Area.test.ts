import Area from "../src/Area";
import AreaUnit from "../src/AreaUnit";

test('Add 2 Objects', () => {
    const area = new Area(1, AreaUnit.SQUARE_METRE);
    area.add(new Area(1, AreaUnit.SQUARE_METRE));
    expect(area.squareMetres).toBe(2);
});

test('Add object with arguments', () => {
    const area = new Area(1, AreaUnit.SQUARE_METRE);
    area.add(1, AreaUnit.SQUARE_METRE);
    expect(area.squareMetres).toBe(2);
});
