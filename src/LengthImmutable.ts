import AbstractLength, {LengthArg, UnitArg} from "./AbstractLength";
import LengthUnit from "./LengthUnit";

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
}
