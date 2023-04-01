export const isHex = (_hexColor) => {
  return /^#[a-f0-9]{3}([a-f0-9]{3})?$/i.test(_hexColor);
};

export const isHsl = (_hslColor) => {
  return /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/.test(_hslColor);
};

export const isCmyk = (_cmykColor) => {
  return /cmyk\((\d{1,3})%, (\d{1,3})%, (\d{1,3})%, (\d{1,3})%\)*$/.test(
    _cmykColor
  );
};

export const isRgb = (_rgbColor) => {
  return /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/.test(
    _rgbColor
  );
};

export const getRgbNumbers = (_rgbStr) => {
  if (!isRgb(_rgbStr)) {
    return [];
  }

  const rgba =
    /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  let rgb = [0, 0, 0];
  let match = _rgbStr.match(rgba);
  for (let i = 0; i < 3; i++) {
    rgb[i] = parseInt(match[i + 1], 0);
  }

  return rgb;
};

export const getHslNumbers = (_hslStr) => {
  if (!isHsl(_hslStr)) {
    return [];
  }

  let sep = _hslStr.indexOf(",") > -1 ? "," : " ";
  _hslStr = _hslStr.substr(4).split(")")[0].split(sep);
  let hsl = [
    +_hslStr[0],
    +_hslStr[1].substr(0, _hslStr[1].length - 1),
    +_hslStr[2].substr(0, _hslStr[2].length - 1),
  ];

  return hsl;
};

export const getCmykNumbers = (_cmykStr) => {
  if (!isCmyk(_cmykStr)) {
    return [];
  }

  let sep = _cmykStr.indexOf(",") > -1 ? "," : " ";
  _cmykStr = _cmykStr.substr(5).split(")")[0].split(sep);
  let cmyk = [
    +_cmykStr[0].substr(0, _cmykStr[0].length - 1),
    +_cmykStr[1].substr(0, _cmykStr[1].length - 1),
    +_cmykStr[2].substr(0, _cmykStr[2].length - 1),
    +_cmykStr[3].substr(0, _cmykStr[2].length - 1),
  ];

  return cmyk;
};

export const convertRgbToCmyk = (_rgbStr) => {
  if (!isRgb(_rgbStr)) {
    return null;
  }

  const _rgbArr = getRgbNumbers(_rgbStr);

  let r = _rgbArr[0] / 255;
  let g = _rgbArr[1] / 255;
  let b = _rgbArr[2] / 255;

  let k = Math.min(1 - r, 1 - g, 1 - b);
  let c = (1 - r - k) / (1 - k) || 0;
  let m = (1 - g - k) / (1 - k) || 0;
  let y = (1 - b - k) / (1 - k) || 0;

  return `cmyk(${c * 100}%, ${m * 100}%, ${y * 100}%, ${k * 100}%)`;
};

export const convertCmykToRgb = (_cmykStr) => {
  if (!isCmyk(_cmykStr)) {
    return null;
  }

  const _cmykArr = getCmykNumbers(_cmykStr);

  let c = _cmykArr[0];
  let m = _cmykArr[1];
  let y = _cmykArr[2];
  let k = _cmykArr[3];

  c = c / 100;
  m = m / 100;
  y = y / 100;
  k = k / 100;

  c = c * (1 - k) + k;
  m = m * (1 - k) + k;
  y = y * (1 - k) + k;

  let r = 1 - c;
  let g = 1 - m;
  let b = 1 - y;

  r = Math.round(255 * r);
  g = Math.round(255 * g);
  b = Math.round(255 * b);

  return `rgb(${r}, ${g}, ${b})`;
};

export const convertRgbToHsl = (_rgbStr) => {
  if (!isRgb(_rgbStr)) {
    return null;
  }

  const _rgbArr = getRgbNumbers(_rgbStr);

  let r = _rgbArr[0] / 255;
  let g = _rgbArr[1] / 255;
  let b = _rgbArr[2] / 255;
  let min = Math.min(r, g, b);
  let max = Math.max(r, g, b);
  let delta = max - min;
  let h;
  let s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  let l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
};

export const convertHslToRgb = (_hslStr) => {
  if (!isHsl(_hslStr)) {
    return null;
  }

  const _hslArr = getHslNumbers(_hslStr);

  let h = _hslArr[0];
  let s = (_hslArr[1] /= 100);
  let l = (_hslArr[2] /= 100);

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `rgb(${r}, ${g}, ${b})`;
};

export const convertRgbToHex = (_rgbStr) => {
  if (!isRgb(_rgbStr)) {
    return null;
  }

  const _rgbArr = getRgbNumbers(_rgbStr);

  let r = _rgbArr[0].toString(16);
  let g = _rgbArr[1].toString(16);
  let b = _rgbArr[2].toString(16);

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  return "#" + r + g + b;
};

export const convertHexToRgb = (_hex) => {
  if (!isHex(_hex)) {
    return null;
  }

  let r = 0,
    g = 0,
    b = 0;

  if (_hex.length === 4) {
    r = "0x" + _hex[1] + _hex[1];
    g = "0x" + _hex[2] + _hex[2];
    b = "0x" + _hex[3] + _hex[3];
  } else if (_hex.length === 7) {
    r = "0x" + _hex[1] + _hex[2];
    g = "0x" + _hex[3] + _hex[4];
    b = "0x" + _hex[5] + _hex[6];
  }

  return `rgb(${+r}, ${+g}, ${+b})`;
};

export const getColorsBetweenRgbColors = (_rgbStr1, _rgbStr2, steps) => {
  if (!isRgb(_rgbStr1) || !isRgb(_rgbStr2) || typeof +steps !== "number") {
    return [];
  }

  if (steps < 1) {
    steps = 0;
  } else {
    steps = steps + 2;
  }

  const interpolateColor = (color1, color2, factor) => {
    if (arguments.length < 3) {
      factor = 0.5;
    }
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  };

  let stepFactor = steps - 1 === 0 ? 1 : 1 / (steps - 1),
    interpolatedColorArray = [];

  _rgbStr1 = _rgbStr1.match(/\d+/g).map(Number);
  _rgbStr2 = _rgbStr2.match(/\d+/g).map(Number);

  for (let i = 0; i < steps; i++) {
    interpolatedColorArray.push(
      interpolateColor(_rgbStr1, _rgbStr2, stepFactor * i)
    );
  }

  return interpolatedColorArray;
};
