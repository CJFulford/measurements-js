import AreaUnit from "./AreaUnit";
import AbstractArea, {AreaArg, UnitArg} from "./AbstractArea";

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

    mul(value: number): Area {
        this.value *= value;
        return this;
    }
}
