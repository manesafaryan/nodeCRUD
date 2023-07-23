import Joi from "joi";

const nameSchema = Joi.string().min(2).required();
const ageSchema = Joi.number().integer().min(18).max(100).required();
const genderSchema = Joi.string().valid("male", "female", "other").required();

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
    const { error, value } = nameSchema.validate(name);
    if (error) {
      throw new Error("Invalid name: " + error.details[0].message);
    }
    this.name = value;
  }

  getAge() {
    return this.age;
  }

  setAge(age: number) {
    const { error, value } = ageSchema.validate(age);
    if (error) {
      throw new Error("Invalid name: " + error.details[0].message);
    }
    this.age = value;
  }

  setGender(gender: string) {
    const { error, value } = genderSchema.validate(gender);
    if (error) {
      throw new Error("Invalid name: " + error.details[0].message);
    }
    this.gender = value;
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
