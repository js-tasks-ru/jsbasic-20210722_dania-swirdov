function sumSalary(salaries) {
  // ваш код...
  let res = 0;
  for (value of Object.values(salaries)) {
    if (typeof value == 'number' && isFinite(value) && !isNaN(value)) res += value; 
  }
  return res;
}
