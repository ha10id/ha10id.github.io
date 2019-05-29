var myCards = document.getElementById('container');
var resultsArray = [];
var counter = 0;
var text = document.getElementById('text');
var seconds = 0;
var tens = 0;
var tries = 0;
var Tens = document.getElementById("tens");
var Seconds = document.getElementById("seconds");
var buttonPause = document.getElementById('button-pause');

var Interval;
// набор картинок
var images = ['1', '2', '3', '4', '5', '6', '7', '8'];

var clone = images.slice(0); // дублируем
var cards = images.concat(clone); // и объеденяем

// функция замешивания карт
function Mixer(objs) {
  for (var j, x, i = objs.length; i; j = Math.floor(Math.random() * i), x = objs[--i], objs[i] = objs[j], objs[j] = x) ;
  return objs;
}

// смешаем карты
Mixer(cards)

// создадим объекты card и привяжем к ним
// событие по клику
for (var i = 0; i < cards.length; i++) {
  card = document.createElement('div');
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  myCards.appendChild(card);

  card.onclick = function () {
    if (this.className != 'flipped' && this.className != 'correct') {
      this.className = 'flipped';
      // сохраняем нажатую карту
      var result = this.dataset.item;
      resultsArray.push(result);
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
    }
    // если это вторая открываемая карта
    if (resultsArray.length > 1) {
      // и она такая же как и сохраненная
      if (resultsArray[0] === resultsArray[1]) {
        /* установим для пары класс correct и
           увеличим счетчик найденных пар */
        check("correct");
        counter++;
        win();
        resultsArray = [];
        // если нет, вернем обратно класс reverse
      } else {
        check("reverse");
        resultsArray = [];
      }
    }
  }

}
;

window.onload = function () {
  /* инициализация после загрузки страницы */
  span = document.getElementById('triesid');
  var tries = 0;
  span.innerHTML = tries;

  document.body.onclick = function (e) {
    e = e || event;
    var target = e.target || e.srcElement;
    if (target.className != 'flipped') return;
    tries++;
    span.innerHTML = Math.floor(tries / 2);
  }
}

// функция устанавливает для елементов класса flipped
// указанный во входящем параметре класс
var check = function (className) {
  var x = document.getElementsByClassName("flipped");

  setTimeout(function () {

    for (var i = (x.length - 1); i >= 0; i--) {
      x[i].className = className;
    }

  }, 500);

}
// тестируем победу
var win = function () {
  if (counter === 8) {
    clearInterval(Interval);
    text.innerHTML = "Счет: " + (5000 - (seconds + tries));
    setTimeout(function () {
      alert("Вы выиграли \nСчет: " + (5000 - (seconds + tries)));}, 700);
  }

}

// кнопка ПАУЗА
buttonPause.onclick = function () {
  win();
  clearInterval(Interval);
}

// игровое время
function startTimer() {
  tens++;

  if (tens < 9) {
    Tens.innerHTML = "0" + tens;
  }

  if (tens > 9) {
    Tens.innerHTML = tens;

  }

  if (tens > 99) {
    seconds++;
    Seconds.innerHTML = "0" + seconds;
    tens = 0;
    Tens.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    Seconds.innerHTML = seconds;
  }

}
