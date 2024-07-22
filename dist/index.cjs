"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var measurements_js_exports = {};
__export(measurements_js_exports, {
  Area: () => Area,
  AreaImmutable: () => AreaImmutable,
  AreaUnit: () => AreaUnit,
  Length: () => Length,
  LengthImmutable: () => LengthImmutable,
  LengthUnit: () => LengthUnit
});
module.exports = __toCommonJS(measurements_js_exports);

// src/LengthUnit.ts
var _LengthUnit = class _LengthUnit {
  constructor(id, baseUnitsPer, name, pluralName, acronym, symbol) {
    _LengthUnit.buildDefaultUnits();
    this.id = id;
    this.baseUnitsPer = baseUnitsPer;
    this.name = name;
    this.pluralName = pluralName;
    this.acronym = acronym;
    this.symbol = symbol;
    _LengthUnit.checkForUniqueness(this);
    _LengthUnit.units.push(this);
  }
  static buildDefaultUnits() {
    if (_LengthUnit.units !== void 0) {
      return;
    }
    _LengthUnit.units = [];
    new _LengthUnit(_LengthUnit.KILOMETRE, 1e3, "kilometre", "kilometres", "km", "km");
    new _LengthUnit(_LengthUnit.METRE, 1, "metre", "metres", "m", "m");
    new _LengthUnit(_LengthUnit.CENTIMETRE, 0.01, "centimetre", "centimetres", "cm", "cm");
    new _LengthUnit(_LengthUnit.MILLIMETRE, 1e-3, "millimetre", "millimetres", "mm", "mm");
    new _LengthUnit(_LengthUnit.INCH, 0.0254, "inch", "inches", "in", '"');
    new _LengthUnit(_LengthUnit.FOOT, 0.3048, "foot", "feet", "ft", "'");
    new _LengthUnit(_LengthUnit.YARD, 0.9144, "yard", "yards", "yd", "yd");
    new _LengthUnit(_LengthUnit.MILE, 1609.344, "mile", "miles", "mi", "mi");
  }
  static checkForUniqueness(newUnit) {
    for (const unit of _LengthUnit.units) {
      if (unit.id === newUnit.id) {
        throw new Error(`Unit ID ${newUnit.id} already exists`);
      } else if (unit.baseUnitsPer === newUnit.baseUnitsPer) {
        throw new Error(`Unit base units per ${newUnit.baseUnitsPer} already exists`);
      } else if (unit.name === newUnit.name) {
        throw new Error(`Unit name ${newUnit.name} already exists`);
      } else if (unit.pluralName === newUnit.pluralName) {
        throw new Error(`Unit plural name ${newUnit.pluralName} already exists`);
      } else if (unit.acronym === newUnit.acronym) {
        throw new Error(`Unit acronym ${newUnit.acronym} already exists`);
      } else if (unit.symbol === newUnit.symbol) {
        throw new Error(`Unit symbol ${newUnit.symbol} already exists`);
      }
    }
  }
  static getById(id) {
    _LengthUnit.buildDefaultUnits();
    for (const unit of _LengthUnit.units) {
      if (unit.id === id) {
        return unit;
      }
    }
    throw new Error(`No length unit found with id ${id}`);
  }
};
_LengthUnit.KILOMETRE = 1;
_LengthUnit.METRE = 2;
_LengthUnit.CENTIMETRE = 3;
_LengthUnit.MILLIMETRE = 4;
_LengthUnit.INCH = 5;
_LengthUnit.FOOT = 6;
_LengthUnit.YARD = 7;
_LengthUnit.MILE = 8;
var LengthUnit = _LengthUnit;

