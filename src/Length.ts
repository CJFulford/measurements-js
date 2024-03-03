import AbstractLength, {LengthArg, UnitArg} from "./AbstractLength";
import LengthUnit from "./LengthUnit";
import Area from "./Area";
import AreaUnit from "./AreaUnit";
import {floatsEqual} from "./Helpers";

export default class Length extends AbstractLength {

    constructor(value: number, unit: UnitArg) {
        super(value, unit);
    }

    add(length: AbstractLength): Length;
    add(length: number, unit: UnitArg): Length;
    add(length: LengthArg, unit?: UnitArg): Length {
        // convert the length to a Length if it is not already
        length = length instanceof AbstractLength ? length : new Length(length, unit as LengthUnit | number);
        this.value += length.getValue(this.unit);
        return this;
    }

    sub(length: AbstractLength): Length;
    sub(length: number, unit: UnitArg): Length;
    sub(length: LengthArg, unit?: UnitArg): Length {
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
    mulByLength(length: number, unit: UnitArg): Area;
    mulByLength(length: LengthArg, unit?: UnitArg): Area {
        return length instanceof AbstractLength
            ? new Area(this.metres * length.metres, AreaUnit.SQUARE_METRE)
            : this.mulByLength(new Length(length, unit as UnitArg));
    }

    divByNumber(value: number): Length {
        this.value /= value;
        return this;
    }

    divByLength(length: AbstractLength): number;
    divByLength(length: number, unit: UnitArg): number;
    divByLength(length: LengthArg, unit?: UnitArg): number {
        return length instanceof AbstractLength
            ? this.metres / length.metres
            : this.divByLength(new Length(length, unit as UnitArg));
    }

    isEqualTo(length: AbstractLength): boolean;
    isEqualTo(length: number, unit: number): boolean;
    isEqualTo(length: LengthArg, unit?: UnitArg): boolean {
        return length instanceof AbstractLength
            ? floatsEqual(this.metres, length.metres)
            : this.isEqualTo(new Length(length, unit as UnitArg));
    }

    isLessThan(length: AbstractLength): boolean;
    isLessThan(length: number, unit: number): boolean;
    isLessThan(length: LengthArg, unit?: UnitArg): boolean {
        return length instanceof AbstractLength
            ? this.metres < length.metres
            : this.isLessThan(new Length(length, unit as UnitArg));
    }

    isLessThanOrEqualTo(length: AbstractLength): boolean;
    isLessThanOrEqualTo(length: number, unit: number): boolean;
    isLessThanOrEqualTo(length: LengthArg, unit?: UnitArg): boolean {
        return length instanceof AbstractLength
            ? this.isLessThan(length) || this.isEqualTo(length)
            : this.isLessThanOrEqualTo(new Length(length, unit as UnitArg));
    }

    isGreaterThan(length: AbstractLength): boolean;
    isGreaterThan(length: number, unit: number): boolean;
    isGreaterThan(length: LengthArg, unit?: UnitArg): boolean {
        return length instanceof AbstractLength
            ? this.metres > length.metres
            : this.isGreaterThan(new Length(length, unit as UnitArg));
    }

    isGreaterThanOrEqualTo(length: AbstractLength): boolean;
    isGreaterThanOrEqualTo(length: number, unit: number): boolean;
    isGreaterThanOrEqualTo(length: LengthArg, unit?: UnitArg): boolean {
        return length instanceof AbstractLength
            ? this.isGreaterThan(length) || this.isEqualTo(length)
            : this.isGreaterThanOrEqualTo(new Length(length, unit as UnitArg));
    }
}
