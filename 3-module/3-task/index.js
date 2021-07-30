function camelize(str) {
  // ваш код...
  return str.split('').map((char, i, arr) => {
    if(char == '-') return;
    if(arr[i-1] == '-') return char.toUpperCase();
    return char;
  }).join('');
}