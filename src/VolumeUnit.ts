import {LengthUnit} from "./LengthUnit";

export class VolumeUnit {
    public static readonly CUBE_METRE = 1;
    public static readonly CUBE_KILOMETRE = 2;
    public static readonly CUBE_CENTIMETRE = 3;
    public static readonly CUBE_MILLIMETRE = 4;
    public static readonly CUBE_INCH = 5;
    public static readonly CUBE_FOOT = 6;
    public static readonly CUBE_YARD = 7;
    public static readonly CUBE_MILE = 8;

    public readonly id: number;
    public readonly name: string;
    public readonly pluralName: string;
    public readonly acronym: string;
    public readonly correspondingLengthUnit: LengthUnit;
    public readonly baseUnitsPer: number;

    private static units: VolumeUnit[];

    constructor(id: number, name: string, pluralName: string, acronym: string, correspondingLengthUnitId: number) {

        VolumeUnit.buildDefaultUnits();

        this.id = id;
        this.name = name;
        this.pluralName = pluralName;
        this.acronym = acronym;
        this.correspondingLengthUnit = LengthUnit.getById(correspondingLengthUnitId);
        this.baseUnitsPer = this.correspondingLengthUnit.baseUnitsPer ** 3;

        VolumeUnit.checkForUniqueness(this);
        VolumeUnit.units.push(this);
    }

    private static buildDefaultUnits(): void {
        if (VolumeUnit.units !== undefined) {
            return;
        }

        VolumeUnit.units = [];

        new VolumeUnit(VolumeUnit.CUBE_KILOMETRE, 'cube kilometre', 'cube kilometres', 'km³', LengthUnit.KILOMETRE);
        new VolumeUnit(VolumeUnit.CUBE_METRE, 'cube metre', 'cube metres', 'm³', LengthUnit.METRE);
        new VolumeUnit(VolumeUnit.CUBE_CENTIMETRE, 'cube centimetre', 'cube centimetres', 'cm³', LengthUnit.CENTIMETRE);
        new VolumeUnit(VolumeUnit.CUBE_MILLIMETRE, 'cube millimetre', 'cube millimetres', 'mm³', LengthUnit.MILLIMETRE);
        new VolumeUnit(VolumeUnit.CUBE_INCH, 'cube inch', 'cube inches', 'in³', LengthUnit.INCH);
        new VolumeUnit(VolumeUnit.CUBE_FOOT, 'cube foot', 'cube feet', 'ft³', LengthUnit.FOOT);
        new VolumeUnit(VolumeUnit.CUBE_YARD, 'cube yard', 'cube yards', 'yd³', LengthUnit.YARD);
        new VolumeUnit(VolumeUnit.CUBE_MILE, 'cube mile', 'cube miles', 'mi³', LengthUnit.MILE);
    }

    private static checkForUniqueness(newUnit: VolumeUnit): void {
        for (const unit of VolumeUnit.units) {
            if (unit.id === newUnit.id) {
                throw new Error(`Unit ID ${newUnit.id} already exists`);
            } else if (unit.baseUnitsPer === newUnit.baseUnitsPer) {
                throw new Error(`Unit base units per ${newUnit.baseUnitsPer} already exists`);
            } else if (unit.name === newUnit.name) {
                throw new Error(`Unit name ${newUnit.name} already exists`);
            } else if (unit.pluralName === newUnit.pluralName) {
                throw new Error(`Unit plural name ${newUnit.pluralName} already exists`);
            } else if (unit.acronym === newUnit.acronym) {
                throw new Error(`Unit acronym ${newUnit.acronym} already exists`);
            } else if (unit.correspondingLengthUnit.id === newUnit.correspondingLengthUnit.id) {
                throw new Error(`Unit corresponding length unit ${newUnit.correspondingLengthUnit.id} already exists`);
            }
        }
    }

    public static getById(id: number): VolumeUnit {
        VolumeUnit.buildDefaultUnits();

        for (const unit of VolumeUnit.units) {
            if (unit.id === id) {
                return unit;
            }
        }
        throw new Error(`No unit found with id ${id}`);
    }
}
