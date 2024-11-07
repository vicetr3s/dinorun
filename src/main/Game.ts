import { GameData } from './GameData.ts';
import { ComponentFactory } from '../components/Factories.ts';
import { AirObstacle } from '../entities/obstacles/AirObstacles.ts';
import { GroundObstacle } from '../entities/obstacles/GroundObstacles.ts';
import { Background } from '../components/Background.ts';
import { Obstacle } from '../components/Obstacle.ts';
import { Dinosaur } from '../components/Dinosaur.ts';
import { Point } from '../utils/Point.ts';
import { Dimension } from '../utils/Dimension.ts';

export class Game {
    #canvas: HTMLCanvasElement;
    #canvasContext: CanvasRenderingContext2D;
    #componentsFactory: ComponentFactory;
    #originalAirObstacle: AirObstacle;
    #originalGroundObstacle: GroundObstacle;
    #background: Background;
    #obstacleList: Obstacle[];
    #dinosaur: Dinosaur;

    public constructor(initialPoint: Point, factory: ComponentFactory) {
        this.#canvas = GameData.instance.canvas;
        this.#canvasContext = GameData.instance.canvasContext;
        this.#dinosaur = factory.createDinosaur(initialPoint, new Dimension(50, 100));
        this.#background = factory.createBackground();
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
        this.#background.draw();
        this.#dinosaur.draw();
    }

    private clearCanvas(): void {
        this.#canvasContext.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }
}
