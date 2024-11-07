import { Dimension } from './Dimension.ts';

export class Sprite {
    #images: HTMLImageElement[];
    #currentImage: HTMLImageElement;
    #frameDuration: number;
    #timeSinceLastFrame: number;
    #size: Dimension;

    constructor(imagePaths: string[], size: Dimension) {
        this.#images = [];
        this.#size = size;

        this.setImagesFromPaths(imagePaths);
    }

    private nextImage(): HTMLImageElement {}

    public nextFrame(deltaTime: number): void {}

    private setImagesFromPaths(imagePaths: string[]): void {
        for (const path of imagePaths) {
            const img = new Image();
            img.src = path;

            img.width = this.#size.width;
            img.height = this.#size.height;

            this.#images.push(img);

            if (!this.#currentImage) this.#currentImage = img;
        }
    }

    get images(): HTMLImageElement[] {
        return this.#images;
    }

    get currentImage(): HTMLImageElement {
        return this.#currentImage;
    }

    get frameDuration(): number {
        return this.#frameDuration;
    }

    get timeSinceLastFrame(): number {
        return this.#timeSinceLastFrame;
    }

    get size(): Dimension {
        return this.#size;
    }
}
