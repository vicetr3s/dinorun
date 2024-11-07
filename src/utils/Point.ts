export class Point {
    #x: number;
    #y: number;

    constructor(x: number, y: number) {
        this.#x = x;
        this.#y = y;
    }

    get x(): number {
        return this.#x;
    }

    set x(value: number) {
        this.#x = value;
    }

    get y(): number {
        return this.#y;
    }

    set y(value: number) {
        this.#y = value;
    }
}