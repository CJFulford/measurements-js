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
}
