function makeFriendsList(friends) {
  // ваш код...
  let res = document.createElement('ul');
  for (friend of friends) {
    let li = document.createElement('li');
    li.textContent = `${friend['firstName']} ${friend['lastName']}`;
    res.append(li);
  }
  return res;
}
