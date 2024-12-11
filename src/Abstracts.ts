import {AreaUnit} from "./AreaUnit";
import {LengthUnit} from "./LengthUnit";
import {floatsEqual} from "./Helpers";
import numeral from "numeral";
import {toNumber} from "lodash";
import {AreaImmutable, LengthImmutable} from "./Concretes";

export type LengthArg = AbstractLength | number;
export type LengthUnitArg = LengthUnit | number;

export type AreaArg = AbstractArea | number;
export type AreaUnitArg = AreaUnit | number;

type lengthFormatType = "name" | "acronym" | "symbol";
type areaFormatType = "name" | "acronym";

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
