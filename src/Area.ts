import AreaUnit from "./AreaUnit";
import AbstractArea, {AreaArg, UnitArg} from "./AbstractArea";
import AbstractLength, {LengthArg, UnitArg as LengthUnitArg} from "./AbstractLength";
import Length from "./Length";
import LengthUnit from "./LengthUnit";
import {floatsEqual} from "./Helpers";

export default class Area extends AbstractArea {
    constructor(value: number, unit: UnitArg) {
        super(value, unit);
    }

    add(area: AbstractArea): Area;
    add(area: number, unit: UnitArg): Area;
    add(area: AreaArg, unit?: UnitArg): Area {
        // convert the area to an Area if it is not already
        area = area instanceof AbstractArea ? area : new Area(area, unit as AreaUnit);
        this.value += area.getValue(this.unit);
        return this;
    }

    sub(area: AbstractArea): Area;
    sub(area: number, unit: UnitArg): Area;
    sub(area: AreaArg, unit?: UnitArg): Area {
        // convert the area to an Area if it is not already
        area = area instanceof AbstractArea ? area : new Area(area, unit as AreaUnit);
        this.value -= area.getValue(this.unit);
        return this;
    }

    mulByNumber(value: number): Area {
        this.value *= value;
        return this;
    }

    divByNumber(value: number): Area {
        this.value /= value;
        return this;
    }

    divByLength(length: AbstractLength): Length;
    divByLength(length: number, unit: LengthUnitArg): Length;
    divByLength(length: LengthArg, unit?: LengthUnitArg): Length {
        return length instanceof AbstractLength
            ? new Length(this.squareMetres / length.metres, LengthUnit.METRE)
            : this.divByLength(new Length(length, unit as LengthUnitArg));
    }

    divByArea(area: AbstractArea): number;
    divByArea(area: number, unit: UnitArg): number;
    divByArea(area: AreaArg, unit?: UnitArg): number {
        return area instanceof AbstractArea
            ? this.squareMetres / area.squareMetres
            : this.divByArea(new Area(area, unit as AreaUnit));
    }

    isEqualTo(area: AbstractArea): boolean;
    isEqualTo(area: number, unit: number): boolean;
    isEqualTo(area: AreaArg, unit?: UnitArg): boolean {
        return area instanceof AbstractArea
            ? floatsEqual(this.squareMetres, area.squareMetres)
            : this.isEqualTo(new Area(area, unit as UnitArg));
    }

    isLessThan(area: AbstractArea): boolean;
    isLessThan(area: number, unit: number): boolean;
    isLessThan(area: AreaArg, unit?: UnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres < area.squareMetres
            : this.isLessThan(new Area(area, unit as UnitArg));
    }

    isLessThanOrEqualTo(area: AbstractArea): boolean;
    isLessThanOrEqualTo(area: number, unit: number): boolean;
    isLessThanOrEqualTo(area: AreaArg, unit?: UnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isLessThan(area) || this.isEqualTo(area)
            : this.isLessThanOrEqualTo(new Area(area, unit as UnitArg));
    }

    isGreaterThan(area: AbstractArea): boolean;
    isGreaterThan(area: number, unit: number): boolean;
    isGreaterThan(area: AreaArg, unit?: UnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres > area.squareMetres
            : this.isGreaterThan(new Area(area, unit as UnitArg));
    }

    isGreaterThanOrEqualTo(area: AbstractArea): boolean;
    isGreaterThanOrEqualTo(area: number, unit: number): boolean;
    isGreaterThanOrEqualTo(area: AreaArg, unit?: UnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isGreaterThan(area) || this.isEqualTo(area)
            : this.isGreaterThanOrEqualTo(new Area(area, unit as UnitArg));
    }
}
