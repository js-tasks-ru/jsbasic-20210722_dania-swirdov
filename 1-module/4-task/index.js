function checkSpam(str) {
  // ваш код...
  if (str.search(/(1xBet)|(XXX)/i) == -1) {return false;}
  else {return true;}
}