import AreaUnit from "../src/AreaUnit";
import AreaImmutable from "../src/AreaImmutable";

test('Add 2 Objects', () => {
    const area1 = new AreaImmutable(1, AreaUnit.SQUARE_METRE);
    const area2 = area1.add(new AreaImmutable(1, AreaUnit.SQUARE_METRE));
    expect(area1.squareMetres).toBe(1);
    expect(area2.squareMetres).toBe(2);
});

test('Add object with arguments', () => {
    const area1 = new AreaImmutable(1, AreaUnit.SQUARE_METRE);
    const area2 = area1.add(1, AreaUnit.SQUARE_METRE);
    expect(area1.squareMetres).toBe(1);
    expect(area2.squareMetres).toBe(2);
});
