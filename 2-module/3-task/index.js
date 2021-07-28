let calculator = {
  // ваш код
  read: (a, b) => {this.a = a; this.b = b;},
  sum: (a, b) => this.a + this.b,
  mul: (a, b) => this.a * this.b
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
