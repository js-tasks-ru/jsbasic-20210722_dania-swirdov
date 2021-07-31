function showSalary(users, age) {
  // ваш код...
  let res = '';
  users.filter((user) => user.hasOwnProperty('age') && user.hasOwnProperty('balance') && user.age <= age).forEach((user, i, arr) => {
    res += `${user.name}, ${user.balance}`;
    if (i != arr.length - 1) res += '\n' ;
  });
  return res;
}
