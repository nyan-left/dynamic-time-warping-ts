# dynamic-time-warping-2

This is a typed version of the [github.com/GordonLesti/dynamic-time-warping](https://github.com/GordonLesti/dynamic-time-warping) package, initially forked by [fheyen](https://github.com/fheyen/dynamic-time-warping-2#readme).

## Install

`npm install dynamic-time-warping-ts`

## Usage

### Importing the package

```ts
import DynamicTimeWarping from "dynamic-time-warping-ts";
```

### Initialization

`DynamicTimeWarping` needs two arrays containing objects of the the same type and function that calculates the distance
between two objects and returns a float.

```javascript
const ser1 = [ 9, 93, 15, 19, 24 ];
const ser2 = [ 31, 97, 81, 82, 39 ];
const distFunc = ( a, b )=>  Math.abs( a - b );

const dtw = new DynamicTimeWarping(ser1, ser2, distFunc);
```

### getDistance

Will return the distance of the dynamic time warping as float.

```javascript
// 108
const dist = dtw.getDistance();
```

### getPath

Will return the path of the dynamic time warping as array of arrays with two integers.

```javascript
// [ [ 0, 0 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ] ]
const dist = dtw.getPath();
```

## Credits

- [Frank Heyen](https://github.com/fheyen/)
- [Gordon Lesti](https://github.com/GordonLesti/)
- All contributors

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
