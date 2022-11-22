import Player from "@vimeo/player";
import throttle from "lodash.throttle";

// В переменую сохраняем названия ключа в localStorage
const STOREGE_KEY = "videoplayer-current-time";

// адрес плеера в HTML
const iframe = document.querySelector("iframe");
const player = new Player(iframe);

//вешаем слушатель на обновление времени timeupdate и
//делаем обновление времени в хранилещи раз 1 сек. throttle
player.on("timeupdate", throttle(onPlay, 1000));

// сохраняем в localStorage текущее время воспроизведения и
// переводим в строку для localStorage
function onPlay(event) {
  const currentTime = event;
  localStorage.setItem(STOREGE_KEY, JSON.stringify(currentTime));
}

// сохраняем в переменую timeToContinue текущее время воспроизв.
// в parsedTime парсим для работы з даными
// в timeToStart записываем даные в секндах
// в if обнуляем счет времени когда видео посмотриться до конца
const timeToContinue = localStorage.getItem(STOREGE_KEY);
const parsedTime = JSON.parse(timeToContinue);
let timeToStart = parsedTime.seconds;
if (parsedTime.seconds === parsedTime.duration) {
  timeToStart = 0;
}

// метод из библиотеки для воспроизведения по времени сохраненом
// в localStorage
player
  .setCurrentTime(timeToStart)
  .then(function (seconds) {
    seconds = timeToStart;
  })
  .catch(function (error) {
    switch (error.name) {
      case "RangeError":
        break;
      default:
        break;
    }
  });
// ==================================================
