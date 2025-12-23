import {VolumeUnit} from "../src/VolumeUnit";
import {AreaImmutable, LengthImmutable, VolumeImmutable} from "../src/Measurements";
import {AreaUnit} from "../src/AreaUnit";
import {LengthUnit} from "../src/LengthUnit";

describe('VolumeImmutable', () => {
    test('should add and subtract volumes immutably', () => {
        const v1 = new VolumeImmutable(2, VolumeUnit.CUBE_METRE);
        const v2 = v1.add(new VolumeImmutable(3, VolumeUnit.CUBE_METRE));
        expect(v1.cubeMetres).toBe(2);
        expect(v2.cubeMetres).toBe(5);
        const v3 = v2.sub(1, VolumeUnit.CUBE_METRE);
        expect(v2.cubeMetres).toBe(5);
        expect(v3.cubeMetres).toBe(4);
    });

    test('should multiply and divide by number immutably', () => {
        const v = new VolumeImmutable(2, VolumeUnit.CUBE_METRE);
        const v2 = v.mulByNumber(3);
        expect(v.cubeMetres).toBe(2);
        expect(v2.cubeMetres).toBe(6);
        const v3 = v2.divByNumber(2);
        expect(v2.cubeMetres).toBe(6);
        expect(v3.cubeMetres).toBe(3);
    });

    test('should compare volumes', () => {
        const v1 = new VolumeImmutable(2, VolumeUnit.CUBE_METRE);
        const v2 = new VolumeImmutable(3, VolumeUnit.CUBE_METRE);
        expect(v1.isLessThan(v2)).toBe(true);
        expect(v2.isGreaterThan(v1)).toBe(true);
        expect(v1.isEqualTo(2, VolumeUnit.CUBE_METRE)).toBe(true);
    });

    test('should convert between units', () => {
        const v = new VolumeImmutable(1000, VolumeUnit.CUBE_CENTIMETRE);
        expect(v.cubeMetres).toBeCloseTo(0.001);
        const v2 = v.add(1, VolumeUnit.CUBE_METRE);
        expect(v2.cubeMetres).toBeCloseTo(1.001);
    });

    test('should format correctly', () => {
        const v = new VolumeImmutable(1, VolumeUnit.CUBE_METRE);
        expect(v.format(2, VolumeUnit.CUBE_METRE, 'acronym')).toContain('m³');
        expect(v.format(2, VolumeUnit.CUBE_METRE, 'name')).toContain('cubic metre');
    });

    test('should interact with AreaImmutable and LengthImmutable', () => {
        const area = new AreaImmutable(2, AreaUnit.SQUARE_METRE);
        const length = new LengthImmutable(3, LengthUnit.METRE);
        const v = area.mulByLength(length);
        expect(v.cubeMetres).toBe(6);
        const v2 = length.mulByArea(area);
        expect(v2.cubeMetres).toBe(6);
    });
});