// src/AreaUnit.ts
var _AreaUnit = class _AreaUnit {
  constructor(id, name, pluralName, acronym, correspondingLengthUnitId) {
    _AreaUnit.buildDefaultUnits();
    this.id = id;
    this.name = name;
    this.pluralName = pluralName;
    this.acronym = acronym;
    this.correspondingLengthUnit = LengthUnit.getById(correspondingLengthUnitId);
    this.baseUnitsPer = this.correspondingLengthUnit.baseUnitsPer ** 2;
    _AreaUnit.checkForUniqueness(this);
    _AreaUnit.units.push(this);
  }
  static buildDefaultUnits() {
    if (_AreaUnit.units !== void 0) {
      return;
    }
    _AreaUnit.units = [];
    new _AreaUnit(_AreaUnit.SQUARE_KILOMETRE, "square kilometre", "square kilometres", "km\xB2", LengthUnit.KILOMETRE);
    new _AreaUnit(_AreaUnit.SQUARE_METRE, "square metre", "square metres", "m\xB2", LengthUnit.METRE);
    new _AreaUnit(_AreaUnit.SQUARE_CENTIMETRE, "square centimetre", "square centimetres", "cm\xB2", LengthUnit.CENTIMETRE);
    new _AreaUnit(_AreaUnit.SQUARE_MILLIMETRE, "square millimetre", "square millimetres", "mm\xB2", LengthUnit.MILLIMETRE);
    new _AreaUnit(_AreaUnit.SQUARE_INCH, "square inch", "square inches", "in\xB2", LengthUnit.INCH);
    new _AreaUnit(_AreaUnit.SQUARE_FOOT, "square foot", "square feet", "ft\xB2", LengthUnit.FOOT);
    new _AreaUnit(_AreaUnit.SQUARE_YARD, "square yard", "square yards", "yd\xB2", LengthUnit.YARD);
    new _AreaUnit(_AreaUnit.SQUARE_MILE, "square mile", "square miles", "mi\xB2", LengthUnit.MILE);
  }
  static checkForUniqueness(newUnit) {
    for (const unit of _AreaUnit.units) {
      if (unit.id === newUnit.id) {
        throw new Error(`Unit ID ${newUnit.id} already exists`);
      } else if (unit.baseUnitsPer === newUnit.baseUnitsPer) {
        throw new Error(`Unit base units per ${newUnit.baseUnitsPer} already exists`);
      } else if (unit.name === newUnit.name) {
        throw new Error(`Unit name ${newUnit.name} already exists`);
      } else if (unit.pluralName === newUnit.pluralName) {
        throw new Error(`Unit plural name ${newUnit.pluralName} already exists`);
      } else if (unit.acronym === newUnit.acronym) {
        throw new Error(`Unit acronym ${newUnit.acronym} already exists`);
      } else if (unit.correspondingLengthUnit.id === newUnit.correspondingLengthUnit.id) {
        throw new Error(`Unit corresponding length unit ${newUnit.correspondingLengthUnit.id} already exists`);
      }
    }
  }
  static getById(id) {
    _AreaUnit.buildDefaultUnits();
    for (const unit of _AreaUnit.units) {
      if (unit.id === id) {
        return unit;
      }
    }
    throw new Error(`No unit found with id ${id}`);
  }
};
_AreaUnit.SQUARE_METRE = 1;
_AreaUnit.SQUARE_KILOMETRE = 2;
_AreaUnit.SQUARE_CENTIMETRE = 3;
_AreaUnit.SQUARE_MILLIMETRE = 4;
_AreaUnit.SQUARE_INCH = 5;
_AreaUnit.SQUARE_FOOT = 6;
_AreaUnit.SQUARE_YARD = 7;
_AreaUnit.SQUARE_MILE = 8;
var AreaUnit = _AreaUnit;

// src/Helpers.ts
function floatsEqual(a, b, precision = 5) {
  const epsilon = 0.1 / Math.pow(10, precision);
  return Math.abs(a - b) < epsilon;
}

