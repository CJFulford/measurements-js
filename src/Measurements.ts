import {AreaUnit} from "./AreaUnit";
import {LengthUnit} from "./LengthUnit";
import {floatsEqual} from "./Helpers";
import numeral from "numeral";
import {toNumber} from "lodash";
import {VolumeUnit} from "./VolumeUnit";

type LengthArg = AbstractLength | number;
type LengthUnitArg = LengthUnit | number;

type AreaArg = AbstractArea | number;
type AreaUnitArg = AreaUnit | number;

type VolumeArg = AbstractVolume | number;
type VolumeUnitArg = VolumeUnit | number;

type lengthFormatType = "name" | "acronym" | "symbol";
type areaFormatType = "name" | "acronym";
type volumeFormatType = "name" | "acronym";

type TMutable = {
    toImmutable(): TImmutable;
}

type TImmutable = {
    toMutable(): TMutable;
}

type CompareReturnType = -1 | 0 | 1;

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

    abstract mulByArea(area: AbstractArea): AbstractVolume;
    abstract mulByArea(area: number, unit: AreaUnitArg): AbstractVolume;
    abstract mulByArea(area: AreaArg, unit?: AreaUnitArg): AbstractVolume;

    abstract divByNumber(value: number): AbstractLength;

    abstract divByLength(length: AbstractLength): number;
    abstract divByLength(length: number, unit: LengthUnitArg): number;
    abstract divByLength(length: LengthArg, unit?: LengthUnitArg): number;

    abstract isEqualTo(length: AbstractLength): boolean;
    abstract isEqualTo(length: number, unit: LengthUnitArg): boolean;
    abstract isEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean;

    abstract isLessThan(length: AbstractLength): boolean;
    abstract isLessThan(length: number, unit: LengthUnitArg): boolean;
    abstract isLessThan(length: LengthArg, unit?: LengthUnitArg): boolean;

    abstract isLessThanOrEqualTo(length: AbstractLength): boolean;
    abstract isLessThanOrEqualTo(length: number, unit: LengthUnitArg): boolean;
    abstract isLessThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean;

    abstract isGreaterThan(length: AbstractLength): boolean;
    abstract isGreaterThan(length: number, unit: LengthUnitArg): boolean;
    abstract isGreaterThan(length: LengthArg, unit?: LengthUnitArg): boolean;

    abstract isGreaterThanOrEqualTo(length: AbstractLength): boolean;
    abstract isGreaterThanOrEqualTo(length: number, unit: LengthUnitArg): boolean;
    abstract isGreaterThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean;

    abstract toMutable(): Length;

    abstract toImmutable(): LengthImmutable;

    format(decimals: number, unit: LengthUnitArg, type: lengthFormatType = "acronym"): string {

        const format = '0,0' + (decimals > 0 ? '.' + '0'.repeat(decimals) : '');

        const number = numeral(this.isZero() ? 0 : this.getValue(unit)).format(format);

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

                if (remaining.isEqualTo(1, unit)) {
                    portion = portion.add(1, unit);
                    remaining = LengthImmutable.zero();
                }

                if (portion.isZero()) {
                    continue;
                }
            }

            result.push(portion.format(portionDecimals, unit, type));
        }

        return result.join(separator);
    }

    compare(length: AbstractLength): CompareReturnType;
    compare(length: number, unit: LengthUnitArg): CompareReturnType;
    compare(length: LengthArg, unit?: LengthUnitArg): CompareReturnType {
        if (length instanceof AbstractLength) {
            return this.isEqualTo(length)
                ? 0
                : this.isLessThan(length) ? -1 : 1;
        }

        return this.compare(new Length(length, unit as LengthUnitArg));
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

    abstract mulByLength(length: AbstractLength): AbstractVolume;
    abstract mulByLength(length: number, unit: LengthUnitArg): AbstractVolume;
    abstract mulByLength(length: LengthArg, unit?: LengthUnitArg): AbstractVolume;

    abstract divByNumber(value: number): AbstractArea;

    abstract divByLength(length: AbstractLength): AbstractLength;
    abstract divByLength(length: number, unit: LengthUnitArg): AbstractLength;
    abstract divByLength(length: LengthArg, unit?: LengthUnitArg): AbstractLength;

    abstract divByArea(area: AbstractArea): number;
    abstract divByArea(area: number, unit: AreaUnitArg): number;
    abstract divByArea(area: AreaArg, unit?: AreaUnitArg): number;

    abstract isEqualTo(area: AbstractArea): boolean;
    abstract isEqualTo(area: number, unit: AreaUnitArg): boolean;
    abstract isEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean;

    abstract isLessThan(area: AbstractArea): boolean;
    abstract isLessThan(area: number, unit: AreaUnitArg): boolean;
    abstract isLessThan(area: AreaArg, unit?: AreaUnitArg): boolean;

    abstract isLessThanOrEqualTo(area: AbstractArea): boolean;
    abstract isLessThanOrEqualTo(area: number, unit: AreaUnitArg): boolean;
    abstract isLessThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean;

    abstract isGreaterThan(area: AbstractArea): boolean;
    abstract isGreaterThan(area: number, unit: AreaUnitArg): boolean;
    abstract isGreaterThan(area: AreaArg, unit?: AreaUnitArg): boolean;

    abstract isGreaterThanOrEqualTo(area: AbstractArea): boolean;
    abstract isGreaterThanOrEqualTo(area: number, unit: AreaUnitArg): boolean;
    abstract isGreaterThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean;

    abstract toMutable(): Area;

    abstract toImmutable(): AreaImmutable;

    format(decimals: number, unit: AreaUnitArg, type: "name" | "acronym" = "acronym"): string {
        const format = '0,0' + (decimals > 0 ? '.' + '0'.repeat(decimals) : '');

        const number = numeral(this.isZero() ? 0 : this.getValue(unit)).format(format);

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

                if (remaining.isEqualTo(1, unit)) {
                    portion = portion.add(1, unit);
                    remaining = AreaImmutable.zero();
                }

                if (portion.isZero()) {
                    continue;
                }
            }

            result.push(portion.format(portionDecimals, unit, type));
        }

        return result.join(separator);
    }

    compare(area: AbstractArea): CompareReturnType;
    compare(area: number, unit: AreaUnitArg): CompareReturnType;
    compare(area: AreaArg, unit?: AreaUnitArg): CompareReturnType {

        if (area instanceof AbstractArea) {
            return this.isEqualTo(area)
                ? 0
                : this.isLessThan(area) ? -1 : 1;
        }

        return this.compare(new Area(area, unit as AreaUnitArg));
    }
}

