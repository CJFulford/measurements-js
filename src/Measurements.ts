import {AreaUnit} from "./AreaUnit";
import {LengthUnit} from "./LengthUnit";
import {floatsEqual} from "./Helpers";
import numeral from "numeral";
import {toNumber} from "lodash";

type LengthArg = AbstractLength | number;
type LengthUnitArg = LengthUnit | number;

type AreaArg = AbstractArea | number;
type AreaUnitArg = AreaUnit | number;

type lengthFormatType = "name" | "acronym" | "symbol";
type areaFormatType = "name" | "acronym";

interface Mutable {
    toImmutable(): Immutable;
}

interface Immutable {
    toMutable(): Mutable;
}

abstract class AbstractMeasurement {
    protected value: number;

    protected constructor(value: number) {
        this.value = toNumber(value);
    }

    public isZero(): boolean {
        return floatsEqual(this.value, 0);
    }

    public isNotZero(): boolean {
        return !this.isZero();
    }

    public isGreaterThanZero(): boolean {
        return this.value > 0;
    }

    public isGreaterThanOrEqualToZero(): boolean {
        return this.value >= 0;
    }

    public isLessThanZero(): boolean {
        return this.value < 0;
    }

    public isLessThanOrEqualToZero(): boolean {
        return this.value <= 0;
    }
}

export abstract class AbstractLength extends AbstractMeasurement {
    protected unit: LengthUnit;

    protected constructor(value: number, unit: LengthUnitArg) {
        super(value);
        this.unit = unit instanceof LengthUnit ? unit : LengthUnit.getById(unit as number);
    }

    public getValue(unit: LengthUnitArg): number {
        unit = unit instanceof LengthUnit ? unit : LengthUnit.getById(unit as number);
        return this.value * this.unit.baseUnitsPer / unit.baseUnitsPer;
    }

    get kilometres() {
        return this.getValue(LengthUnit.KILOMETRE);
    }

    get metres() {
        return this.getValue(LengthUnit.METRE);
    }

    get centimetres() {
        return this.getValue(LengthUnit.CENTIMETRE);
    }

    get millimetres() {
        return this.getValue(LengthUnit.MILLIMETRE);
    }

    get inches() {
        return this.getValue(LengthUnit.INCH);
    }

    get feet() {
        return this.getValue(LengthUnit.FOOT);
    }

    get yards() {
        return this.getValue(LengthUnit.YARD);
    }

    get miles() {
        return this.getValue(LengthUnit.MILE);
    }

    abstract add(length: AbstractLength): AbstractLength;
    abstract add(length: number, unit: LengthUnitArg): AbstractLength;
    abstract add(length: LengthArg, unit?: LengthUnitArg): AbstractLength;

    abstract sub(length: AbstractLength): AbstractLength;
    abstract sub(length: number, unit: LengthUnitArg): AbstractLength;
    abstract sub(length: LengthArg, unit?: LengthUnitArg): AbstractLength;

    abstract mulByNumber(value: number): AbstractLength;

    abstract mulByLength(length: AbstractLength): AbstractArea;
    abstract mulByLength(length: number, unit: LengthUnitArg): AbstractArea;
    abstract mulByLength(length: LengthArg, unit?: LengthUnitArg): AbstractArea;

    abstract divByNumber(value: number): AbstractLength;

    abstract divByLength(length: AbstractLength): number;
    abstract divByLength(length: number, unit: LengthUnitArg): number;
    abstract divByLength(length: LengthArg, unit?: LengthUnitArg): number;

    abstract isEqualTo(length: AbstractLength): boolean;
    abstract isEqualTo(length: number, unit: number): boolean;
    abstract isEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean;

    abstract isLessThan(length: AbstractLength): boolean;
    abstract isLessThan(length: number, unit: number): boolean;
    abstract isLessThan(length: LengthArg, unit?: LengthUnitArg): boolean;

    abstract isLessThanOrEqualTo(length: AbstractLength): boolean;
    abstract isLessThanOrEqualTo(length: number, unit: number): boolean;
    abstract isLessThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean;

    abstract isGreaterThan(length: AbstractLength): boolean;
    abstract isGreaterThan(length: number, unit: number): boolean;
    abstract isGreaterThan(length: LengthArg, unit?: LengthUnitArg): boolean;

    abstract isGreaterThanOrEqualTo(length: AbstractLength): boolean;
    abstract isGreaterThanOrEqualTo(length: number, unit: number): boolean;
    abstract isGreaterThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean;

