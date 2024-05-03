export class Car {
  #maxTank;
  constructor(brand, model, maxTank) {
    // const proto = Object.getPrototypeOf(this);
    // if (proto.constructor === Car) {
    //  throw new Error('Abstract class');
    // }

    this.brand = brand;
    this.model = model;
    this.#maxTank = maxTank;
    this.nowTank = Math.floor(Math.random() * maxTank);
  }

  getTitle() {
    return `${this.brand} ${this.model}`;
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  get needPetrol() {
    return this.#maxTank - this.nowTank;
  }

  fillUp() {
    this.nowTank = this.#maxTank;
    return this;
  }

  get maxTank() {
    return this.#maxTank;
  }
  static string = 'Новый автомобиль';

  static logger(str) {
    console.log(str);
  }

  static from({brand, model, maxTank}) {
    const car = new Car(brand, model, maxTank);
    Car.logger(Car.string + car.getTitle());
    return car;
  }
  /*
  set maxTank(data) {
    console.log(`Нельзя поменять значение на ${data}`);
  }
  */
}

export const opel = new Car('Opel', 'Crossland', 45);

const bmw = Car.from({
  brand: 'BMW',
  model: 'X7',
  maxTank: 80,
});

console.log(bmw);

export class PassangerCar extends Car {
  // typeCar = 'passanger';
  constructor(brand, model, maxTank, typeFuel = 'petrol') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
    this.typeCar = 'passanger';
  }

  getTitle() {
    return `Автомобиль ${this.brand} ${this.model}`;
  }
}


export class Truck extends Car {
  // typeCar = 'Truck';
  constructor(brand, model, maxTank, typeFuel = 'diesel') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
    this.typeCar = 'Truck';
  }

  getTitle() {
    return `Грузовик ${this.brand} ${this.model}`;
  }
}


