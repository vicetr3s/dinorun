import { GameData } from './GameData.ts';
import { ComponentFactory } from '../components/Factories.ts';
import { AirObstacle } from '../entities/obstacles/AirObstacles.ts';
import { GroundObstacle } from '../entities/obstacles/GroundObstacles.ts';
import { Background } from '../components/Background.ts';
import { Obstacle } from '../components/Obstacle.ts';
import { Dinosaur } from '../components/Dinosaur.ts';

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

