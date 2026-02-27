export class AngleUnit {
    public static readonly RADIANS = 1;
    public static readonly DEGREES = 2;

    public readonly id: number;
    public readonly baseUnitsPer: number;
    public readonly name: string;
    public readonly pluralName: string;
    public readonly acronym: string;
    public readonly symbol: string;

    private static units: AngleUnit[];

    constructor(id: number, baseUnitsPer: number, name: string, pluralName: string, acronym: string, symbol: string) {
        AngleUnit.buildDefaultUnits();

        this.id = id;
        this.baseUnitsPer = baseUnitsPer;
        this.name = name;
        this.pluralName = pluralName;
        this.acronym = acronym;
        this.symbol = symbol;

        AngleUnit.checkForUniqueness(this);
        AngleUnit.units.push(this);
    }

    private static buildDefaultUnits(): void {
        if (AngleUnit.units !== undefined) {
            return;
        }

        AngleUnit.units = [];

        new AngleUnit(AngleUnit.RADIANS, 1, 'radian', 'radians', 'rad', 'rad');
        new AngleUnit(AngleUnit.DEGREES, Math.PI / 180, 'degree', 'degrees', 'deg', '°');
    }

    private static checkForUniqueness(newUnit: AngleUnit): void {
        for (const unit of AngleUnit.units) {
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

    public static getById(id: number): AngleUnit {
        AngleUnit.buildDefaultUnits();

        for (const unit of AngleUnit.units) {
            if (unit.id === id) {
                return unit;
            }
        }
        throw new Error(`No angle unit found with id ${id}`);
    }
}
