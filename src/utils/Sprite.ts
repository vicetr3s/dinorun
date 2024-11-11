export class Sprite {
    #images: HTMLImageElement[];
    #currentImage: HTMLImageElement;
    #frameDuration: number;
    #timeSinceLastFrame: number;

    constructor(images: HTMLImageElement[], frameDuration: number) {
        this.#images = images;
        this.#frameDuration = frameDuration;
        this.#timeSinceLastFrame = 0;

        this.#currentImage = this.#images[0];
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

    set currentImage(value: HTMLImageElement) {
        this.#currentImage = value;
    }
}