export abstract class AbstractVolume extends AbstractMeasurement {

    protected unit: VolumeUnit;

    protected constructor(value: number, unit: VolumeUnitArg) {
        super(value);
        this.unit = unit instanceof VolumeUnit ? unit : VolumeUnit.getById(unit as number);
    }

    public getValue(unit: VolumeUnitArg): number {
        unit = unit instanceof VolumeUnit ? unit : VolumeUnit.getById(unit as number);
        return this.value * this.unit.baseUnitsPer / unit.baseUnitsPer;
    }

    get cubeKilometres() {
        return this.getValue(VolumeUnit.CUBE_KILOMETRE);
    }

    get cubeMetres() {
        return this.getValue(VolumeUnit.CUBE_METRE);
    }

    get cubeCentimetres() {
        return this.getValue(VolumeUnit.CUBE_CENTIMETRE);
    }

    get cubeMillimetres() {
        return this.getValue(VolumeUnit.CUBE_MILLIMETRE);
    }

    get cubeInches() {
        return this.getValue(VolumeUnit.CUBE_INCH);
    }

    get cubeFeet() {
        return this.getValue(VolumeUnit.CUBE_FOOT);
    }

    get cubeYards() {
        return this.getValue(VolumeUnit.CUBE_YARD);
    }

    get cubeMiles() {
        return this.getValue(VolumeUnit.CUBE_MILE);
    }

