import { GameData } from './GameData.ts';
import { ComponentFactory } from '../components/Factories.ts';
import { AirObstacle } from '../entities/obstacles/AirObstacles.ts';
import { GroundObstacle } from '../entities/obstacles/GroundObstacles.ts';
import { Background } from '../components/Background.ts';
import { Obstacle } from '../components/Obstacle.ts';
import { Dinosaur } from '../components/Dinosaur.ts';
import { Point } from '../utils/Point.ts';

export class Game {
    #canvas: HTMLCanvasElement;
    #canvasContext: CanvasRenderingContext2D;
    #originalAirObstacle: AirObstacle;
    #originalGroundObstacle: GroundObstacle;
    #background: Background;
    #obstacleList: Obstacle[];
    #dinosaur: Dinosaur;
    #factory: ComponentFactory;
    #isGameOver: boolean;
    #animationFrameId: number | null;

    public constructor(factory: ComponentFactory) {
        this.#factory = factory;
        this.initializeGame();

        this.jumpUserInput();
        this.bendDownUserInput();
    }

    private initializeGame(): void {
        this.#canvas = GameData.instance.canvas;
        this.#canvasContext = GameData.instance.canvasContext;
        this.#dinosaur = this.#factory.createDinosaur(GameData.instance.dinosaurSpawnPosition, 3);
        this.#background = this.#factory.createBackground();
        this.#originalAirObstacle = this.#factory.createAirObstacle(new Point(0, GameData.instance.groundLevel), 3);
        this.#originalGroundObstacle = this.#factory.createGroundObstacle(
            new Point(0, GameData.instance.groundLevel),
            3,
        );
        this.#obstacleList = [];
        this.#isGameOver = false;

        GameData.instance.highestScoreSpan.innerText = `H ${GameData.instance.highestScore}`;
    }

    public startGame() {
        this.#animationFrameId = requestAnimationFrame(this.animate);

        this.#dinosaur.run();
    }

    private animate = (timeStamp: DOMHighResTimeStamp) => {
        if (this.#isGameOver) return;

        if (GameData.instance.timePassed === 0) GameData.instance.timePassed = timeStamp;

        GameData.instance.deltaTime = timeStamp - GameData.instance.timePassed;
        GameData.instance.timePassed = timeStamp;

        this.spawnObstacle();
        this.clearCanvas();
        this.updateAll();
        this.drawAll();
        this.nextFrameAll();
        this.addScore();
        this.checkObstaclesCollision();

        this.#animationFrameId = requestAnimationFrame(this.animate);
    };

    private updateAll(): void {
        this.#dinosaur.update();
        this.#background.update();
        this.updateObstacles();
    }

    private drawAll(): void {
        this.#background.draw();
        this.#dinosaur.draw();
        this.#dinosaur.hitBox.draw();
        this.drawObstacles();
    }

    private clearCanvas(): void {
        this.#canvasContext.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    private jumpUserInput(): void {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowUp' || e.key === 'Up') {
                this.#dinosaur.jump();
            }
        });
    }

    private bendDownUserInput(): void {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'Down') {
                this.#dinosaur.bendDown();
            }
        });
    }

    private isObstacleOutOfBounds(obstacle: Obstacle): boolean {
        return obstacle.position.x + obstacle.size.width < 0;
    }

    private addScore(): void {
        GameData.instance.currentScore += GameData.instance.deltaTime * GameData.instance.scoreMultiplier;
        GameData.instance.currentScoreSpan.innerText = String(Math.floor(GameData.instance.currentScore));
    }

    private gameOver(): void {
        this.#isGameOver = true;

        if (GameData.instance.currentScore > GameData.instance.highestScore)
            GameData.instance.setLocalStorageScore(GameData.instance.currentScore);

        const gameOverSection = document.getElementById('game-over');
        const restartButton = document.getElementById('restart-btn');

        gameOverSection?.classList.toggle('hidden');
        restartButton?.addEventListener('click', () => this.restartGame());
    }

    private restartGame(): void {
        const gameOverSection = document.getElementById('game-over');

        gameOverSection?.classList.add('hidden');

        if (this.#animationFrameId !== null) {
            cancelAnimationFrame(this.#animationFrameId);
            this.#animationFrameId = null;
        }

        GameData.instance.initializeNewGameVariables();
        this.initializeGame();
        this.startGame();
    }

    private drawObstacles(): void {
        this.#obstacleList.forEach((obstacle) => {
            obstacle.draw();
            obstacle.hitBox.draw();
        });
    }

    private updateObstacles(): void {
        const temp: Obstacle[] = [];

        this.#obstacleList.forEach((obstacle) => {
            obstacle.update();

            if (this.isObstacleOutOfBounds(obstacle)) return;

            temp.push(obstacle);
        });

        this.#obstacleList = temp;
    }

    private createAirObstacle(): AirObstacle {
        return this.#originalAirObstacle.clone();
    }

    private createGroundObstacle(): GroundObstacle {
        return this.#originalGroundObstacle.clone();
    }

    private spawnObstacle(): void {
        if (
            GameData.instance.lastObstacleTimestamp + GameData.instance.timeBetweenObstacles >
            GameData.instance.timePassed
        )
            return;

        const obstacle = this.createRandomObstacle();

        obstacle.position.x = GameData.instance.canvas.width;

        this.#obstacleList.push(obstacle);

        GameData.instance.lastObstacleTimestamp = GameData.instance.timePassed;
    }

    private createRandomObstacle(): Obstacle {
        if (Math.random() < GameData.instance.airObstacleGenerationProbability) {
            return this.createAirObstacle();
        }

        return this.createGroundObstacle();
    }

    private nextFrameObstacles(): void {
        this.#obstacleList.forEach((obstacle) => {
            obstacle.sprite.nextFrame(GameData.instance.deltaTime);
        });
    }

    private nextFrameAll(): void {
        this.#dinosaur.currentSprite.nextFrame(GameData.instance.deltaTime);
        this.nextFrameObstacles();
    }

    private isDinosaurHitObstacle(dinosaur: Dinosaur, obstacle: Obstacle): boolean {
        return dinosaur.hitBox.isHit(obstacle.hitBox);
    }

    private checkObstaclesCollision(): void {
        this.#obstacleList.forEach((obstacle) => {
            const isHit = this.isDinosaurHitObstacle(this.#dinosaur, obstacle);

            if (isHit) this.gameOver();
        });
    }
}