// src/Abstracts.ts
var AbstractMeasurement = class {
  constructor(value) {
    this.value = value;
  }
  isZero() {
    return floatsEqual(this.value, 0);
  }
  isNotZero() {
    return !this.isZero();
  }
  isGreaterThanZero() {
    return this.value > 0;
  }
  isGreaterThanOrEqualToZero() {
    return this.value >= 0;
  }
  isLessThanZero() {
    return this.value < 0;
  }
  isLessThanOrEqualToZero() {
    return this.value <= 0;
  }
};
var AbstractLength = class extends AbstractMeasurement {
  constructor(value, unit) {
    super(value);
    this.unit = unit instanceof LengthUnit ? unit : LengthUnit.getById(unit);
  }
  getValue(unit) {
    unit = unit instanceof LengthUnit ? unit : LengthUnit.getById(unit);
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
  format(decimals, unit, type = "acronym") {
    const numeral = require("numeral");
    const number = numeral(this.getValue(unit)).format();
    unit = unit instanceof LengthUnit ? unit : LengthUnit.getById(unit);
    let suffix;
    switch (type) {
      case "name":
        suffix = " " + (this.isEqualTo(1, unit) ? unit.name : unit.pluralName);
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
};
var AbstractArea = class extends AbstractMeasurement {
  constructor(value, unit) {
    super(value);
    this.unit = unit instanceof AreaUnit ? unit : AreaUnit.getById(unit);
  }
  getValue(unit) {
    unit = unit instanceof AreaUnit ? unit : AreaUnit.getById(unit);
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
  format(decimals, unit, type = "acronym") {
    const numeral = require("numeral");
    const number = numeral(this.getValue(unit)).format();
    unit = unit instanceof AreaUnit ? unit : AreaUnit.getById(unit);
    let suffix;
    switch (type) {
      case "name":
        suffix = " " + (this.isEqualTo(1, unit) ? unit.name : unit.pluralName);
        break;
      case "acronym":
        suffix = unit.acronym;
        break;
      default:
        throw new Error("Invalid format type");
    }
    return `${number}${suffix}`;
  }
};

// src/Concretes.ts
var Length = class _Length extends AbstractLength {
  constructor(value, unit) {
    super(value, unit);
  }
  add(length, unit) {
    length = length instanceof AbstractLength ? length : new _Length(length, unit);
    this.value += length.getValue(this.unit);
    return this;
  }
  sub(length, unit) {
    length = length instanceof AbstractLength ? length : new _Length(length, unit);
    this.value -= length.getValue(this.unit);
    return this;
  }
  mulByNumber(value) {
    this.value *= value;
    return this;
  }
  mulByLength(length, unit) {
    return length instanceof AbstractLength ? new Area(this.metres * length.metres, AreaUnit.SQUARE_METRE) : this.mulByLength(new _Length(length, unit));
  }
  divByNumber(value) {
    this.value /= value;
    return this;
  }
  divByLength(length, unit) {
    return length instanceof AbstractLength ? this.metres / length.metres : this.divByLength(new _Length(length, unit));
  }
  isEqualTo(length, unit) {
    return length instanceof AbstractLength ? floatsEqual(this.metres, length.metres) : this.isEqualTo(new _Length(length, unit));
  }
  isLessThan(length, unit) {
    return length instanceof AbstractLength ? this.metres < length.metres : this.isLessThan(new _Length(length, unit));
  }
  isLessThanOrEqualTo(length, unit) {
    return length instanceof AbstractLength ? this.isLessThan(length) || this.isEqualTo(length) : this.isLessThanOrEqualTo(new _Length(length, unit));
  }
  isGreaterThan(length, unit) {
    return length instanceof AbstractLength ? this.metres > length.metres : this.isGreaterThan(new _Length(length, unit));
  }
  isGreaterThanOrEqualTo(length, unit) {
    return length instanceof AbstractLength ? this.isGreaterThan(length) || this.isEqualTo(length) : this.isGreaterThanOrEqualTo(new _Length(length, unit));
  }
  toImmutable() {
    return new LengthImmutable(this.value, this.unit);
  }
};
var LengthImmutable = class _LengthImmutable extends AbstractLength {
  constructor(value, unit) {
    super(value, unit);
  }
  add(length, unit) {
    length = length instanceof AbstractLength ? length : new _LengthImmutable(length, unit);
    const value = this.value + length.getValue(this.unit);
    return new _LengthImmutable(value, this.unit);
  }
  sub(length, unit) {
    length = length instanceof AbstractLength ? length : new _LengthImmutable(length, unit);
    const value = this.value - length.getValue(this.unit);
    return new _LengthImmutable(value, this.unit);
  }
  mulByNumber(value) {
    return new _LengthImmutable(this.value * value, this.unit);
  }
  mulByLength(length, unit) {
    return length instanceof AbstractLength ? new AreaImmutable(this.metres * length.metres, AreaUnit.SQUARE_METRE) : this.mulByLength(new _LengthImmutable(length, unit));
  }
  divByNumber(value) {
    return new _LengthImmutable(this.value / value, this.unit);
  }
  divByLength(length, unit) {
    return length instanceof AbstractLength ? this.metres / length.metres : this.divByLength(new _LengthImmutable(length, unit));
  }
  isEqualTo(length, unit) {
    return length instanceof AbstractLength ? floatsEqual(this.metres, length.metres) : this.isEqualTo(new _LengthImmutable(length, unit));
  }
  isLessThan(length, unit) {
    return length instanceof AbstractLength ? this.metres < length.metres : this.isLessThan(new _LengthImmutable(length, unit));
  }
  isLessThanOrEqualTo(length, unit) {
    return length instanceof AbstractLength ? this.isLessThan(length) || this.isEqualTo(length) : this.isLessThanOrEqualTo(new _LengthImmutable(length, unit));
  }
  isGreaterThan(length, unit) {
    return length instanceof AbstractLength ? this.metres > length.metres : this.isGreaterThan(new _LengthImmutable(length, unit));
  }
  isGreaterThanOrEqualTo(length, unit) {
    return length instanceof AbstractLength ? this.isGreaterThan(length) || this.isEqualTo(length) : this.isGreaterThanOrEqualTo(new _LengthImmutable(length, unit));
  }
  toMutable() {
    return new Length(this.value, this.unit);
  }
};
var Area = class _Area extends AbstractArea {
  constructor(value, unit) {
    super(value, unit);
  }
  add(area, unit) {
    area = area instanceof AbstractArea ? area : new _Area(area, unit);
    this.value += area.getValue(this.unit);
    return this;
  }
  sub(area, unit) {
    area = area instanceof AbstractArea ? area : new _Area(area, unit);
    this.value -= area.getValue(this.unit);
    return this;
  }
  mulByNumber(value) {
    this.value *= value;
    return this;
  }
  divByNumber(value) {
    this.value /= value;
    return this;
  }
  divByLength(length, unit) {
    return length instanceof AbstractLength ? new Length(this.squareMetres / length.metres, LengthUnit.METRE) : this.divByLength(new Length(length, unit));
  }
  divByArea(area, unit) {
    return area instanceof AbstractArea ? this.squareMetres / area.squareMetres : this.divByArea(new _Area(area, unit));
  }
  isEqualTo(area, unit) {
    return area instanceof AbstractArea ? floatsEqual(this.squareMetres, area.squareMetres) : this.isEqualTo(new _Area(area, unit));
  }
  isLessThan(area, unit) {
    return area instanceof AbstractArea ? this.squareMetres < area.squareMetres : this.isLessThan(new _Area(area, unit));
  }
  isLessThanOrEqualTo(area, unit) {
    return area instanceof AbstractArea ? this.isLessThan(area) || this.isEqualTo(area) : this.isLessThanOrEqualTo(new _Area(area, unit));
  }
  isGreaterThan(area, unit) {
    return area instanceof AbstractArea ? this.squareMetres > area.squareMetres : this.isGreaterThan(new _Area(area, unit));
  }
  isGreaterThanOrEqualTo(area, unit) {
    return area instanceof AbstractArea ? this.isGreaterThan(area) || this.isEqualTo(area) : this.isGreaterThanOrEqualTo(new _Area(area, unit));
  }
  toImmutable() {
    return new AreaImmutable(this.value, this.unit);
  }
};
var AreaImmutable = class _AreaImmutable extends AbstractArea {
  constructor(value, unit) {
    super(value, unit);
  }
  add(area, unit) {
    area = area instanceof AbstractArea ? area : new _AreaImmutable(area, unit);
    return new _AreaImmutable(this.value + area.getValue(this.unit), this.unit);
  }
  sub(area, unit) {
    area = area instanceof AbstractArea ? area : new _AreaImmutable(area, unit);
    return new _AreaImmutable(this.value - area.getValue(this.unit), this.unit);
  }
  mulByNumber(value) {
    return new _AreaImmutable(this.value * value, this.unit);
  }
  divByNumber(value) {
    return new _AreaImmutable(this.value / value, this.unit);
  }
  divByLength(length, unit) {
    return length instanceof AbstractLength ? new LengthImmutable(this.squareMetres / length.metres, LengthUnit.METRE) : this.divByLength(new LengthImmutable(length, unit));
  }
  divByArea(area, unit) {
    return area instanceof AbstractArea ? this.squareMetres / area.squareMetres : this.divByArea(new _AreaImmutable(area, unit));
  }
  isEqualTo(area, unit) {
    return area instanceof AbstractArea ? floatsEqual(this.squareMetres, area.squareMetres) : this.isEqualTo(new _AreaImmutable(area, unit));
  }
  isLessThan(area, unit) {
    return area instanceof AbstractArea ? this.squareMetres < area.squareMetres : this.isLessThan(new _AreaImmutable(area, unit));
  }
  isLessThanOrEqualTo(area, unit) {
    return area instanceof AbstractArea ? this.isLessThan(area) || this.isEqualTo(area) : this.isLessThanOrEqualTo(new _AreaImmutable(area, unit));
  }
  isGreaterThan(area, unit) {
    return area instanceof AbstractArea ? this.squareMetres > area.squareMetres : this.isGreaterThan(new _AreaImmutable(area, unit));
  }
  isGreaterThanOrEqualTo(area, unit) {
    return area instanceof AbstractArea ? this.isGreaterThan(area) || this.isEqualTo(area) : this.isGreaterThanOrEqualTo(new _AreaImmutable(area, unit));
  }
  toMutable() {
    return new Area(this.value, this.unit);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Area,
  AreaImmutable,
  AreaUnit,
  Length,
  LengthImmutable,
  LengthUnit
});
