function ucFirst(str) {
  // ваш код...
  let res = str.split("");
  if (str) {
    res[0] = res[0].toUpperCase();
    return res.join('');
  } else {
    return '';
  }
  
}