## @cjfulford/measurements-js

@cjfulford/measurements-js is an npm package providing classes for handling measurements of length, area, and volume in
various units. This package offers flexibility and ease of use for converting, manipulating, and comparing measurements.

### Installation

You can install @cjfulford/measurements-js via npm:

npm install @cjfulford/measurements-js

### Usage

#### Length

Create a length object:

```javascript
import {Length, LengthUnit} from '@cjfulford/measurements-js';

// Create a length object
const length = new Length(5, LengthUnit.METRE);

// Perform operations
const convertedLength = length.add(2, LengthUnit.KILOMETRE);
console.log(convertedLength.kilometres); // Output: 2.005

// Compare lengths
console.log(length.isGreaterThan(4, LengthUnit.METRE)); // Output: true
const length2 = new Length(1, LengthUnit.KILOMETRE);
console.log(length.isLessThan(length2)); // Output: false
```

#### Area

Import Area and AreaUnit from @cjfulford/measurements-js:

Create an area object:

```javascript
import {Area, AreaUnit} from '@cjfulford/measurements-js';

// Create an area object
const area = new Area(100, AreaUnit.SQUARE_METRE);

// Perform operations
const convertedArea = area.mulByNumber(0.5);
console.log(convertedArea.squareMetres); // Output: 50

// Compare areas
console.log(area.isLessThanOrEqualTo(200, AreaUnit.SQUARE_METRE)); // Output: true
```

There is also the `LengthImmutable` and `AreaImmutable` classes which are immutable versions of `Length` and `Area`.

#### Volume

Import Volume and VolumeUnit from @cjfulford/measurements-js:

Create a volume object:

```javascript
import {Volume, VolumeUnit} from '@cjfulford/measurements-js';

// Create a volume object
const volume = new Volume(2, VolumeUnit.CUBE_METRE);

// Perform operations
const addedVolume = volume.add(1, VolumeUnit.CUBE_METRE);
console.log(addedVolume.cubeMetres); // Output: 3

// Convert units
const litres = volume.as(VolumeUnit.LITRE);
console.log(litres); // Output: 2000

// Compare volumes
console.log(volume.isGreaterThan(1000, VolumeUnit.LITRE)); // Output: true
```

There is also the `VolumeImmutable` class which is an immutable version of `Volume`.

### Available Units

#### Length Units

- Kilometre (KILOMETRE)
- Metre (METRE)
- Centimetre (CENTIMETRE)
- Millimetre (MILLIMETRE)
- Inch (INCH)
- Foot (FOOT)
- Yard (YARD)
- Mile (MILE)

#### Area Units

- Square Kilometre (SQUARE_KILOMETRE)
- Square Metre (SQUARE_METRE)
- Square Centimetre (SQUARE_CENTIMETRE)
- Square Millimetre (SQUARE_MILLIMETRE)
- Square Inch (SQUARE_INCH)
- Square Foot (SQUARE_FOOT)
- Square Yard (SQUARE_YARD)
- Square Mile (SQUARE_MILE)

#### Volume Units

- Cubic Metre (CUBE_METRE)
- Cubic Centimetre (CUBE_CENTIMETRE)
- Cubic Millimetre (CUBE_MILLIMETRE)
- Cubic Inch (CUBE_INCH)
- Cubic Foot (CUBE_FOOT)
- Cubic Yard (CUBE_YARD)
- Cubic Mile (CUBE_MILE)

### License

This package is licensed under the MIT License. See the LICENSE file for details.
