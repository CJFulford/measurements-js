import LengthUnit from "./LengthUnit";
import AbstractArea from "./AbstractArea";

export type LengthArg = AbstractLength | number;
export type UnitArg = LengthUnit | number;

export default abstract class AbstractLength {
    protected value: number;
    protected unit: LengthUnit;

    protected constructor(value: number, unit: UnitArg) {
        this.value = value;
        this.unit = unit instanceof LengthUnit ? unit : LengthUnit.getById(unit as number);
    }

    public getValue(unit: UnitArg): number {
        unit = unit instanceof LengthUnit ? unit : LengthUnit.getById(unit as number);
        return this.value * this.unit.baseUnitsPer / unit.baseUnitsPer;
    }

    get kilometres() {
        return this.getValue(LengthUnit.KILOMETRE);
    }

    get metres() {
        return this.getValue(LengthUnit.METRE);
    }

    get centimetres() {
        return this.getValue(LengthUnit.CENTIMETRE);
    }

    get millimetres() {
        return this.getValue(LengthUnit.MILLIMETRE);
    }

    get inches() {
        return this.getValue(LengthUnit.INCH);
    }

    get feet() {
        return this.getValue(LengthUnit.FOOT);
    }

    get yards() {
        return this.getValue(LengthUnit.YARD);
    }

    get miles() {
        return this.getValue(LengthUnit.MILE);
    }

    abstract add(length: AbstractLength): AbstractLength;
    abstract add(length: number, unit: UnitArg): AbstractLength;
    abstract add(length: LengthArg, unit?: UnitArg): AbstractLength;

    abstract sub(length: AbstractLength): AbstractLength;
    abstract sub(length: number, unit: UnitArg): AbstractLength;
    abstract sub(length: LengthArg, unit?: UnitArg): AbstractLength;

    abstract mulByNumber(value: number): AbstractLength;

    abstract mulByLength(length: AbstractLength): AbstractArea;
    abstract mulByLength(length: number, unit: UnitArg): AbstractArea;
    abstract mulByLength(length: LengthArg, unit?: UnitArg): AbstractArea;

    abstract divByNumber(value: number): AbstractLength;

    abstract divByLength(length: AbstractLength): number;
    abstract divByLength(length: number, unit: UnitArg): number;
    abstract divByLength(length: LengthArg, unit?: UnitArg): number;

    abstract isEqualTo(length: AbstractLength): boolean;
    abstract isEqualTo(length: number, unit: number): boolean;
    abstract isEqualTo(length: LengthArg, unit?: UnitArg): boolean;

    abstract isLessThan(length: AbstractLength): boolean;
    abstract isLessThan(length: number, unit: number): boolean;
    abstract isLessThan(length: LengthArg, unit?: UnitArg): boolean;

    abstract isLessThanOrEqualTo(length: AbstractLength): boolean;
    abstract isLessThanOrEqualTo(length: number, unit: number): boolean;
    abstract isLessThanOrEqualTo(length: LengthArg, unit?: UnitArg): boolean;

    abstract isGreaterThan(length: AbstractLength): boolean;
    abstract isGreaterThan(length: number, unit: number): boolean;
    abstract isGreaterThan(length: LengthArg, unit?: UnitArg): boolean;

    abstract isGreaterThanOrEqualTo(length: AbstractLength): boolean;
    abstract isGreaterThanOrEqualTo(length: number, unit: number): boolean;
    abstract isGreaterThanOrEqualTo(length: LengthArg, unit?: UnitArg): boolean;

    format(decimals: number, unit: UnitArg, type: "name" | "acronym" | "symbol" = "acronym"): string {
        const numeral = require('numeral');
        const number = numeral(this.getValue(unit)).format();

        unit = unit instanceof LengthUnit ? unit : LengthUnit.getById(unit as number);

        let suffix;
        switch (type) {
            case "name":
                suffix = ' ' + (this.isEqualTo(1, unit) ? unit.name : unit.pluralName);
                break;
            case "acronym":
                suffix = unit.acronym;
                break;
            case "symbol":
                suffix = unit.symbol;
                break;
            default:
                throw new Error("Invalid format type");
        }

        return `${number}${suffix}`;
    }
}
