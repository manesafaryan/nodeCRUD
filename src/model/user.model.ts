export class User {
  //region Properties
  private modificationTimestamp: null | Date = null;
  private creationTimestamp: Date | null = null;
  private status: boolean | null = null;
  private name: string | null = null;
  private age: number | null = null;
  private gender: string | null = null;
  //endregion

  constructor() {}

  //region Getters, Setters
  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getAge() {
    return this.age;
  }

  setAge(age: number) {
    this.age = age;
  }

  setGender(gender: string) {
    this.gender = gender;
  }

  getGender() {
    return this.gender;
  }

  setStatus(status: boolean) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  setModificationTimestamp(modificationTimestamp: Date) {
    this.modificationTimestamp = modificationTimestamp;
  }
  //endregion
}