    format(decimals: number, unit: LengthUnitArg, type: lengthFormatType = "acronym"): string {

        const format = '0,0' + (decimals > 0 ? '.' + '0'.repeat(decimals) : '');

        const number = numeral(this.getValue(unit)).format(format);

        unit = unit instanceof LengthUnit ? unit : LengthUnit.getById(unit as number);

        let suffix;
        switch (type) {
            case "name":
                suffix = ' ' + (this.isEqualTo(1, unit) ? unit.name : unit.pluralName);
                break;
            case "acronym":
                suffix = unit.acronym;
                break;
            case "symbol":
                suffix = unit.symbol;
                break;
            default:
                throw new Error("Invalid format type");
        }

        return `${number}${suffix}`;
    }

    multiFormat(decimals: number, units: Array<LengthUnitArg>, type: lengthFormatType = 'acronym', separator: string = ','): string {

        units.sort((a, b) => {
            a = a instanceof LengthUnit ? a : LengthUnit.getById(a as number);
            b = b instanceof LengthUnit ? b : LengthUnit.getById(b as number);
            return b.baseUnitsPer - a.baseUnitsPer;
        });

        const result = [];
        let remaining = new LengthImmutable(this.value, this.unit);
        for (let i = 0; i < units.length; i++) {
            const unit = units[i];
            const isLastUnit = i === units.length - 1;

            let portion;
            let portionDecimals;
            if (isLastUnit) {
                portion = remaining;
                portionDecimals = decimals;
            } else {
                portion = new LengthImmutable(Math.floor(remaining.getValue(unit)), unit);
                portionDecimals = 0;
                remaining = remaining.sub(portion);

                if (portion.isZero()) {
                    continue;
                }
            }

            result.push(portion.format(portionDecimals, unit, type));
        }

        return result.join(separator);
    }
}

export abstract class AbstractArea extends AbstractMeasurement {

    protected unit: AreaUnit;

    protected constructor(value: number, unit: AreaUnitArg) {
        super(value);
        this.unit = unit instanceof AreaUnit ? unit : AreaUnit.getById(unit as number);
    }

    public getValue(unit: AreaUnit | number): number {
        unit = unit instanceof AreaUnit ? unit : AreaUnit.getById(unit as number);
        return this.value * this.unit.baseUnitsPer / unit.baseUnitsPer;
    }

    get squareKilometres() {
        return this.getValue(AreaUnit.SQUARE_KILOMETRE);
    }

    get squareMetres() {
        return this.getValue(AreaUnit.SQUARE_METRE);
    }

    get squareCentimetres() {
        return this.getValue(AreaUnit.SQUARE_CENTIMETRE);
    }

    get squareMillimetres() {
        return this.getValue(AreaUnit.SQUARE_MILLIMETRE);
    }

    get squareInches() {
        return this.getValue(AreaUnit.SQUARE_INCH);
    }

    get squareFeet() {
        return this.getValue(AreaUnit.SQUARE_FOOT);
    }

    get squareYards() {
        return this.getValue(AreaUnit.SQUARE_YARD);
    }

    get squareMiles() {
        return this.getValue(AreaUnit.SQUARE_MILE);
    }

    abstract add(area: AbstractArea): AbstractArea;
    abstract add(area: number, unit: AreaUnit | number): AbstractArea;
    abstract add(area: AreaArg, unit?: AreaUnitArg): AbstractArea;

    abstract sub(area: AbstractArea): AbstractArea;
    abstract sub(area: number, unit: AreaUnit | number): AbstractArea;
    abstract sub(area: AreaArg, unit?: AreaUnitArg): AbstractArea;

    abstract mulByNumber(value: number): AbstractArea;

    abstract divByNumber(value: number): AbstractArea;

    abstract divByLength(length: AbstractLength): AbstractLength;
    abstract divByLength(length: number, unit: LengthUnitArg): AbstractLength;
    abstract divByLength(length: LengthArg, unit?: LengthUnitArg): AbstractLength;

    abstract divByArea(area: AbstractArea): number;
    abstract divByArea(area: number, unit: AreaUnitArg): number;
    abstract divByArea(area: AreaArg, unit?: AreaUnitArg): number;

    abstract isEqualTo(area: AbstractArea): boolean;
    abstract isEqualTo(area: number, unit: number): boolean;
    abstract isEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean;

    abstract isLessThan(area: AbstractArea): boolean;
    abstract isLessThan(area: number, unit: number): boolean;
    abstract isLessThan(area: AreaArg, unit?: AreaUnitArg): boolean;

    abstract isLessThanOrEqualTo(area: AbstractArea): boolean;
    abstract isLessThanOrEqualTo(area: number, unit: number): boolean;
    abstract isLessThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean;

