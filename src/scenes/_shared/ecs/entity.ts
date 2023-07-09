import { Component } from "./component";

export class Entity {
  private _components: Record<string, Component>;

  constructor(public readonly id: string) {
    this._components = {};
  }

  addComponent(component: Component): void {
    this._components[component.componentName] = component;
  }

  removeComponent(componentName: string): void {
    delete this._components[componentName];
  }

  get components(): Component[] {
    return Object.values(this._components);
  }

  getComponent<T extends Component>(componentName: string): T {
    const component = this._components[componentName];
    if (!component) {
      throw new Error(`Component ${componentName} not found on entity.`);
    }

    return component as T;
  }

  hasComponent(key: string): boolean {
    return this._components.hasOwnProperty(key);
  }

  destroy() {
    this._components = null;
  }
}
