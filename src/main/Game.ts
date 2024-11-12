import { GameData } from './GameData.ts';
import { ComponentFactory } from '../components/Factories.ts';
import { AirObstacle } from '../entities/obstacles/AirObstacles.ts';
import { GroundObstacle } from '../entities/obstacles/GroundObstacles.ts';
import { Background } from '../components/Background.ts';
import { Obstacle } from '../components/Obstacle.ts';
import { Dinosaur } from '../components/Dinosaur.ts';
import { BehaviourStrategy, DynamicStrategy, TraditionalStrategy } from './Behaviours.ts';

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
    #gameDataInstance: GameData;
    #isGameStarted: boolean;
    #obstaclesBehaviour: BehaviourStrategy;

    public constructor(factory: ComponentFactory) {
        this.#factory = factory;
        this.#isGameStarted = false;

        this.initializeGame();

        this.jumpUserInput();
        this.bendDownUserInput();
        this.standUpUserInput();
        this.initializeMenuButton();

        document.getElementById('jump-to-start')?.classList.remove('hidden');
    }

    private initializeGame(): void {
        this.#gameDataInstance = GameData.instance;
        this.#canvas = this.#gameDataInstance.canvas;
        this.#canvasContext = this.#gameDataInstance.canvasContext;
        this.#dinosaur = this.#factory.createDinosaur(
            this.#gameDataInstance.dinosaurSpawnPosition,
            this.#gameDataInstance.dinosaurSizeMultiplier,
        );
        this.#background = this.#factory.createBackground();
        this.#originalAirObstacle = this.#factory.createAirObstacle(this.#gameDataInstance.airObstacleSizeMultiplier);
        this.#originalGroundObstacle = this.#factory.createGroundObstacle();
        this.#obstacleList = [];
        this.#isGameOver = false;
        this.#gameDataInstance.highestScoreSpan.innerText = `H ${this.#gameDataInstance.highestScore}`;
        this.#gameDataInstance.currentScoreSpan.innerText = '';

        this.selectRandomObstacleBehaviour();
    }

    public idleGame(): void {
        this.clearCanvas();
        this.drawAll();
        this.nextFrameAll();
    }

    public startGame() {
        this.#animationFrameId = requestAnimationFrame(this.animate);

        this.#dinosaur.idle();
    }

    private runningGame(): void {
        this.clearCanvas();
        this.spawnObstacle();
        this.updateAll();
        this.drawAll();
        this.nextFrameAll();
        this.addScore();
        this.checkObstaclesCollision();
        this.increaseAirObstacleProbability();
        this.decreaseTimeBetweenObstacles();
    }

    private animate = (timeStamp: DOMHighResTimeStamp) => {
        if (this.#isGameOver) return;

        if (this.#gameDataInstance.timePassed === 0) this.#gameDataInstance.timePassed = timeStamp;

        this.#gameDataInstance.deltaTime = timeStamp - this.#gameDataInstance.timePassed;
        this.#gameDataInstance.timePassed = timeStamp;

        if (this.#isGameStarted) {
            this.runningGame();
        } else {
            this.idleGame();
        }

        this.#animationFrameId = requestAnimationFrame(this.animate);
    };

    private updateAll(): void {
        this.#dinosaur.update();
        this.#background.update();
        this.updateObstacles();
        GameData.instance.airObstacleXSpeed += GameData.instance.gameAcceleration * GameData.instance.deltaTime;
        GameData.instance.groundObstacleXSpeed += GameData.instance.gameAcceleration * GameData.instance.deltaTime;
    }

    private drawAll(): void {
        this.#background.draw();
        this.#dinosaur.draw();
        this.drawObstacles();
    }

    private clearCanvas(): void {
        this.#canvasContext.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    private jumpUserInput(): void {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowUp' || e.key === 'Up') {
                if (!this.#isGameStarted) {
                    this.#isGameStarted = true;

                    document.getElementById('jump-to-start')?.classList.add('hidden');
                }

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

    private standUpUserInput(): void {
        document.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'Down') {
                this.#dinosaur.standUp();
            }
        });
    }

    private isObstacleOutOfBounds(obstacle: Obstacle): boolean {
        return obstacle.position.x + obstacle.size.width < 0;
    }

    private addScore(): void {
        this.#gameDataInstance.currentScore +=
            this.#gameDataInstance.deltaTime * this.#gameDataInstance.scoreMultiplier;
        this.#gameDataInstance.currentScoreSpan.innerText = String(Math.floor(this.#gameDataInstance.currentScore));
    }

    private gameOver(): void {
        const gameOverScore = <HTMLElement>document.getElementById('game-over-score');
        this.#isGameOver = true;

        if (this.#gameDataInstance.currentScore > this.#gameDataInstance.highestScore)
            this.#gameDataInstance.setLocalStorageScore(this.#gameDataInstance.currentScore);

        document.getElementById('game-over')?.classList.toggle('hidden');
        gameOverScore.innerText = `Your score: ${Math.floor(this.#gameDataInstance.currentScore)}`;

        this.initializeRestartButton();
    }

    private restartGame(): void {
        document.getElementById('game-over')?.classList.add('hidden');
        document.getElementById('jump-to-start')?.classList.add('hidden');

        if (this.#animationFrameId !== null) {
            cancelAnimationFrame(this.#animationFrameId);
            this.#animationFrameId = null;
        }

        this.#gameDataInstance.initializeNewGameVariables();
        this.initializeGame();
        this.startGame();
    }

    private drawObstacles(): void {
        this.#obstacleList.forEach((obstacle) => {
            obstacle.draw();
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
            this.#gameDataInstance.lastObstacleTimestamp + this.#gameDataInstance.timeBetweenObstacles >
            this.#gameDataInstance.timePassed
        )
            return;

        const obstacle = this.createRandomObstacle();

        this.#obstacleList.push(obstacle);

        this.#gameDataInstance.lastObstacleTimestamp = this.#gameDataInstance.timePassed;
    }

    private createRandomObstacle(): Obstacle {
        if (Math.random() < this.#gameDataInstance.airObstacleGenerationProbability) {
            return this.createAirObstacle();
        }

        return this.createGroundObstacle();
    }

    private nextFrameObstacles(): void {
        this.#obstacleList.forEach((obstacle) => {
            obstacle.sprite.nextFrame(this.#gameDataInstance.deltaTime);
        });
    }

    private nextFrameAll(): void {
        this.#dinosaur.currentSprite.nextFrame(this.#gameDataInstance.deltaTime);
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

    private initializeMenuButton(): void {
        const btn = document.getElementById('menu-btn');

        btn?.classList.toggle('hidden');

        btn?.addEventListener('click', () => this.goToMenu());
    }

    private goToMenu(): void {
        location.reload();
    }

    private increaseAirObstacleProbability(): void {
        if (
            this.#gameDataInstance.airObstacleGenerationProbability >
            this.#gameDataInstance.airObstacleGenerationEndProbability
        ) {
            this.#gameDataInstance.airObstacleGenerationProbability =
                this.#gameDataInstance.airObstacleGenerationStartProbability;
            return;
        }

        this.#gameDataInstance.airObstacleGenerationProbability +=
            this.#gameDataInstance.airObstacleGenerationProbabilityMultiplier * this.#gameDataInstance.deltaTime;
    }

    private decreaseTimeBetweenObstacles(): void {
        if (this.#gameDataInstance.timeBetweenObstacles <= this.#gameDataInstance.endTimeBetweenObstacles) {
            this.#gameDataInstance.timeBetweenObstacles = this.#gameDataInstance.startTimeBetweenObstacles;
            return;
        }

        this.#gameDataInstance.timeBetweenObstacles -=
            this.#gameDataInstance.timeBetweenObstaclesMultiplier * this.#gameDataInstance.deltaTime;
    }

    private initializeRestartButton(): void {
        const restartButton = document.getElementById('restart-btn');

        const handleRestartAndListeners = () => {
            this.restartGame();

            document.removeEventListener('keydown', handleKey);
        };

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowUp' || e.key === 'Up' || e.key === 'Enter') {
                handleRestartAndListeners();
            }
        };

        restartButton?.addEventListener('click', () => {
            handleRestartAndListeners();
        });

        document.addEventListener('keydown', handleKey);
    }

    private selectRandomObstacleBehaviour(): void {
        // 50% chance
        this.#obstaclesBehaviour = Math.random() < 0.5 ? new TraditionalStrategy() : new DynamicStrategy();

        const obstaclesTypeSpan = <HTMLElement>document.getElementById('obstacles-type');

        obstaclesTypeSpan.innerText =
            this.#obstaclesBehaviour instanceof TraditionalStrategy ? 'Traditional obstacles' : 'Dynamic obstacles';

        this.#originalAirObstacle.setBehaviour(this.#obstaclesBehaviour);
        this.#originalGroundObstacle.setBehaviour(this.#obstaclesBehaviour);
    }
}
