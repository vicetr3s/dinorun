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

    public constructor() {
        this.frontLayerSpeed = 2;
        this.middleLayerSpeed = 1;
        this.backLayerSpeed = 0.5;
        this.frontLayerX = 0;
        this.middleLayerX = 0;
        this.backLayerX = 0;
    }

    update() {
        const canvas = GameData.instance.canvas;
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
        canvasContext.drawImage(this.backLayer.currentImage, this.backLayerX, 0, canvas.width, canvas.height);
        canvasContext.drawImage(
            this.backLayer.currentImage,
            this.backLayerX + canvas.width,
            0,
            canvas.width,
            canvas.height,
        );
        canvasContext.drawImage(this.middleLayer.currentImage, this.middleLayerX, 50, canvas.width, canvas.height);
        canvasContext.drawImage(
            this.middleLayer.currentImage,
            this.middleLayerX + canvas.width,
            50,
            canvas.width,
            canvas.height,
        );
        canvasContext.drawImage(this.frontLayer.currentImage, this.frontLayerX, 80, canvas.width, canvas.height);
        canvasContext.drawImage(
            this.frontLayer.currentImage,
            this.frontLayerX + canvas.width,
            80,
            canvas.width,
            canvas.height,
        );

        const gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'orange');
        gradient.addColorStop(0.8, 'orange');
        gradient.addColorStop(1, 'brown');
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(0, 300, canvas.width, canvas.height);
        canvasContext.strokeStyle = 'black';
        canvasContext.strokeRect(0, 300, canvas.width, canvas.height);
    }
}
