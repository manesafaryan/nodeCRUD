export default class User {
  modificationTimestamp: null | Date;
  creationTimestamp: Date;
  status: boolean;
  id: String;
  name: String;
  age: Number;
  gender: String;

  constructor(id: String, name: String, age: Number, gender: String) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.status = false;
    this.creationTimestamp = new Date();
    this.modificationTimestamp = null;
  }

  activate() {
    this.status = true;
    this.modificationTimestamp = new Date();
  }

  update(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.modificationTimestamp = new Date();
  }
}
