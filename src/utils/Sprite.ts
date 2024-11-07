import { Dimension } from './Dimension.ts';

export class Sprite {
    #images: HTMLImageElement[];
    #currentImage: HTMLImageElement;
    #frameDuration: number;
    #timeSinceLastFrame: number;
    #size: Dimension;

    constructor(imagePaths: string[], size: Dimension, frameDuration: number) {
        this.#images = [];
        this.#size = size;
        this.#frameDuration = frameDuration;
        this.#timeSinceLastFrame = 0;

        this.setImagesFromPaths(imagePaths);
    }

    private nextImage(): void {
        const currentIndex = this.#images.indexOf(this.#currentImage);

        const newIndex = (currentIndex + 1) % this.#images.length;

        this.#currentImage = this.#images[newIndex];
    }

    public nextFrame(deltaTime: number): void {
        this.#timeSinceLastFrame += deltaTime;

        if (this.#timeSinceLastFrame < this.#frameDuration) return;

        this.nextImage();
        this.#timeSinceLastFrame = 0;
    }

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

    set currentImage(value: HTMLImageElement) {
        this.#currentImage = value;
    }
}
