import {AbstractArea, AbstractLength, AreaArg, AreaUnitArg, LengthArg, LengthUnitArg} from "./Abstracts";
import {LengthUnit} from "./LengthUnit";
import {AreaUnit} from "./AreaUnit";
import {floatsEqual} from "./Helpers";

export class Length extends AbstractLength {

    constructor(value: number, unit: LengthUnitArg) {
        super(value, unit);
    }

    add(length: AbstractLength): Length;
    add(length: number, unit: LengthUnitArg): Length;
    add(length: LengthArg, unit?: LengthUnitArg): Length {
        // convert the length to a Length if it is not already
        length = length instanceof AbstractLength ? length : new Length(length, unit as LengthUnit | number);
        this.value += length.getValue(this.unit);
        return this;
    }

    sub(length: AbstractLength): Length;
    sub(length: number, unit: LengthUnitArg): Length;
    sub(length: LengthArg, unit?: LengthUnitArg): Length {
        // convert the length to a Length if it is not already
        length = length instanceof AbstractLength ? length : new Length(length, unit as LengthUnit | number);
        this.value -= length.getValue(this.unit);
        return this;
    }

    mulByNumber(value: number): Length {
        this.value *= value;
        return this;
    };

    mulByLength(length: AbstractLength): Area;
    mulByLength(length: number, unit: LengthUnitArg): Area;
    mulByLength(length: LengthArg, unit?: LengthUnitArg): Area {
        return length instanceof AbstractLength
            ? new Area(this.metres * length.metres, AreaUnit.SQUARE_METRE)
            : this.mulByLength(new Length(length, unit as LengthUnitArg));
    }

    divByNumber(value: number): Length {
        this.value /= value;
        return this;
    }

    divByLength(length: AbstractLength): number;
    divByLength(length: number, unit: LengthUnitArg): number;
    divByLength(length: LengthArg, unit?: LengthUnitArg): number {
        return length instanceof AbstractLength
            ? this.metres / length.metres
            : this.divByLength(new Length(length, unit as LengthUnitArg));
    }

    isEqualTo(length: AbstractLength): boolean;
    isEqualTo(length: number, unit: number): boolean;
    isEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? floatsEqual(this.metres, length.metres)
            : this.isEqualTo(new Length(length, unit as LengthUnitArg));
    }

    isLessThan(length: AbstractLength): boolean;
    isLessThan(length: number, unit: number): boolean;
    isLessThan(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.metres < length.metres
            : this.isLessThan(new Length(length, unit as LengthUnitArg));
    }

    isLessThanOrEqualTo(length: AbstractLength): boolean;
    isLessThanOrEqualTo(length: number, unit: number): boolean;
    isLessThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.isLessThan(length) || this.isEqualTo(length)
            : this.isLessThanOrEqualTo(new Length(length, unit as LengthUnitArg));
    }

    isGreaterThan(length: AbstractLength): boolean;
    isGreaterThan(length: number, unit: number): boolean;
    isGreaterThan(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.metres > length.metres
            : this.isGreaterThan(new Length(length, unit as LengthUnitArg));
    }

    isGreaterThanOrEqualTo(length: AbstractLength): boolean;
    isGreaterThanOrEqualTo(length: number, unit: number): boolean;
    isGreaterThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.isGreaterThan(length) || this.isEqualTo(length)
            : this.isGreaterThanOrEqualTo(new Length(length, unit as LengthUnitArg));
    }
}


export class Area extends AbstractArea {
    constructor(value: number, unit: AreaUnitArg) {
        super(value, unit);
    }

    add(area: AbstractArea): Area;
    add(area: number, unit: AreaUnitArg): Area;
    add(area: AreaArg, unit?: AreaUnitArg): Area {
        // convert the area to an Area if it is not already
        area = area instanceof AbstractArea ? area : new Area(area, unit as AreaUnit);
        this.value += area.getValue(this.unit);
        return this;
    }

    sub(area: AbstractArea): Area;
    sub(area: number, unit: AreaUnitArg): Area;
    sub(area: AreaArg, unit?: AreaUnitArg): Area {
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
    divByArea(area: number, unit: AreaUnitArg): number;
    divByArea(area: AreaArg, unit?: AreaUnitArg): number {
        return area instanceof AbstractArea
            ? this.squareMetres / area.squareMetres
            : this.divByArea(new Area(area, unit as AreaUnit));
    }

    isEqualTo(area: AbstractArea): boolean;
    isEqualTo(area: number, unit: number): boolean;
    isEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? floatsEqual(this.squareMetres, area.squareMetres)
            : this.isEqualTo(new Area(area, unit as AreaUnitArg));
    }

    isLessThan(area: AbstractArea): boolean;
    isLessThan(area: number, unit: number): boolean;
    isLessThan(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres < area.squareMetres
            : this.isLessThan(new Area(area, unit as AreaUnitArg));
    }

    isLessThanOrEqualTo(area: AbstractArea): boolean;
    isLessThanOrEqualTo(area: number, unit: number): boolean;
    isLessThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isLessThan(area) || this.isEqualTo(area)
            : this.isLessThanOrEqualTo(new Area(area, unit as AreaUnitArg));
    }

    isGreaterThan(area: AbstractArea): boolean;
    isGreaterThan(area: number, unit: number): boolean;
    isGreaterThan(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres > area.squareMetres
            : this.isGreaterThan(new Area(area, unit as AreaUnitArg));
    }

    isGreaterThanOrEqualTo(area: AbstractArea): boolean;
    isGreaterThanOrEqualTo(area: number, unit: number): boolean;
    isGreaterThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isGreaterThan(area) || this.isEqualTo(area)
            : this.isGreaterThanOrEqualTo(new Area(area, unit as AreaUnitArg));
    }
}
