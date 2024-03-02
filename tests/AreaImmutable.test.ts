import AreaUnit from "../src/AreaUnit";
import AreaImmutable from "../src/AreaImmutable";

test('Addition', () => {
    const area1 = new AreaImmutable(1, AreaUnit.SQUARE_METRE);
    const area2 = area1.add(new AreaImmutable(1, AreaUnit.SQUARE_METRE));
    expect(area1.squareMetres).toBe(1);
    expect(area2.squareMetres).toBe(2);

    const area3 = new AreaImmutable(1, AreaUnit.SQUARE_METRE);
    const area4 = area3.add(1, AreaUnit.SQUARE_METRE);
    expect(area3.squareMetres).toBe(1);
    expect(area4.squareMetres).toBe(2);
});

test('Subtraction', () => {
    const area1 = new AreaImmutable(5, AreaUnit.SQUARE_METRE);
    const area2 = area1.sub(new AreaImmutable(3, AreaUnit.SQUARE_METRE));
    expect(area1.squareMetres).toBe(5);
    expect(area2.squareMetres).toBe(2);

    const area3 = new AreaImmutable(5, AreaUnit.SQUARE_METRE);
    const area4 = area3.sub(3, AreaUnit.SQUARE_METRE);
    expect(area3.squareMetres).toBe(5);
    expect(area4.squareMetres).toBe(2);
});
