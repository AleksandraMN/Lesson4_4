import {Column} from './column';
import {RenderStation} from './renderStation';

export class Station {
  #queue = []; // очередь
  #filling = []; // колонки
  #ready = []; // заправились
  constructor(typeStation, renderApp = null) {
    this.typeStation = typeStation; // тип станции
    this.renderApp = renderApp;
    this.renderStation = null; // рендер станции
  }

  get filling() {
    return this.#filling;
  }

  get queue() {
    return this.#queue;
  }

  setColumns() {
    for (const optionStation of this.typeStation) { // перебор массива разновидностей станций
      if (!optionStation.count) {
        optionStation.count = 1;
      }
      if (!optionStation.speed) {
        optionStation.speed = 5;
      }
      for (let i = 0; i < optionStation.count; i++) { //cоздание колонок на станции
        this.#filling.push(new Column(optionStation.type, optionStation.speed));
      }
    }
  }

  doRender() {
    if (this.renderApp) {
      this.renderStation = new RenderStation(this.renderApp, this);
    }
  }


  init() { // инициализация конструктора(класса)
    this.setColumns();

    this.doRender();

    setInterval(() => { // есть ли в очереди автомобили и своб.колонка
      // console.clear();
      console.log(this);
      this.checkQueueToFilling();
    }, 2000); // каждые 2 секунды
  }

  checkQueueToFilling() { // метод проверки
    if (this.#queue.length) { // если в очереди есть автомобили
      for (let i = 0; i < this.#queue.length; i++) { //перебор очереди автомобилей
        for (let j = 0; j < this.#filling.length; j++) { // перебор колонок
          if (!this.#filling[j].car && // если у колонки нет автомобиля и тип запр. автомобиля в очереди === типу запр.колонки, ставим в очередь автомобиль на эту колонку
            this.#queue[i].typeFuel === this.#filling[j].type) {
            this.#filling[j].car = this.#queue.splice(i, 1)[0]; // выдернуть из очереди автомобиль и отправить на колонку
            this.fillingGo(this.#filling[j]); // на колонке включена заправка
            this.renderStation.renderStation();
            break;
          }
        }
      }
    }
  }


  fillingGo(column) { //колонка заправляет автомобиль
    const car = column.car; // получаем автомобиль
    const needPetrol = car.needPetrol; // сколько топлива требуется автомобилю
    let nowTank = car.nowTank;
    const timerId = setInterval(() => {
      console.log(car.getTitle(), nowTank);
      nowTank += column.speed;
      if (nowTank >= car.maxTank) {
        clearInterval(timerId);
        const total = car.nowTank - needPetrol;
        car.fillUp();
        column.car = null;
        this.leaveClient({car, total});
      }
    }, 1000);
    console.log(`заправляем ${JSON.stringify(column.car)}`);
  }

  leaveClient({car, total}) { // клиент получает заправленный автомобиль
    this.#ready.push(car);
    console.log(car.getTitle(), total); // информация о заправленном автомобиле
    this.renderStation.renderStation();
  }
  addCarQueue(car) { // автомобиль в очереди
    this.#queue.push(car);
    this.renderStation.renderStation();
  }
}

