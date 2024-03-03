import AreaUnit from "./AreaUnit";
import AbstractLength, {LengthArg, UnitArg as LengthUnitArg} from "./AbstractLength";

export type AreaArg = AbstractArea | number;
export type UnitArg = AreaUnit | number;

export default abstract class AbstractArea {

    protected value: number;
    protected unit: AreaUnit;

    protected constructor(value: number, unit: UnitArg) {
        this.value = value;
        this.unit = unit instanceof AreaUnit ? unit : AreaUnit.getById(unit as number);
    }

    public getValue(unit: AreaUnit | number): number {
        unit = unit instanceof AreaUnit ? unit : AreaUnit.getById(unit as number);
        return this.value * this.unit.baseUnitsPer / unit.baseUnitsPer;
    }

    get squareKilometres() {
        return this.getValue(AreaUnit.SQUARE_KILOMETRE);
    }

    get squareMetres() {
        return this.getValue(AreaUnit.SQUARE_METRE);
    }

    get squareCentimetres() {
        return this.getValue(AreaUnit.SQUARE_CENTIMETRE);
    }

    get squareMillimetres() {
        return this.getValue(AreaUnit.SQUARE_MILLIMETRE);
    }

    get squareInches() {
        return this.getValue(AreaUnit.SQUARE_INCH);
    }

    get squareFeet() {
        return this.getValue(AreaUnit.SQUARE_FOOT);
    }

    get squareYards() {
        return this.getValue(AreaUnit.SQUARE_YARD);
    }

    get squareMiles() {
        return this.getValue(AreaUnit.SQUARE_MILE);
    }

    abstract add(area: AbstractArea): AbstractArea;
    abstract add(area: number, unit: AreaUnit | number): AbstractArea;
    abstract add(area: AreaArg, unit?: UnitArg): AbstractArea;

    abstract sub(area: AbstractArea): AbstractArea;
    abstract sub(area: number, unit: AreaUnit | number): AbstractArea;
    abstract sub(area: AreaArg, unit?: UnitArg): AbstractArea;

    abstract mulByNumber(value: number): AbstractArea;

    abstract divByNumber(value: number): AbstractArea;

    abstract divByLength(length: AbstractLength): AbstractLength;
    abstract divByLength(length: number, unit: LengthUnitArg): AbstractLength;
    abstract divByLength(length: LengthArg, unit?: LengthUnitArg): AbstractLength;

    abstract divByArea(area: AbstractArea): number;
    abstract divByArea(area: number, unit: UnitArg): number;
    abstract divByArea(area: AreaArg, unit?: UnitArg): number;

    abstract isEqualTo(area: AbstractArea): boolean;
    abstract isEqualTo(area: number, unit: number): boolean;
    abstract isEqualTo(area: AreaArg, unit?: UnitArg): boolean;

    abstract isLessThan(area: AbstractArea): boolean;
    abstract isLessThan(area: number, unit: number): boolean;
    abstract isLessThan(area: AreaArg, unit?: UnitArg): boolean;

    abstract isLessThanOrEqualTo(area: AbstractArea): boolean;
    abstract isLessThanOrEqualTo(area: number, unit: number): boolean;
    abstract isLessThanOrEqualTo(area: AreaArg, unit?: UnitArg): boolean;

    abstract isGreaterThan(area: AbstractArea): boolean;
    abstract isGreaterThan(area: number, unit: number): boolean;
    abstract isGreaterThan(area: AreaArg, unit?: UnitArg): boolean;

    abstract isGreaterThanOrEqualTo(area: AbstractArea): boolean;
    abstract isGreaterThanOrEqualTo(area: number, unit: number): boolean;
    abstract isGreaterThanOrEqualTo(area: AreaArg, unit?: UnitArg): boolean;

    format(decimals: number, unit: UnitArg, type: "name" | "acronym" = "acronym"): string {
        const numeral = require('numeral');
        const number = numeral(this.getValue(unit)).format();

        unit = unit instanceof AreaUnit ? unit : AreaUnit.getById(unit as number);

        let suffix;
        switch (type) {
            case "name":
                suffix = ' ' + (this.isEqualTo(1, unit) ? unit.name : unit.pluralName);
                break;
            case "acronym":
                suffix = unit.acronym;
                break;
            default:
                throw new Error("Invalid format type");
        }

        return `${number}${suffix}`;
    }
}