    abstract add(volume: AbstractVolume): AbstractVolume;
    abstract add(volume: number, unit: VolumeUnitArg): AbstractVolume;
    abstract add(volume: VolumeArg, unit?: VolumeUnitArg): AbstractVolume;

    abstract sub(volume: AbstractVolume): AbstractVolume;
    abstract sub(volume: number, unit: VolumeUnitArg): AbstractVolume;
    abstract sub(volume: VolumeArg, unit?: VolumeUnitArg): AbstractVolume;

    abstract mulByNumber(value: number): AbstractVolume;

    abstract divByNumber(value: number): AbstractVolume;

    abstract divByLength(length: AbstractLength): AbstractArea;
    abstract divByLength(length: number, unit: LengthUnitArg): AbstractArea;
    abstract divByLength(length: LengthArg, unit?: LengthUnitArg): AbstractArea;

    abstract divByArea(area: AbstractArea): AbstractLength;
    abstract divByArea(area: number, unit: AreaUnitArg): AbstractLength;
    abstract divByArea(area: AreaArg, unit?: AreaUnitArg): AbstractLength;

    abstract divByVolume(volume: AbstractVolume): number;
    abstract divByVolume(volume: number, unit: VolumeUnitArg): number;
    abstract divByVolume(volume: VolumeArg, unit?: VolumeUnitArg): number;

    abstract isEqualTo(volume: AbstractVolume): boolean;
    abstract isEqualTo(volume: number, unit: VolumeUnitArg): boolean;
    abstract isEqualTo(volume: VolumeArg, unit?: VolumeUnitArg): boolean;

    abstract isLessThan(volume: AbstractVolume): boolean;
    abstract isLessThan(volume: number, unit: VolumeUnitArg): boolean;
    abstract isLessThan(volume: VolumeArg, unit?: VolumeUnitArg): boolean;

    abstract isLessThanOrEqualTo(volume: AbstractVolume): boolean;
    abstract isLessThanOrEqualTo(volume: number, unit: VolumeUnitArg): boolean;
    abstract isLessThanOrEqualTo(volume: VolumeArg, unit?: VolumeUnitArg): boolean;

    abstract isGreaterThan(volume: AbstractVolume): boolean;
    abstract isGreaterThan(volume: number, unit: VolumeUnitArg): boolean;
    abstract isGreaterThan(volume: VolumeArg, unit?: VolumeUnitArg): boolean;

    abstract isGreaterThanOrEqualTo(volume: AbstractVolume): boolean;
    abstract isGreaterThanOrEqualTo(volume: number, unit: VolumeUnitArg): boolean;
    abstract isGreaterThanOrEqualTo(volume: VolumeArg, unit?: VolumeUnitArg): boolean;

    abstract toMutable(): Volume;

    abstract toImmutable(): VolumeImmutable;

    format(decimals: number, unit: VolumeUnitArg, type: volumeFormatType = "acronym"): string {
        const format = '0,0' + (decimals > 0 ? '.' + '0'.repeat(decimals) : '');

        const number = numeral(this.isZero() ? 0 : this.getValue(unit)).format(format);

        unit = unit instanceof VolumeUnit ? unit : VolumeUnit.getById(unit as number);

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

    multiFormat(decimals: number, units: Array<VolumeUnitArg>, type: volumeFormatType = 'acronym', separator: string = ','): string {

        units.sort((a, b) => {
            a = a instanceof VolumeUnit ? a : VolumeUnit.getById(a as number);
            b = b instanceof VolumeUnit ? b : VolumeUnit.getById(b as number);
            return b.baseUnitsPer - a.baseUnitsPer;
        });

        const result = [];
        let remaining = new VolumeImmutable(this.value, this.unit);
        for (let i = 0; i < units.length; i++) {
            const unit = units[i];
            const isLastUnit = i === units.length - 1;

            let portion;
            let portionDecimals;
            if (isLastUnit) {
                portion = remaining;
                portionDecimals = decimals;
            } else {
                portion = new VolumeImmutable(Math.floor(remaining.getValue(unit)), unit);
                portionDecimals = 0;
                remaining = remaining.sub(portion);

                if (remaining.isEqualTo(1, unit)) {
                    portion = portion.add(1, unit);
                    remaining = VolumeImmutable.zero();
                }

                if (portion.isZero()) {
                    continue;
                }
            }

            result.push(portion.format(portionDecimals, unit, type));
        }

        return result.join(separator);
    }

    compare(volume: AbstractVolume): CompareReturnType;
    compare(volume: number, unit: VolumeUnitArg): CompareReturnType;
    compare(volume: VolumeArg, unit?: VolumeUnitArg): CompareReturnType {

        if (volume instanceof AbstractVolume) {
            return this.isEqualTo(volume)
                ? 0
                : this.isLessThan(volume) ? -1 : 1;
        }

        return this.compare(new Volume(volume, unit as VolumeUnitArg));
    }
}

export class Length extends AbstractLength implements TMutable {

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

