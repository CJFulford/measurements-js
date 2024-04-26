"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
