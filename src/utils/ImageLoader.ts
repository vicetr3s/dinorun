import { ImagePaths } from '../components/ImagePaths.ts';

export class ImageLoader {
    static #instance: ImageLoader;
    #images: Record<string, HTMLImageElement[]>;
    #imagePaths: ImagePaths;

    private constructor() {
        this.#images = {};
    }

    static get instance(): ImageLoader {
        if (!this.#instance) {
            ImageLoader.#instance = new ImageLoader();
        }

        return this.#instance;
    }

    public async preloadImages(): Promise<void> {
        const allImages = [
            { key: 'dino_idle', paths: this.#imagePaths._dinosaurIdleImagePaths },
            { key: 'dino_run', paths: this.#imagePaths._dinosaurRunImagePaths },
            { key: 'dino_bend', paths: this.#imagePaths._dinosaurBendDownImagePaths },
            { key: 'air_obst', paths: this.#imagePaths._airObstacleImagePaths },
            { key: 'ground_obst', paths: this.#imagePaths._groundObstacleImagePaths },
            { key: 'background', paths: this.#imagePaths._backgroundImagePaths },
        ];

        for (const { key, paths } of allImages) {
            this.#images[key] = await this.loadImages(paths);
        }
    }

    private loadImages(paths: string[]): Promise<HTMLImageElement[]> {
        return Promise.all(
            paths.map((path) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = path;

                    // Wait for image to load and decode
                    img.onload = async () => {
                        try {
                            await img.decode();
                            resolve(img);
                        } catch (error) {
                            reject(error);
                        }
                    };

                    img.onerror = reject;
                });
            }),
        );
    }

    public getImages(key: string): HTMLImageElement[] {
        return this.#images[key];
    }

    public setImagePaths(imagePaths: ImagePaths) {
        this.#imagePaths = imagePaths;
    }
}
