import AbstractLength, {LengthArg, UnitArg} from "./AbstractLength";
import LengthUnit from "./LengthUnit";


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
}