    mulByArea(area: AbstractArea): AbstractVolume ;
    mulByArea(area: number, unit: AreaUnitArg): AbstractVolume ;
    mulByArea(area: AreaArg, unit?: AreaUnitArg): AbstractVolume {
        return area instanceof AbstractArea
            ? new Volume(this.metres * area.squareMetres, VolumeUnit.CUBE_METRE)
            : this.mulByArea(new Area(area, unit as AreaUnitArg));
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
    isEqualTo(length: number, unit: LengthUnitArg): boolean;
    isEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? floatsEqual(this.metres, length.metres)
            : this.isEqualTo(new Length(length, unit as LengthUnitArg));
    }

    isLessThan(length: AbstractLength): boolean;
    isLessThan(length: number, unit: LengthUnitArg): boolean;
    isLessThan(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.metres < length.metres && !this.isEqualTo(length)
            : this.isLessThan(new Length(length, unit as LengthUnitArg));
    }

    isLessThanOrEqualTo(length: AbstractLength): boolean;
    isLessThanOrEqualTo(length: number, unit: LengthUnitArg): boolean;
    isLessThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.isLessThan(length) || this.isEqualTo(length)
            : this.isLessThanOrEqualTo(new Length(length, unit as LengthUnitArg));
    }

    isGreaterThan(length: AbstractLength): boolean;
    isGreaterThan(length: number, unit: LengthUnitArg): boolean;
    isGreaterThan(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.metres > length.metres && !this.isEqualTo(length)
            : this.isGreaterThan(new Length(length, unit as LengthUnitArg));
    }

    isGreaterThanOrEqualTo(length: AbstractLength): boolean;
    isGreaterThanOrEqualTo(length: number, unit: LengthUnitArg): boolean;
    isGreaterThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.isGreaterThan(length) || this.isEqualTo(length)
            : this.isGreaterThanOrEqualTo(new Length(length, unit as LengthUnitArg));
    }

    toMutable(): Length {
        return new Length(this.value, this.unit);
    }

    toImmutable(): LengthImmutable {
        return new LengthImmutable(this.value, this.unit);
    }

    static zero(): Length {
        return new Length(0, LengthUnit.METRE);
    }
}

export class LengthImmutable extends AbstractLength implements TImmutable {

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

    mulByArea(area: AbstractArea): AbstractVolume ;
    mulByArea(area: number, unit: AreaUnitArg): AbstractVolume ;
    mulByArea(area: AreaArg, unit?: AreaUnitArg): AbstractVolume {
        return area instanceof AbstractArea
            ? new VolumeImmutable(this.metres * area.squareMetres, VolumeUnit.CUBE_METRE)
            : this.mulByArea(new AreaImmutable(area, unit as AreaUnitArg));
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
    isEqualTo(length: number, unit: LengthUnitArg): boolean;
    isEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? floatsEqual(this.metres, length.metres)
            : this.isEqualTo(new LengthImmutable(length, unit as LengthUnitArg));
    }

    isLessThan(length: AbstractLength): boolean;
    isLessThan(length: number, unit: LengthUnitArg): boolean;
    isLessThan(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.metres < length.metres && !this.isEqualTo(length)
            : this.isLessThan(new LengthImmutable(length, unit as LengthUnitArg));
    }

