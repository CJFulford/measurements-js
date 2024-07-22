declare class LengthUnit {
    static readonly KILOMETRE = 1;
    static readonly METRE = 2;
    static readonly CENTIMETRE = 3;
    static readonly MILLIMETRE = 4;
    static readonly INCH = 5;
    static readonly FOOT = 6;
    static readonly YARD = 7;
    static readonly MILE = 8;
    readonly id: number;
    readonly baseUnitsPer: number;
    readonly name: string;
    readonly pluralName: string;
    readonly acronym: string;
    readonly symbol: string;
    private static units;
    constructor(id: number, baseUnitsPer: number, name: string, pluralName: string, acronym: string, symbol: string);
    private static buildDefaultUnits;
    private static checkForUniqueness;
    static getById(id: number): LengthUnit;
}

declare class AreaUnit {
    static readonly SQUARE_METRE = 1;
    static readonly SQUARE_KILOMETRE = 2;
    static readonly SQUARE_CENTIMETRE = 3;
    static readonly SQUARE_MILLIMETRE = 4;
    static readonly SQUARE_INCH = 5;
    static readonly SQUARE_FOOT = 6;
    static readonly SQUARE_YARD = 7;
    static readonly SQUARE_MILE = 8;
    readonly id: number;
    readonly name: string;
    readonly pluralName: string;
    readonly acronym: string;
    readonly correspondingLengthUnit: LengthUnit;
    readonly baseUnitsPer: number;
    private static units;
    constructor(id: number, name: string, pluralName: string, acronym: string, correspondingLengthUnitId: number);
    private static buildDefaultUnits;
    private static checkForUniqueness;
    static getById(id: number): AreaUnit;
}

type LengthArg = AbstractLength | number;
type LengthUnitArg = LengthUnit | number;
type AreaArg = AbstractArea | number;
type AreaUnitArg = AreaUnit | number;
declare abstract class AbstractMeasurement {
    protected value: number;
    protected constructor(value: number);
    isZero(): boolean;
    isNotZero(): boolean;
    isGreaterThanZero(): boolean;
    isGreaterThanOrEqualToZero(): boolean;
    isLessThanZero(): boolean;
    isLessThanOrEqualToZero(): boolean;
}
declare abstract class AbstractLength extends AbstractMeasurement {
    protected unit: LengthUnit;
    protected constructor(value: number, unit: LengthUnitArg);
    getValue(unit: LengthUnitArg): number;
    get kilometres(): number;
    get metres(): number;
    get centimetres(): number;
    get millimetres(): number;
    get inches(): number;
    get feet(): number;
    get yards(): number;
    get miles(): number;
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
    format(decimals: number, unit: LengthUnitArg, type?: "name" | "acronym" | "symbol"): string;
}
declare abstract class AbstractArea extends AbstractMeasurement {
    protected unit: AreaUnit;
    protected constructor(value: number, unit: AreaUnitArg);
    getValue(unit: AreaUnit | number): number;
    get squareKilometres(): number;
    get squareMetres(): number;
    get squareCentimetres(): number;
    get squareMillimetres(): number;
    get squareInches(): number;
    get squareFeet(): number;
    get squareYards(): number;
    get squareMiles(): number;
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
    format(decimals: number, unit: AreaUnitArg, type?: "name" | "acronym"): string;
}

