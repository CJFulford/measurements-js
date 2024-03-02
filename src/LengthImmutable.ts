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

    mul(value: AbstractLength): AreaImmutable;
    mul(value: number, unit: UnitArg): AreaImmutable;
    mul(value: number): LengthImmutable;
    mul(value: LengthArg, unit?: UnitArg): LengthImmutable | AreaImmutable {
        // a length multiplied by a length is an area
        if (value instanceof AbstractLength) {
            return new AreaImmutable(this.metres * value.metres, AreaUnit.SQUARE_METRE);
        }
        // sale as the first statement, but with length constructor arguments instead of a length instance
        else if (unit !== undefined) {
            return this.mul(new LengthImmutable(value, unit));
        }

        // a length multiplied by a number is a length
        return new LengthImmutable(this.value * value, this.unit);
    }
}