    isLessThanOrEqualTo(length: AbstractLength): boolean;
    isLessThanOrEqualTo(length: number, unit: LengthUnitArg): boolean;
    isLessThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.isLessThan(length) || this.isEqualTo(length)
            : this.isLessThanOrEqualTo(new LengthImmutable(length, unit as LengthUnitArg));
    }

    isGreaterThan(length: AbstractLength): boolean;
    isGreaterThan(length: number, unit: LengthUnitArg): boolean;
    isGreaterThan(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.metres > length.metres && !this.isEqualTo(length)
            : this.isGreaterThan(new LengthImmutable(length, unit as LengthUnitArg));
    }

    isGreaterThanOrEqualTo(length: AbstractLength): boolean;
    isGreaterThanOrEqualTo(length: number, unit: LengthUnitArg): boolean;
    isGreaterThanOrEqualTo(length: LengthArg, unit?: LengthUnitArg): boolean {
        return length instanceof AbstractLength
            ? this.isGreaterThan(length) || this.isEqualTo(length)
            : this.isGreaterThanOrEqualTo(new LengthImmutable(length, unit as LengthUnitArg));
    }

    toMutable(): Length {
        return new Length(this.value, this.unit);
    }

    toImmutable(): LengthImmutable {
        return this;
    }

    static zero(): LengthImmutable {
        return new LengthImmutable(0, LengthUnit.METRE);
    }
}

export class Area extends AbstractArea implements TMutable {
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

    mulByLength(length: AbstractLength): AbstractVolume;
    mulByLength(length: number, unit: LengthUnitArg): AbstractVolume;
    mulByLength(length: LengthArg, unit?: LengthUnitArg): AbstractVolume {
        return length instanceof AbstractLength
            ? new Volume(this.squareMetres * length.metres, VolumeUnit.CUBE_METRE)
            : this.mulByLength(new Length(length, unit as LengthUnitArg));
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
    isEqualTo(area: number, unit: AreaUnitArg): boolean;
    isEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? floatsEqual(this.squareMetres, area.squareMetres)
            : this.isEqualTo(new Area(area, unit as AreaUnitArg));
    }

    isLessThan(area: AbstractArea): boolean;
    isLessThan(area: number, unit: AreaUnitArg): boolean;
    isLessThan(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres < area.squareMetres && !this.isEqualTo(area)
            : this.isLessThan(new Area(area, unit as AreaUnitArg));
    }

    isLessThanOrEqualTo(area: AbstractArea): boolean;
    isLessThanOrEqualTo(area: number, unit: AreaUnitArg): boolean;
    isLessThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isLessThan(area) || this.isEqualTo(area)
            : this.isLessThanOrEqualTo(new Area(area, unit as AreaUnitArg));
    }

    isGreaterThan(area: AbstractArea): boolean;
    isGreaterThan(area: number, unit: AreaUnitArg): boolean;
    isGreaterThan(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres > area.squareMetres && !this.isEqualTo(area)
            : this.isGreaterThan(new Area(area, unit as AreaUnitArg));
    }

    isGreaterThanOrEqualTo(area: AbstractArea): boolean;
    isGreaterThanOrEqualTo(area: number, unit: AreaUnitArg): boolean;
    isGreaterThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isGreaterThan(area) || this.isEqualTo(area)
            : this.isGreaterThanOrEqualTo(new Area(area, unit as AreaUnitArg));
    }

    toMutable(): Area {
        return new Area(this.value, this.unit);
    }

    toImmutable(): AreaImmutable {
        return new AreaImmutable(this.value, this.unit);
    }

    static zero(): Area {
        return new Area(0, AreaUnit.SQUARE_METRE);
    }
}

export class AreaImmutable extends AbstractArea implements TImmutable {

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

