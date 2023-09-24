export default class StaggerGenerator {
  constructor(private count: number = 0) {}

  next() {
    return "--stagger:" + this.count++;
  }

  custom(value: number) {
    return "--stagger:" + value;
  }
}
