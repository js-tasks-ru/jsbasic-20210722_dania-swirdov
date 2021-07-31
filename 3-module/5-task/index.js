function getMinMax(str) {
  // ваш код...
  let res = {min:0, max:0};
  let numbs = str.match(/(-?\d+\.\d+)|(-?[1-9]\d*)/g);
  if (numbs.length != 0) { res.min = +numbs[0]; res.max = +numbs[0]; }
  numbs.forEach(num => {
    if (num < res.min) res.min = +num;
    if (num > res.max) res.max = +num;
  });
  return res;
}