    mulByLength(length: AbstractLength): AbstractVolume;
    mulByLength(length: number, unit: LengthUnitArg): AbstractVolume;
    mulByLength(length: LengthArg, unit?: LengthUnitArg): AbstractVolume {
        return length instanceof AbstractLength
            ? new VolumeImmutable(this.squareMetres * length.metres, VolumeUnit.CUBE_METRE)
            : this.mulByLength(new LengthImmutable(length, unit as LengthUnitArg));
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
    isEqualTo(area: number, unit: AreaUnitArg): boolean;
    isEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? floatsEqual(this.squareMetres, area.squareMetres)
            : this.isEqualTo(new AreaImmutable(area, unit as AreaUnitArg));
    }

    isLessThan(area: AbstractArea): boolean;
    isLessThan(area: number, unit: AreaUnitArg): boolean;
    isLessThan(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres < area.squareMetres && !this.isEqualTo(area)
            : this.isLessThan(new AreaImmutable(area, unit as AreaUnitArg));
    }

    isLessThanOrEqualTo(area: AbstractArea): boolean;
    isLessThanOrEqualTo(area: number, unit: AreaUnitArg): boolean;
    isLessThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isLessThan(area) || this.isEqualTo(area)
            : this.isLessThanOrEqualTo(new AreaImmutable(area, unit as AreaUnitArg));
    }

    isGreaterThan(area: AbstractArea): boolean;
    isGreaterThan(area: number, unit: AreaUnitArg): boolean;
    isGreaterThan(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.squareMetres > area.squareMetres && !this.isEqualTo(area)
            : this.isGreaterThan(new AreaImmutable(area, unit as AreaUnitArg));
    }

    isGreaterThanOrEqualTo(area: AbstractArea): boolean;
    isGreaterThanOrEqualTo(area: number, unit: AreaUnitArg): boolean;
    isGreaterThanOrEqualTo(area: AreaArg, unit?: AreaUnitArg): boolean {
        return area instanceof AbstractArea
            ? this.isGreaterThan(area) || this.isEqualTo(area)
            : this.isGreaterThanOrEqualTo(new AreaImmutable(area, unit as AreaUnitArg));
    }

    toMutable(): Area {
        return new Area(this.value, this.unit);
    }

    toImmutable(): AreaImmutable {
        return this;
    }

    static zero(): AreaImmutable {
        return new AreaImmutable(0, AreaUnit.SQUARE_METRE);
    }
}

export class Volume extends AbstractVolume implements TMutable {
    constructor(value: number, unit: VolumeUnitArg) {
        super(value, unit);
    }

    add(volume: AbstractVolume): AbstractVolume;
    add(volume: number, unit: VolumeUnitArg): AbstractVolume;
    add(volume: VolumeArg, unit?: VolumeUnitArg): AbstractVolume {
        const v = volume instanceof AbstractVolume ? volume : new Volume(volume, unit as VolumeUnitArg);
        this.value += v.getValue(this.unit);
        return this;
    }

    sub(volume: AbstractVolume): AbstractVolume;
    sub(volume: number, unit: VolumeUnitArg): AbstractVolume;
    sub(volume: VolumeArg, unit?: VolumeUnitArg): AbstractVolume {
        const v = volume instanceof AbstractVolume ? volume : new Volume(volume, unit as VolumeUnitArg);
        this.value -= v.getValue(this.unit);
        return this;
    }

    mulByNumber(value: number): AbstractVolume {
        this.value *= value;
        return this;
    }

    divByNumber(value: number): AbstractVolume {
        this.value /= value;
        return this;
    }

    divByLength(length: AbstractLength): AbstractArea;
    divByLength(length: number, unit: LengthUnitArg): AbstractArea;
    divByLength(length: LengthArg, unit?: LengthUnitArg): AbstractArea {
        const l = length instanceof AbstractLength ? length : new Length(length, unit as LengthUnitArg);
        return new Area(this.cubeMetres / l.metres, AreaUnit.SQUARE_METRE);
    }

    divByArea(area: AbstractArea): AbstractLength;
    divByArea(area: number, unit: AreaUnitArg): AbstractLength;
    divByArea(area: AreaArg, unit?: AreaUnitArg): AbstractLength {
        const a = area instanceof AbstractArea ? area : new Area(area, unit as AreaUnitArg);
        return new Length(this.cubeMetres / a.squareMetres, LengthUnit.METRE);
    }

