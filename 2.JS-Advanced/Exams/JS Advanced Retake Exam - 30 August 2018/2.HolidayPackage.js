let assert = require('chai').assert;

class HolidayPackage {
  constructor(destination, season) {
    this.vacationers = [];
    this.destination = destination;
    this.season = season;
    this.insuranceIncluded = false; // Default value
  }

  showVacationers() {
    if (this.vacationers.length > 0)
      return "Vacationers:\n" + this.vacationers.join("\n");
    else
      return "No vacationers are added yet";
  }

  addVacationer(vacationerName) {
    if (typeof vacationerName !== "string" || vacationerName === ' ') {
      throw new Error("Vacationer name must be a non-empty string");
    }
    if (vacationerName.split(" ").length !== 2) {
      throw new Error("Name must consist of first name and last name");
    }
    this.vacationers.push(vacationerName);
  }

  get insuranceIncluded() {
    return this._insuranceIncluded;
  }

  set insuranceIncluded(insurance) {
    if (typeof insurance !== 'boolean') {
      throw new Error("Insurance status must be a boolean");
    }
    this._insuranceIncluded = insurance;
  }

  generateHolidayPackage() {
    if (this.vacationers.length < 1) {
      throw new Error("There must be at least 1 vacationer added");
    }
    let totalPrice = this.vacationers.length * 400;

    if (this.season === "Summer" || this.season === "Winter") {
      totalPrice += 200;
    }

    totalPrice += this.insuranceIncluded === true ? 100 : 0;

    return "Holiday Package Generated\n" +
      "Destination: " + this.destination + "\n" +
      this.showVacationers() + "\n" +
      "Price: " + totalPrice;
  }
}

describe('unit testing', function () {
  let holidayPackage;
  beforeEach(function () { holidayPackage = new HolidayPackage('Italy', 'Summer') });

  it('Must be instantiated with two parameters – a string destination and a string season.', function () {
    assert.instanceOf(holidayPackage, HolidayPackage);
    assert.isObject(holidayPackage);
  });

  it('insuranceIncluded', function () {
    assert.throws(function () { holidayPackage.insuranceIncluded = '' }, 'Insurance status must be a boolean');
    assert.isBoolean(holidayPackage.insuranceIncluded);
    assert.equal(holidayPackage.insuranceIncluded, false);
    holidayPackage.insuranceIncluded = true;
    assert.equal(holidayPackage.insuranceIncluded, true);
  });

  it('showVacationers()', function () {
    assert.equal(holidayPackage.showVacationers(), "No vacationers are added yet");
    holidayPackage.addVacationer('Pesho Peshov');
    holidayPackage.addVacationer('Gosho Goshov');
    assert.equal(holidayPackage.showVacationers(), 'Vacationers:\nPesho Peshov\nGosho Goshov');
  });

  it('addVacationer()', function () {
    assert.throws(function () { holidayPackage.addVacationer(5) }, 'Vacationer name must be a non-empty string');
    assert.throws(function () { holidayPackage.addVacationer(' ') }, 'Vacationer name must be a non-empty string');//???????? ' ' || ''
    assert.throws(function () { holidayPackage.addVacationer('pesho') }, 'Name must consist of first name and last name');
    assert.throws(function () { holidayPackage.addVacationer('pesho pesho pesho') }, 'Name must consist of first name and last name');
    holidayPackage.addVacationer('pesho peshov');
    assert.deepEqual(holidayPackage.vacationers, ['pesho peshov']);
  });

  it('generateHolidayPackage()', function () {
    assert.throws(function () { holidayPackage.generateHolidayPackage() }, 'There must be at least 1 vacationer added');
    holidayPackage.addVacationer('pesho peshov');
    holidayPackage.addVacationer('gosho goshov');
    assert.equal(holidayPackage.generateHolidayPackage(), 'Holiday Package Generated\nDestination: Italy\nVacationers:\npesho peshov\ngosho goshov\nPrice: 1000');
    holidayPackage.insuranceIncluded = true;
    assert.equal(holidayPackage.generateHolidayPackage(), 'Holiday Package Generated\nDestination: Italy\nVacationers:\npesho peshov\ngosho goshov\nPrice: 1100');
  });
});