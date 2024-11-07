export class Dimension {
    #width: number;
    #height: number;

    constructor(width: number, height: number) {
        this.#width = width;
        this.#height = height;
    }

    get width(): number {
        return this.#width;
    }

    set width(value: number) {
        this.#width = value;
    }

    get height(): number {
        return this.#height;
    }

    set height(value: number) {
        this.#height = value;
    }
}