    divByVolume(volume: AbstractVolume): number;
    divByVolume(volume: number, unit: VolumeUnitArg): number;
    divByVolume(volume: VolumeArg, unit?: VolumeUnitArg): number {
        const v = volume instanceof AbstractVolume ? volume : new Volume(volume, unit as VolumeUnitArg);
        return this.cubeMetres / v.cubeMetres;
    }

    isEqualTo(volume: AbstractVolume): boolean;
    isEqualTo(volume: number, unit: VolumeUnitArg): boolean;
    isEqualTo(volume: VolumeArg, unit?: VolumeUnitArg): boolean {
        const v = volume instanceof AbstractVolume ? volume : new Volume(volume, unit as VolumeUnitArg);
        return floatsEqual(this.cubeMetres, v.cubeMetres);
    }

    isLessThan(volume: AbstractVolume): boolean;
    isLessThan(volume: number, unit: VolumeUnitArg): boolean;
    isLessThan(volume: VolumeArg, unit?: VolumeUnitArg): boolean {
        const v = volume instanceof AbstractVolume ? volume : new Volume(volume, unit as VolumeUnitArg);
        return this.cubeMetres < v.cubeMetres && !this.isEqualTo(v);
    }

    isLessThanOrEqualTo(volume: AbstractVolume): boolean;
    isLessThanOrEqualTo(volume: number, unit: VolumeUnitArg): boolean;
    isLessThanOrEqualTo(volume: VolumeArg, unit?: VolumeUnitArg): boolean {
        const v = volume instanceof AbstractVolume ? volume : new Volume(volume, unit as VolumeUnitArg);
        return this.isLessThan(v) || this.isEqualTo(v);
    }

    isGreaterThan(volume: AbstractVolume): boolean;
    isGreaterThan(volume: number, unit: VolumeUnitArg): boolean;
    isGreaterThan(volume: VolumeArg, unit?: VolumeUnitArg): boolean {
        const v = volume instanceof AbstractVolume ? volume : new Volume(volume, unit as VolumeUnitArg);
        return this.cubeMetres > v.cubeMetres && !this.isEqualTo(v);
    }

    isGreaterThanOrEqualTo(volume: AbstractVolume): boolean;
    isGreaterThanOrEqualTo(volume: number, unit: VolumeUnitArg): boolean;
    isGreaterThanOrEqualTo(volume: VolumeArg, unit?: VolumeUnitArg): boolean {
        const v = volume instanceof AbstractVolume ? volume : new Volume(volume, unit as VolumeUnitArg);
        return this.isGreaterThan(v) || this.isEqualTo(v);
    }

    toMutable(): Volume {
        return new Volume(this.value, this.unit);
    }

    toImmutable(): VolumeImmutable {
        return new VolumeImmutable(this.value, this.unit);
    }

    static zero(): Volume {
        return new Volume(0, VolumeUnit.CUBE_METRE);
    }
}

export class VolumeImmutable extends AbstractVolume implements TImmutable {
    constructor(value: number, unit: VolumeUnitArg) {
        super(value, unit);
    }

    add(volume: AbstractVolume): AbstractVolume;
    add(volume: number, unit: VolumeUnitArg): AbstractVolume;
    add(volume: VolumeArg, unit?: VolumeUnitArg): AbstractVolume {
        const v = volume instanceof AbstractVolume ? volume : new VolumeImmutable(volume, unit as VolumeUnitArg);
        return new VolumeImmutable(this.value + v.getValue(this.unit), this.unit);
    }

    sub(volume: AbstractVolume): AbstractVolume;
    sub(volume: number, unit: VolumeUnitArg): AbstractVolume;
    sub(volume: VolumeArg, unit?: VolumeUnitArg): AbstractVolume {
        const v = volume instanceof AbstractVolume ? volume : new VolumeImmutable(volume, unit as VolumeUnitArg);
        return new VolumeImmutable(this.value - v.getValue(this.unit), this.unit);
    }

