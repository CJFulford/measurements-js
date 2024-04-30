export class LengthUnit {
    public static readonly KILOMETRE = 1;
    public static readonly METRE = 2;
    public static readonly CENTIMETRE = 3;
    public static readonly MILLIMETRE = 4;
    public static readonly INCH = 5;
    public static readonly FOOT = 6;
    public static readonly YARD = 7;
    public static readonly MILE = 8;

    public readonly id: number;
    public readonly baseUnitsPer: number;
    public readonly name: string;
    public readonly pluralName: string;
    public readonly acronym: string;
    public readonly symbol: string;

    private static units: LengthUnit[];

    constructor(id: number, baseUnitsPer: number, name: string, pluralName: string, acronym: string, symbol: string) {
        LengthUnit.buildDefaultUnits();

        this.id = id;
        this.baseUnitsPer = baseUnitsPer;
        this.name = name;
        this.pluralName = pluralName;
        this.acronym = acronym;
        this.symbol = symbol;

        LengthUnit.checkForUniqueness(this);
        LengthUnit.units.push(this);
    }

    private static buildDefaultUnits(): void {
        if (LengthUnit.units !== undefined) {
            return;
        }

        LengthUnit.units = [];

        new LengthUnit(LengthUnit.KILOMETRE, 1000, 'kilometre', 'kilometres', 'km', 'km');
        new LengthUnit(LengthUnit.METRE, 1, 'metre', 'metres', 'm', 'm');
        new LengthUnit(LengthUnit.CENTIMETRE, 0.01, 'centimetre', 'centimetres', 'cm', 'cm');
        new LengthUnit(LengthUnit.MILLIMETRE, 0.001, 'millimetre', 'millimetres', 'mm', 'mm');
        new LengthUnit(LengthUnit.INCH, 0.0254, 'inch', 'inches', 'in', '"');
        new LengthUnit(LengthUnit.FOOT, 0.3048, 'foot', 'feet', 'ft', "'");
        new LengthUnit(LengthUnit.YARD, 0.9144, 'yard', 'yards', 'yd', 'yd');
        new LengthUnit(LengthUnit.MILE, 1609.344, 'mile', 'miles', 'mi', 'mi');
    }

    private static checkForUniqueness(newUnit: LengthUnit): void {
        for (const unit of LengthUnit.units) {
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
            } else if (unit.symbol === newUnit.symbol) {
                throw new Error(`Unit symbol ${newUnit.symbol} already exists`);
            }
        }
    }

    public static getById(id: number): LengthUnit {
        LengthUnit.buildDefaultUnits();

        for (const unit of LengthUnit.units) {
            if (unit.id === id) {
                return unit;
            }
        }
        throw new Error(`No length unit found with id ${id}`);
    }
}
