import LengthUnit from "./LengthUnit";

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
    abstract add(length: LengthArg, unit: UnitArg): AbstractLength;
}
