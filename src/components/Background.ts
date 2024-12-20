import { Drawable } from '../main/Interfaces.ts';
import { Sprite } from '../utils/Sprite.ts';
import { GameData } from '../main/GameData.ts';
import { ImageLoader } from '../utils/ImageLoader.ts';

export abstract class Background implements Drawable {
    frontLayer: Sprite;
    middleLayer: Sprite;
    backLayer: Sprite;
    ground: Sprite;
    frontLayerSpeed: number;
    middleLayerSpeed: number;
    backLayerSpeed: number;
    frontLayerX: number;
    middleLayerX: number;
    backLayerX: number;
    groundX: number;
    frontLayerLevel: number;
    middleLayerLevel: number;
    backLayerLevel: number;

    public constructor() {
        this.frontLayerSpeed = 0.2;
        this.middleLayerSpeed = 0.1;
        this.backLayerSpeed = 0.05;
        this.frontLayerX = 0;
        this.middleLayerX = 0;
        this.backLayerX = 0;
        this.groundX = 0;

        this.setSpritesFromImageLoader();
    }

    update() {
        const canvas = GameData.instance.canvas;
        this.frontLayerSpeed += GameData.instance.gameAcceleration * GameData.instance.deltaTime;
        this.middleLayerSpeed += GameData.instance.gameAcceleration * GameData.instance.deltaTime;
        this.backLayerSpeed += GameData.instance.gameAcceleration * GameData.instance.deltaTime;
        this.frontLayerX -= this.frontLayerSpeed * GameData.instance.deltaTime;
        this.middleLayerX -= this.middleLayerSpeed * GameData.instance.deltaTime;
        this.backLayerX -= this.backLayerSpeed * GameData.instance.deltaTime;
        this.groundX -= GameData.instance.groundObstacleXSpeed * GameData.instance.deltaTime;

        if (this.frontLayerX <= -canvas.width) {
            this.frontLayerX = 0;
        }
        if (this.middleLayerX <= -canvas.width) {
            this.middleLayerX = 0;
        }
        if (this.backLayerX <= -canvas.width) {
            this.backLayerX = 0;
        }

        if (this.groundX <= -canvas.width) {
            this.groundX = 0;
        }
    }

    public draw(): void {
        const canvas = GameData.instance.canvas;
        const canvasContext = GameData.instance.canvasContext;
        canvasContext.drawImage(
            this.backLayer.currentImage,
            this.backLayerX,
            this.backLayerLevel,
            canvas.width,
            canvas.height,
        );
        canvasContext.drawImage(
            this.backLayer.currentImage,
            this.backLayerX + canvas.width,
            this.backLayerLevel,
            canvas.width,
            canvas.height,
        );
        canvasContext.drawImage(
            this.middleLayer.currentImage,
            this.middleLayerX,
            this.middleLayerLevel,
            canvas.width,
            canvas.height,
        );
        canvasContext.drawImage(
            this.middleLayer.currentImage,
            this.middleLayerX + canvas.width,
            this.middleLayerLevel,
            canvas.width,
            canvas.height,
        );
        canvasContext.drawImage(
            this.frontLayer.currentImage,
            this.frontLayerX,
            this.frontLayerLevel,
            canvas.width,
            canvas.height,
        );
        canvasContext.drawImage(
            this.frontLayer.currentImage,
            this.frontLayerX + canvas.width,
            this.frontLayerLevel,
            canvas.width,
            canvas.height,
        );

        canvasContext.drawImage(
            this.ground.currentImage,
            this.groundX,
            GameData.instance.groundLevel,
            canvas.width,
            canvas.height,
        );

        canvasContext.drawImage(
            this.ground.currentImage,
            this.groundX + canvas.width,
            GameData.instance.groundLevel,
            canvas.width,
            canvas.height,
        );
    }

    private setSpritesFromImageLoader(): void {
        this.backLayer = new Sprite([ImageLoader.instance.getImages('background')[0]], 0);
        this.middleLayer = new Sprite([ImageLoader.instance.getImages('background')[1]], 0);
        this.frontLayer = new Sprite([ImageLoader.instance.getImages('background')[2]], 0);
        this.ground = new Sprite([ImageLoader.instance.getImages('background')[3]], 0);
    }
}
