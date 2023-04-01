# color-conversion-tools

Utility functions to convert colors.

## Install

```js
npm install color-conversion-tools
```

## Usage

```js
import {
  isHex,
  convertHexToRgb,
  getRgbNumbers,
  getColorsBetweenRgbColors,
} from "js-color-converter";

isHex("#ccc"); // true

convertHexToRgb("#ccc"); // rgb(204, 204, 204)

getRgbNumbers("rgb(204, 204, 204)"); // [204, 204, 204]

getColorsBetweenRgbColors("rgb(255, 0, 0)", "rgb(0, 128, 0)", 2); // ['rgb(255, 0, 0)', 'rgb(170, 43, 0)', 'rgb(85, 85, 0)', 'rgb(0, 128, 0)']

// ...
```

## API

| Name                      | Description                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| isHex                     | This function checks if the given string is a valid HEX color code.                             |
| isHsl                     | This function checks if the given string is a valid HSL color code.                             |
| isCmyk                    | This function checks if the given string is a valid CMYK color code.                            |
| isRgb                     | This function checks if the given string is a valid RGB color code.                             |
| getRgbNumbers             | The function will extract the array of numbers from the provided RGB string.                    |
| getHslNumbers             | The function will extract the array of numbers from the provided HSL string.                    |
| getCmykNumbers            | The function will extract the array of numbers from the provided CMYK string.                   |
| convertRgbToCmyk          | The function takes RGB and converts it to CMYK.                                                 |
| convertCmykToRgb          | The function takes CMYK and converts it to RGB.                                                 |
| convertRgbToHsl           | The function takes RGB and converts it to HSL.                                                  |
| convertHslToRgb           | The function takes HSL and converts it to RGB.                                                  |
| convertRgbToHex           | The function takes RGB and converts it to HEX.                                                  |
| convertHexToRgb           | The function takes HEX and converts it to RGB.                                                  |
| getColorsBetweenRgbColors | The function takes two RGB color and generates an array of colors between the two input colors. |