    abstract isGreaterThan(area: AbstractArea): boolean;
    abstract isGreaterThan(area: number, unit: number): boolean;
    abstract isGreaterThan(area: AreaArg, unit?: AreaUnitArg): boolean;

    abstract isGreaterThanOrEqualTo(area: AbstractArea): boolean;
    abstract isGreaterThanOrEqualTo(area: number, unit: number): boolean;
    abstract isGreaterThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean;

    format(decimals: number, unit: AreaUnitArg, type: "name" | "acronym" = "acronym"): string {
        const format = '0,0' + (decimals > 0 ? '.' + '0'.repeat(decimals) : '');

        const number = numeral(this.getValue(unit)).format(format);

        unit = unit instanceof AreaUnit ? unit : AreaUnit.getById(unit as number);

        let suffix;
        switch (type) {
            case "name":
                suffix = ' ' + (this.isEqualTo(1, unit) ? unit.name : unit.pluralName);
                break;
            case "acronym":
                suffix = unit.acronym;
                break;
            default:
                throw new Error("Invalid format type");
        }

        return `${number}${suffix}`;
    }

    multiFormat(decimals: number, units: Array<AreaUnitArg>, type: areaFormatType = 'acronym', separator: string = ','): string {

        units.sort((a, b) => {
            a = a instanceof AreaUnit ? a : AreaUnit.getById(a as number);
            b = b instanceof AreaUnit ? b : AreaUnit.getById(b as number);
            return b.baseUnitsPer - a.baseUnitsPer;
        });

        const result = [];
        let remaining = new AreaImmutable(this.value, this.unit);
        for (let i = 0; i < units.length; i++) {
            const unit = units[i];
            const isLastUnit = i === units.length - 1;

            let portion;
            let portionDecimals;
            if (isLastUnit) {
                portion = remaining;
                portionDecimals = decimals;
            } else {
                portion = new AreaImmutable(Math.floor(remaining.getValue(unit)), unit);
                portionDecimals = 0;
                remaining = remaining.sub(portion);

                if (portion.isZero()) {
                    continue;
                }
            }

            result.push(portion.format(portionDecimals, unit, type));
        }

        return result.join(separator);
    }
}

export class Length extends AbstractLength implements Mutable {

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

    toImmutable(): LengthImmutable {
        return new LengthImmutable(this.value, this.unit);
    }

    static zero(): Length {
        return new Length(0, LengthUnit.METRE);
    }
}

export class LengthImmutable extends AbstractLength implements Immutable {

    constructor(value: number, unit: LengthUnitArg) {
        super(value, unit);
    }

    add(length: AbstractLength): LengthImmutable;
    add(length: number, unit: LengthUnitArg): LengthImmutable;
    add(length: LengthArg, unit?: LengthUnitArg): LengthImmutable {
        // convert the length to a Length if it is not already
        length = length instanceof AbstractLength ? length : new LengthImmutable(length, unit as LengthUnit | number);
        const value = this.value + length.getValue(this.unit);
        return new LengthImmutable(value, this.unit);
    }

    sub(length: AbstractLength): LengthImmutable;
    sub(length: number, unit: LengthUnitArg): LengthImmutable;
    sub(length: LengthArg, unit?: LengthUnitArg): LengthImmutable {
        // convert the length to a Length if it is not already
        length = length instanceof AbstractLength ? length : new LengthImmutable(length, unit as LengthUnit | number);
        const value = this.value - length.getValue(this.unit);
        return new LengthImmutable(value, this.unit);
    }

    mulByNumber(value: number): LengthImmutable {
        return new LengthImmutable(this.value * value, this.unit);
    };

    mulByLength(length: AbstractLength): AreaImmutable;
    mulByLength(length: number, unit: LengthUnitArg): AreaImmutable;
    mulByLength(length: LengthArg, unit?: LengthUnitArg): AreaImmutable {
        return length instanceof AbstractLength
            ? new AreaImmutable(this.metres * length.metres, AreaUnit.SQUARE_METRE)
            : this.mulByLength(new LengthImmutable(length, unit as LengthUnitArg));
    }

    divByNumber(value: number): LengthImmutable {
        return new LengthImmutable(this.value / value, this.unit);
    }

    divByLength(length: AbstractLength): number;
    divByLength(length: number, unit: LengthUnitArg): number;
    divByLength(length: LengthArg, unit?: LengthUnitArg): number {
        return length instanceof AbstractLength
            ? this.metres / length.metres
            : this.divByLength(new LengthImmutable(length, unit as LengthUnitArg));
    }

