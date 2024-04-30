import {LengthUnit} from "./LengthUnit";

export class AreaUnit {
    public static readonly SQUARE_METRE = 1;
    public static readonly SQUARE_KILOMETRE = 2;
    public static readonly SQUARE_CENTIMETRE = 3;
    public static readonly SQUARE_MILLIMETRE = 4;
    public static readonly SQUARE_INCH = 5;
    public static readonly SQUARE_FOOT = 6;
    public static readonly SQUARE_YARD = 7;
    public static readonly SQUARE_MILE = 8;

    public readonly id: number;
    public readonly name: string;
    public readonly pluralName: string;
    public readonly acronym: string;
    public readonly correspondingLengthUnit: LengthUnit;
    public readonly baseUnitsPer: number;

    private static units: AreaUnit[];

    constructor(id: number, name: string, pluralName: string, acronym: string, correspondingLengthUnitId: number) {

        AreaUnit.buildDefaultUnits();

        this.id = id;
        this.name = name;
        this.pluralName = pluralName;
        this.acronym = acronym;
        this.correspondingLengthUnit = LengthUnit.getById(correspondingLengthUnitId);
        this.baseUnitsPer = this.correspondingLengthUnit.baseUnitsPer ** 2;

        AreaUnit.checkForUniqueness(this);
        AreaUnit.units.push(this);
    }

    private static buildDefaultUnits(): void {
        if (AreaUnit.units !== undefined) {
            return;
        }

        AreaUnit.units = [];

        new AreaUnit(AreaUnit.SQUARE_KILOMETRE, 'square kilometre', 'square kilometres', 'km²', LengthUnit.KILOMETRE);
        new AreaUnit(AreaUnit.SQUARE_METRE, 'square metre', 'square metres', 'm²', LengthUnit.METRE);
        new AreaUnit(AreaUnit.SQUARE_CENTIMETRE, 'square centimetre', 'square centimetres', 'cm²', LengthUnit.CENTIMETRE);
        new AreaUnit(AreaUnit.SQUARE_MILLIMETRE, 'square millimetre', 'square millimetres', 'mm²', LengthUnit.MILLIMETRE);
        new AreaUnit(AreaUnit.SQUARE_INCH, 'square inch', 'square inches', 'in²', LengthUnit.INCH);
        new AreaUnit(AreaUnit.SQUARE_FOOT, 'square foot', 'square feet', 'ft²', LengthUnit.FOOT);
        new AreaUnit(AreaUnit.SQUARE_YARD, 'square yard', 'square yards', 'yd²', LengthUnit.YARD);
        new AreaUnit(AreaUnit.SQUARE_MILE, 'square mile', 'square miles', 'mi²', LengthUnit.MILE);
    }

    private static checkForUniqueness(newUnit: AreaUnit): void {
        for (const unit of AreaUnit.units) {
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

    public static getById(id: number): AreaUnit {
        AreaUnit.buildDefaultUnits();

        for (const unit of AreaUnit.units) {
            if (unit.id === id) {
                return unit;
            }
        }
        throw new Error(`No unit found with id ${id}`);
    }
}