interface Mutable {
    toImmutable(): Immutable;
}
interface Immutable {
    toMutable(): Mutable;
}
declare class Length extends AbstractLength implements Mutable {
    constructor(value: number, unit: LengthUnitArg);
    add(length: AbstractLength): Length;
    add(length: number, unit: LengthUnitArg): Length;
    sub(length: AbstractLength): Length;
    sub(length: number, unit: LengthUnitArg): Length;
    mulByNumber(value: number): Length;
    mulByLength(length: AbstractLength): Area;
    mulByLength(length: number, unit: LengthUnitArg): Area;
    divByNumber(value: number): Length;
    divByLength(length: AbstractLength): number;
    divByLength(length: number, unit: LengthUnitArg): number;
    isEqualTo(length: AbstractLength): boolean;
    isEqualTo(length: number, unit: number): boolean;
    isLessThan(length: AbstractLength): boolean;
    isLessThan(length: number, unit: number): boolean;
    isLessThanOrEqualTo(length: AbstractLength): boolean;
    isLessThanOrEqualTo(length: number, unit: number): boolean;
    isGreaterThan(length: AbstractLength): boolean;
    isGreaterThan(length: number, unit: number): boolean;
    isGreaterThanOrEqualTo(length: AbstractLength): boolean;
    isGreaterThanOrEqualTo(length: number, unit: number): boolean;
    toImmutable(): LengthImmutable;
}
declare class LengthImmutable extends AbstractLength implements Immutable {
    constructor(value: number, unit: LengthUnitArg);
    add(length: AbstractLength): LengthImmutable;
    add(length: number, unit: LengthUnitArg): LengthImmutable;
    sub(length: AbstractLength): LengthImmutable;
    sub(length: number, unit: LengthUnitArg): LengthImmutable;
    mulByNumber(value: number): LengthImmutable;
    mulByLength(length: AbstractLength): AreaImmutable;
    mulByLength(length: number, unit: LengthUnitArg): AreaImmutable;
    divByNumber(value: number): LengthImmutable;
    divByLength(length: AbstractLength): number;
    divByLength(length: number, unit: LengthUnitArg): number;
    isEqualTo(length: AbstractLength): boolean;
    isEqualTo(length: number, unit: number): boolean;
    isLessThan(length: AbstractLength): boolean;
    isLessThan(length: number, unit: number): boolean;
    isLessThanOrEqualTo(length: AbstractLength): boolean;
    isLessThanOrEqualTo(length: number, unit: number): boolean;
    isGreaterThan(length: AbstractLength): boolean;
    isGreaterThan(length: number, unit: number): boolean;
    isGreaterThanOrEqualTo(length: AbstractLength): boolean;
    isGreaterThanOrEqualTo(length: number, unit: number): boolean;
    toMutable(): Length;
}
declare class Area extends AbstractArea implements Mutable {
    constructor(value: number, unit: AreaUnitArg);
    add(area: AbstractArea): Area;
    add(area: number, unit: AreaUnitArg): Area;
    sub(area: AbstractArea): Area;
    sub(area: number, unit: AreaUnitArg): Area;
    mulByNumber(value: number): Area;
    divByNumber(value: number): Area;
    divByLength(length: AbstractLength): Length;
    divByLength(length: number, unit: LengthUnitArg): Length;
    divByArea(area: AbstractArea): number;
    divByArea(area: number, unit: AreaUnitArg): number;
    isEqualTo(area: AbstractArea): boolean;
    isEqualTo(area: number, unit: number): boolean;
    isLessThan(area: AbstractArea): boolean;
    isLessThan(area: number, unit: number): boolean;
    isLessThanOrEqualTo(area: AbstractArea): boolean;
    isLessThanOrEqualTo(area: number, unit: number): boolean;
    isGreaterThan(area: AbstractArea): boolean;
    isGreaterThan(area: number, unit: number): boolean;
    isGreaterThanOrEqualTo(area: AbstractArea): boolean;
    isGreaterThanOrEqualTo(area: number, unit: number): boolean;
    toImmutable(): AreaImmutable;
}
declare class AreaImmutable extends AbstractArea implements Immutable {
    constructor(value: number, unit: AreaUnitArg);
    add(area: AbstractArea): AreaImmutable;
    add(area: number, unit: AreaUnitArg): AreaImmutable;
    sub(area: AbstractArea): AreaImmutable;
    sub(area: number, unit: AreaUnitArg): AreaImmutable;
    mulByNumber(value: number): AreaImmutable;
    divByNumber(value: number): AreaImmutable;
    divByLength(length: AbstractLength): LengthImmutable;
    divByLength(length: number, unit: LengthUnitArg): LengthImmutable;
    divByArea(area: AbstractArea): number;
    divByArea(area: number, unit: AreaUnitArg): number;
    isEqualTo(area: AbstractArea): boolean;
    isEqualTo(area: number, unit: number): boolean;
    isLessThan(area: AbstractArea): boolean;
    isLessThan(area: number, unit: number): boolean;
    isLessThanOrEqualTo(area: AbstractArea): boolean;
    isLessThanOrEqualTo(area: number, unit: number): boolean;
    isGreaterThan(area: AbstractArea): boolean;
    isGreaterThan(area: number, unit: number): boolean;
    isGreaterThanOrEqualTo(area: AbstractArea): boolean;
    isGreaterThanOrEqualTo(area: number, unit: number): boolean;
    toMutable(): Area;
}

export { Area, AreaImmutable, AreaUnit, Length, LengthImmutable, LengthUnit };
