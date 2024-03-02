import AbstractLength, {LengthArg, UnitArg} from "./AbstractLength";
import LengthUnit from "./LengthUnit";
import Area from "./Area";
import AreaUnit from "./AreaUnit";


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

    mul(value: AbstractLength): Area;
    mul(value: number, unit: UnitArg): Area;
    mul(value: number): Length;
    mul(value: LengthArg, unit?: UnitArg): Length | Area {
        // a length multiplied by a length is an area
        if (value instanceof AbstractLength) {
            return new Area(this.metres * value.metres, AreaUnit.SQUARE_METRE);
        }
        // sale as the first statement, but with length constructor arguments instead of a length instance
        else if (unit !== undefined) {
            return this.mul(new Length(value, unit));
        }

        // a length multiplied by a number is a length
        this.value *= value;
        return this;
    }
}
