import AbstractArea, {AreaArg, UnitArg} from "./AbstractArea";
import AreaUnit from "./AreaUnit";

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
}
