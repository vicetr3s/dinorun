import { GameData } from './GameData.ts';
import { ComponentFactory } from '../components/Factories.ts';
import { AirObstacle } from '../entities/obstacles/AirObstacles.ts';
import { GroundObstacle } from '../entities/obstacles/GroundObstacles.ts';
import { Background } from '../components/Background.ts';
import { Obstacle } from '../components/Obstacle.ts';
import { Dinosaur } from '../components/Dinosaur.ts';

export class Game {
    #canvas: HTMLCanvasElement;
    #canvasContext: CanvasRenderingContext2D;
    #componentsFactory: ComponentFactory;
    #originalAirObstacle: AirObstacle;
    #originalGroundObstacle: GroundObstacle;
    #background: Background;
    #obstacleList: Obstacle[];
    #dinosaur: Dinosaur;

    public constructor() {
        this.#canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.#canvasContext = <CanvasRenderingContext2D>this.#canvas.getContext('2d');
    }

    public startGame() {
        requestAnimationFrame(this.animate);
    }

    private animate = (timeStamp: DOMHighResTimeStamp) => {
        GameData.instance.deltaTime = Math.floor(timeStamp - GameData.instance.timePassed);
        GameData.instance.timePassed = timeStamp;

        this.clearCanvas();
        this.drawAll();

        requestAnimationFrame(this.animate);
    };

    private drawAll(): void {
    }

    private clearCanvas(): void {
        this.#canvasContext.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }
}