    mulByNumber(value: number): AbstractVolume {
        return new VolumeImmutable(this.value * value, this.unit);
    }

    divByNumber(value: number): AbstractVolume {
        return new VolumeImmutable(this.value / value, this.unit);
    }

    divByLength(length: AbstractLength): AbstractArea;
    divByLength(length: number, unit: LengthUnitArg): AbstractArea;
    divByLength(length: LengthArg, unit?: LengthUnitArg): AbstractArea {
        const l = length instanceof AbstractLength ? length : new LengthImmutable(length, unit as LengthUnitArg);
        return new AreaImmutable(this.cubeMetres / l.metres, AreaUnit.SQUARE_METRE);
    }

    divByArea(area: AbstractArea): AbstractLength;
    divByArea(area: number, unit: AreaUnitArg): AbstractLength;
    divByArea(area: AreaArg, unit?: AreaUnitArg): AbstractLength {
        const a = area instanceof AbstractArea ? area : new AreaImmutable(area, unit as AreaUnitArg);
        return new LengthImmutable(this.cubeMetres / a.squareMetres, LengthUnit.METRE);
    }

    divByVolume(volume: AbstractVolume): number;
    divByVolume(volume: number, unit: VolumeUnitArg): number;
    divByVolume(volume: VolumeArg, unit?: VolumeUnitArg): number {
        const v = volume instanceof AbstractVolume ? volume : new VolumeImmutable(volume, unit as VolumeUnitArg);
        return this.cubeMetres / v.cubeMetres;
    }

    isEqualTo(volume: AbstractVolume): boolean;
    isEqualTo(volume: number, unit: VolumeUnitArg): boolean;
    isEqualTo(volume: VolumeArg, unit?: VolumeUnitArg): boolean {
        const v = volume instanceof AbstractVolume ? volume : new VolumeImmutable(volume, unit as VolumeUnitArg);
        return floatsEqual(this.cubeMetres, v.cubeMetres);
    }

    isLessThan(volume: AbstractVolume): boolean;
    isLessThan(volume: number, unit: VolumeUnitArg): boolean;
    isLessThan(volume: VolumeArg, unit?: VolumeUnitArg): boolean {
        const v = volume instanceof AbstractVolume ? volume : new VolumeImmutable(volume, unit as VolumeUnitArg);
        return this.cubeMetres < v.cubeMetres && !this.isEqualTo(v);
    }

    isLessThanOrEqualTo(volume: AbstractVolume): boolean;
    isLessThanOrEqualTo(volume: number, unit: VolumeUnitArg): boolean;
    isLessThanOrEqualTo(volume: VolumeArg, unit?: VolumeUnitArg): boolean {
        const v = volume instanceof AbstractVolume ? volume : new VolumeImmutable(volume, unit as VolumeUnitArg);
        return this.isLessThan(v) || this.isEqualTo(v);
    }

    isGreaterThan(volume: AbstractVolume): boolean;
    isGreaterThan(volume: number, unit: VolumeUnitArg): boolean;
    isGreaterThan(volume: VolumeArg, unit?: VolumeUnitArg): boolean {
        const v = volume instanceof AbstractVolume ? volume : new VolumeImmutable(volume, unit as VolumeUnitArg);
        return this.cubeMetres > v.cubeMetres && !this.isEqualTo(v);
    }

    isGreaterThanOrEqualTo(volume: AbstractVolume): boolean;
    isGreaterThanOrEqualTo(volume: number, unit: VolumeUnitArg): boolean;
    isGreaterThanOrEqualTo(volume: VolumeArg, unit?: VolumeUnitArg): boolean {
        const v = volume instanceof AbstractVolume ? volume : new VolumeImmutable(volume, unit as VolumeUnitArg);
        return this.isGreaterThan(v) || this.isEqualTo(v);
    }

    toMutable(): Volume {
        return new Volume(this.value, this.unit);
    }

    toImmutable(): VolumeImmutable {
        return this;
    }

    static zero(): VolumeImmutable {
        return new VolumeImmutable(0, VolumeUnit.CUBE_METRE);
    }
}

