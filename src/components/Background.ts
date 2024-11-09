import { Drawable } from '../main/Interfaces.ts';
import { Sprite } from '../utils/Sprite.ts';
import { GameData } from '../main/GameData.ts';

export abstract class Background implements Drawable {
    frontLayer: Sprite;
    middleLayer: Sprite;
    backLayer: Sprite;
    frontLayerSpeed: number;
    middleLayerSpeed: number;
    backLayerSpeed: number;
    frontLayerX: number;
    middleLayerX: number;
    backLayerX: number;
    frontLayerLevel: number;
    middleLayerLevel: number;
    backLayerLevel: number;

    public constructor() {
        this.frontLayerSpeed = 1;
        this.middleLayerSpeed = 0.5;
        this.backLayerSpeed = 0.25;
        this.frontLayerX = 0;
        this.middleLayerX = 0;
        this.backLayerX = 0;
    }

    update() {
        const canvas = GameData.instance.canvas;
        this.frontLayerSpeed += GameData.instance.gameAcceleration;
        this.middleLayerSpeed += GameData.instance.gameAcceleration;
        this.backLayerSpeed += GameData.instance.gameAcceleration;
        this.frontLayerX -= this.frontLayerSpeed;
        this.middleLayerX -= this.middleLayerSpeed;
        this.backLayerX -= this.backLayerSpeed;

        if (this.frontLayerX <= -canvas.width) {
            this.frontLayerX = 0;
        }
        if (this.middleLayerX <= -canvas.width) {
            this.middleLayerX = 0;
        }
        if (this.backLayerX <= -canvas.width) {
            this.backLayerX = 0;
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

        const gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'orange');
        gradient.addColorStop(0.8, 'orange');
        gradient.addColorStop(1, 'brown');
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(0, GameData.instance.groundLevel, canvas.width, canvas.height);
        canvasContext.strokeStyle = 'black';
        canvasContext.strokeRect(0, GameData.instance.groundLevel, canvas.width, canvas.height);
    }
}
