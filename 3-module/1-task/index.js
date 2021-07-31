function namify(users) {
  // ваш код...
  let res = [];
  for (user of users) {
    if (user.hasOwnProperty('name')) res.push(user.name);
  }
  return res;
}
