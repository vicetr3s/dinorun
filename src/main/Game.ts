import { GameData } from './GameData.ts';

export class Game {
    private canvas: HTMLCanvasElement | null;
    private canvasContext: CanvasRenderingContext2D | null;
    private componentsFactory: ComponentFactory;
    private originalAirObstacle: AirObstacle;
    private originalGroundObstacle: GroundObstacle;
    private background: Background;
    private obstacleList: Obstacle[];
    private dinosaur: Dinosaur;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvasContext = this.canvas.getContext('2d');
    }
}