    isEqualTo(length: AbstractLength): boolean;
    isEqualTo(length: number, unit: number): boolean;
    isEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? floatsEqual(this.metres, length.metres)
            : this.isEqualTo(new LengthImmutable(length, unit as LengthUnitArg));
    }

    isLessThan(length: AbstractLength): boolean;
    isLessThan(length: number, unit: number): boolean;
    isLessThan(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.metres < length.metres
            : this.isLessThan(new LengthImmutable(length, unit as LengthUnitArg));
    }

    isLessThanOrEqualTo(length: AbstractLength): boolean;
    isLessThanOrEqualTo(length: number, unit: number): boolean;
    isLessThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.isLessThan(length) || this.isEqualTo(length)
            : this.isLessThanOrEqualTo(new LengthImmutable(length, unit as LengthUnitArg));
    }

    isGreaterThan(length: AbstractLength): boolean;
    isGreaterThan(length: number, unit: number): boolean;
    isGreaterThan(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.metres > length.metres
            : this.isGreaterThan(new LengthImmutable(length, unit as LengthUnitArg));
    }

    isGreaterThanOrEqualTo(length: AbstractLength): boolean;
    isGreaterThanOrEqualTo(length: number, unit: number): boolean;
    isGreaterThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.isGreaterThan(length) || this.isEqualTo(length)
            : this.isGreaterThanOrEqualTo(new LengthImmutable(length, unit as LengthUnitArg));
    }

    toMutable(): Length {
        return new Length(this.value, this.unit);
    }

    static zero(): LengthImmutable {
        return new LengthImmutable(0, LengthUnit.METRE);
    }
}

export class Area extends AbstractArea implements Mutable {
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

    toImmutable(): AreaImmutable {
        return new AreaImmutable(this.value, this.unit);
    }

    static zero(): Area {
        return new Area(0, AreaUnit.SQUARE_METRE);
    }
}

export class AreaImmutable extends AbstractArea implements Immutable {

    constructor(value: number, unit: AreaUnitArg) {
        super(value, unit);
    }

    add(area: AbstractArea): AreaImmutable;
    add(area: number, unit: AreaUnitArg): AreaImmutable;
    add(area: AreaArg, unit?: AreaUnitArg): AreaImmutable {
        // convert the area to an Area if it is not already
        area = area instanceof AbstractArea ? area : new AreaImmutable(area, unit as AreaUnit);
        return new AreaImmutable(this.value + area.getValue(this.unit), this.unit);
    }

    sub(area: AbstractArea): AreaImmutable;
    sub(area: number, unit: AreaUnitArg): AreaImmutable;
    sub(area: AreaArg, unit?: AreaUnitArg): AreaImmutable {
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
    divByArea(area: number, unit: AreaUnitArg): number;
    divByArea(area: AreaArg, unit?: AreaUnitArg): number {
        return area instanceof AbstractArea
            ? this.squareMetres / area.squareMetres
            : this.divByArea(new AreaImmutable(area, unit as AreaUnit));
    }

    isEqualTo(area: AbstractArea): boolean;
    isEqualTo(area: number, unit: number): boolean;
    isEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? floatsEqual(this.squareMetres, area.squareMetres)
            : this.isEqualTo(new AreaImmutable(area, unit as AreaUnitArg));
    }

    isLessThan(area: AbstractArea): boolean;
    isLessThan(area: number, unit: number): boolean;
    isLessThan(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres < area.squareMetres
            : this.isLessThan(new AreaImmutable(area, unit as AreaUnitArg));
    }

    isLessThanOrEqualTo(area: AbstractArea): boolean;
    isLessThanOrEqualTo(area: number, unit: number): boolean;
    isLessThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isLessThan(area) || this.isEqualTo(area)
            : this.isLessThanOrEqualTo(new AreaImmutable(area, unit as AreaUnitArg));
    }

    isGreaterThan(area: AbstractArea): boolean;
    isGreaterThan(area: number, unit: number): boolean;
    isGreaterThan(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres > area.squareMetres
            : this.isGreaterThan(new AreaImmutable(area, unit as AreaUnitArg));
    }

    isGreaterThanOrEqualTo(area: AbstractArea): boolean;
    isGreaterThanOrEqualTo(area: number, unit: number): boolean;
    isGreaterThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isGreaterThan(area) || this.isEqualTo(area)
            : this.isGreaterThanOrEqualTo(new AreaImmutable(area, unit as AreaUnitArg));
    }

    toMutable(): Area {
        return new Area(this.value, this.unit);
    }

    static zero(): AreaImmutable {
        return new AreaImmutable(0, AreaUnit.SQUARE_METRE);
    }
}
