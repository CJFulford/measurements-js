import {VolumeUnit} from "../src/VolumeUnit";
import {Area, Length, Volume} from "../src/Measurements";
import {AreaUnit} from "../src/AreaUnit";
import {LengthUnit} from "../src/LengthUnit";

describe('Volume', () => {
    test('should add and subtract volumes', () => {
        const v1 = new Volume(2, VolumeUnit.CUBE_METRE);
        v1.add(new Volume(3, VolumeUnit.CUBE_METRE));
        expect(v1.cubeMetres).toBe(5);
        v1.sub(1, VolumeUnit.CUBE_METRE);
        expect(v1.cubeMetres).toBe(4);
    });

    test('should multiply and divide by number', () => {
        const v = new Volume(2, VolumeUnit.CUBE_METRE);
        v.mulByNumber(3);
        expect(v.cubeMetres).toBe(6);
        v.divByNumber(2);
        expect(v.cubeMetres).toBe(3);
    });

    test('should compare volumes', () => {
        const v1 = new Volume(2, VolumeUnit.CUBE_METRE);
        const v2 = new Volume(3, VolumeUnit.CUBE_METRE);
        expect(v1.isLessThan(v2)).toBe(true);
        expect(v2.isGreaterThan(v1)).toBe(true);
        expect(v1.isEqualTo(2, VolumeUnit.CUBE_METRE)).toBe(true);
    });

    test('should convert between units', () => {
        const v = new Volume(1000, VolumeUnit.CUBE_CENTIMETRE);
        expect(v.cubeMetres).toBeCloseTo(0.001);
        v.add(1, VolumeUnit.CUBE_METRE);
        expect(v.cubeMetres).toBeCloseTo(1.001);
    });

    test('should format correctly', () => {
        const v = new Volume(1, VolumeUnit.CUBE_METRE);
        expect(v.format(2, VolumeUnit.CUBE_METRE, 'acronym')).toContain('m³');
        expect(v.format(2, VolumeUnit.CUBE_METRE, 'name')).toContain('cubic metre');
    });

    test('should interact with Area and Length', () => {
        const area = new Area(2, AreaUnit.SQUARE_METRE);
        const length = new Length(3, LengthUnit.METRE);
        const v = area.mulByLength(length);
        expect(v.cubeMetres).toBe(6);
        const v2 = length.mulByArea(area);
        expect(v2.cubeMetres).toBe(6);
    });
});
