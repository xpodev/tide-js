module Utilities {
    class BaseElement extends HTMLElement { }

    export function areOfType<T>(obj: any[], cls: Constructor<T>, raiseError: boolean = false): boolean {
        for (const value of obj) {
            if (value instanceof cls || value.prototype instanceof cls || toString.call(value) == '[object ' + cls.name + ']') {

            } else if (raiseError) {
                throw new TypeError(`Member '${value}' in '${obj}' is not valid '${cls.name}'`);
            } else {
                return false;
            }
        }
        return true;
    }

    export function isOfType<T>(obj: any, cls: Constructor<T>, raiseError: boolean = false): boolean {
        if (obj instanceof cls || obj.prototype instanceof cls || toString.call(obj) == '[object ' + cls.name + ']') {
            return true;
        } else if (raiseError) {
            throw new TypeError(`'${obj}' is not valid '${cls.name}'`);
        }
        return false;
    }

    export function defineCustomObject(tagName: string, elementClass: any = BaseElement) {
        if (!(typeof elementClass == "function")) {
            throw new TypeError(`'${elementClass.name}' is not a class`);
        }
        if (!(elementClass.prototype instanceof HTMLElement)) {
            throw new TypeError(`'${elementClass.name}' does not derive from HTMLElement`);
        }
        if (elementClass === BaseElement) {
            elementClass = class extends BaseElement { };
        }
        customElements.define(tagName.toLowerCase(), elementClass);
    }

    export type Constructor<T> = { new(...args: any[]): T };
}

export default Utilities;

