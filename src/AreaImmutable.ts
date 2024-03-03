import AbstractArea, {AreaArg, UnitArg} from "./AbstractArea";
import AreaUnit from "./AreaUnit";
import AbstractLength, {LengthArg, UnitArg as LengthUnitArg} from "./AbstractLength";
import LengthUnit from "./LengthUnit";
import LengthImmutable from "./LengthImmutable";
import {floatsEqual} from "./Helpers";

export default class AreaImmutable extends AbstractArea {

    constructor(value: number, unit: UnitArg) {
        super(value, unit);
    }

    add(area: AbstractArea): AreaImmutable;
    add(area: number, unit: UnitArg): AreaImmutable;
    add(area: AreaArg, unit?: UnitArg): AreaImmutable {
        // convert the area to an Area if it is not already
        area = area instanceof AbstractArea ? area : new AreaImmutable(area, unit as AreaUnit);
        return new AreaImmutable(this.value + area.getValue(this.unit), this.unit);
    }

    sub(area: AbstractArea): AreaImmutable;
    sub(area: number, unit: UnitArg): AreaImmutable;
    sub(area: AreaArg, unit?: UnitArg): AreaImmutable {
        // convert the area to an Area if it is not already
        area = area instanceof AbstractArea ? area : new AreaImmutable(area, unit as AreaUnit);
        return new AreaImmutable(this.value - area.getValue(this.unit), this.unit);
    }

    mulByNumber(value: number): AreaImmutable {
        return new AreaImmutable(this.value * value, this.unit);
    }

    divByNumber(value: number): AreaImmutable {
        return new AreaImmutable(this.value / value, this.unit);
    }

    divByLength(length: AbstractLength): LengthImmutable;
    divByLength(length: number, unit: LengthUnitArg): LengthImmutable;
    divByLength(length: LengthArg, unit?: LengthUnitArg): LengthImmutable {
        return length instanceof AbstractLength
            ? new LengthImmutable(this.squareMetres / length.metres, LengthUnit.METRE)
            : this.divByLength(new LengthImmutable(length, unit as LengthUnitArg));
    }

    divByArea(area: AbstractArea): number;
    divByArea(area: number, unit: UnitArg): number;
    divByArea(area: AreaArg, unit?: UnitArg): number {
        return area instanceof AbstractArea
            ? this.squareMetres / area.squareMetres
            : this.divByArea(new AreaImmutable(area, unit as AreaUnit));
    }

    isEqualTo(area: AbstractArea): boolean;
    isEqualTo(area: number, unit: number): boolean;
    isEqualTo(area: AreaArg, unit?: UnitArg): boolean {
        return area instanceof AbstractArea
            ? floatsEqual(this.squareMetres, area.squareMetres)
            : this.isEqualTo(new AreaImmutable(area, unit as UnitArg));
    }

    isLessThan(area: AbstractArea): boolean;
    isLessThan(area: number, unit: number): boolean;
    isLessThan(area: AreaArg, unit?: UnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres < area.squareMetres
            : this.isLessThan(new AreaImmutable(area, unit as UnitArg));
    }

    isLessThanOrEqualTo(area: AbstractArea): boolean;
    isLessThanOrEqualTo(area: number, unit: number): boolean;
    isLessThanOrEqualTo(area: AreaArg, unit?: UnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isLessThan(area) || this.isEqualTo(area)
            : this.isLessThanOrEqualTo(new AreaImmutable(area, unit as UnitArg));
    }

    isGreaterThan(area: AbstractArea): boolean;
    isGreaterThan(area: number, unit: number): boolean;
    isGreaterThan(area: AreaArg, unit?: UnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres > area.squareMetres
            : this.isGreaterThan(new AreaImmutable(area, unit as UnitArg));
    }

    isGreaterThanOrEqualTo(area: AbstractArea): boolean;
    isGreaterThanOrEqualTo(area: number, unit: number): boolean;
    isGreaterThanOrEqualTo(area: AreaArg, unit?: UnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isGreaterThan(area) || this.isEqualTo(area)
            : this.isGreaterThanOrEqualTo(new AreaImmutable(area, unit as UnitArg));
    }
}
