import AbstractLength, {LengthArg, UnitArg} from "./AbstractLength";
import LengthUnit from "./LengthUnit";
import AreaUnit from "./AreaUnit";
import AreaImmutable from "./AreaImmutable";

export default class LengthImmutable extends AbstractLength {

    constructor(value: number, unit: UnitArg) {
        super(value, unit);
    }

    add(length: AbstractLength): LengthImmutable;
    add(length: number, unit: UnitArg): LengthImmutable;
    add(length: LengthArg, unit?: UnitArg): LengthImmutable {
        // convert the length to a Length if it is not already
        length = length instanceof AbstractLength ? length : new LengthImmutable(length, unit as LengthUnit | number);
        const value = this.value + length.getValue(this.unit);
        return new LengthImmutable(value, this.unit);
    }

    sub(length: AbstractLength): LengthImmutable;
    sub(length: number, unit: UnitArg): LengthImmutable;
    sub(length: LengthArg, unit?: UnitArg): LengthImmutable {
        // convert the length to a Length if it is not already
        length = length instanceof AbstractLength ? length : new LengthImmutable(length, unit as LengthUnit | number);
        const value = this.value - length.getValue(this.unit);
        return new LengthImmutable(value, this.unit);
    }

    mulByNumber(value: number): LengthImmutable {
        return new LengthImmutable(this.value * value, this.unit);
    };

    mulByLength(length: AbstractLength): AreaImmutable;
    mulByLength(length: number, unit: UnitArg): AreaImmutable;
    mulByLength(length: LengthArg, unit?: UnitArg): AreaImmutable {
        return length instanceof AbstractLength
            ? new AreaImmutable(this.metres * length.metres, AreaUnit.SQUARE_METRE)
            : this.mulByLength(new LengthImmutable(length, unit as UnitArg));
    }

    divByNumber(value: number): LengthImmutable {
        return new LengthImmutable(this.value / value, this.unit);
    }

    divByLength(length: AbstractLength): number;
    divByLength(length: number, unit: UnitArg): number;
    divByLength(length: LengthArg, unit?: UnitArg): number {
        return length instanceof AbstractLength
            ? this.metres / length.metres
            : this.divByLength(new LengthImmutable(length, unit as UnitArg));
    }
}
