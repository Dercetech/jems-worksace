export abstract class Component {
  constructor(public readonly componentName: string) {}

  abstract destroy();
}
