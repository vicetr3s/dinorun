import { GameData } from './GameData.ts';
import { ComponentFactory } from '../components/Factories.ts';
import { AirObstacle} from '../entities/obstacles/AirObstacles.ts';
import { GroundObstacle } from '../entities/obstacles/GroundObstacles.ts';
import { Background } from '../components/Background.ts';
import { Obstacle } from '../components/Obstacle.ts';
import { Dinosaur } from '../components/Dinosaur.ts';
import { BehaviourStrategy, DynamicStrategy, TraditionalStrategy } from './Behaviours.ts';
import { Point } from '../utils/Point.ts';

export class Game {
    #canvas: HTMLCanvasElement;
    #canvasContext: CanvasRenderingContext2D;
    #originalAirObstacle: AirObstacle;
    #originalGroundObstacle: GroundObstacle;
    #background: Background;
    #airObstacleList: Obstacle[];
    #groundObstacleList: Obstacle[];
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

    // Sets up game elements, canvas, obstacles, scores, and initial game state
    private initializeGame(): void {
        this.#gameDataInstance = GameData.instance;
        this.#canvas = this.#gameDataInstance.canvas;
        this.#canvasContext = this.#gameDataInstance.canvasContext;
        this.#dinosaur = this.#factory.createDinosaur(
            this.#gameDataInstance.dinosaurSpawnPosition,
            this.#gameDataInstance.dinosaurSizeMultiplier
        );
        this.#background = this.#factory.createBackground();
        this.#originalAirObstacle = this.#factory.createAirObstacle(new Point(this.#canvas.width, 0), this.#gameDataInstance.airObstacleSizeMultiplier);
        this.#originalGroundObstacle = this.#factory.createGroundObstacle(new Point(this.#canvas.width, this.#gameDataInstance.groundLevel), 1);
        this.#airObstacleList = [];
        this.#groundObstacleList = [];
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

    // Main game loop: clears canvas, spawns obstacles, updates, draws, scores, and checks collisions
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

    // Animation loop: updates game time, runs game or idle state, and requests next frame. Exits if game is over
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

    // Ends the game: updates high score if needed, displays game-over screen with score, and sets up restart button
    private gameOver(): void {
        const gameOverScore = <HTMLElement>document.getElementById('game-over-score');
        this.#isGameOver = true;

        if (this.#gameDataInstance.currentScore > this.#gameDataInstance.highestScore)
            this.#gameDataInstance.setLocalStorageScore(this.#gameDataInstance.currentScore);

        document.getElementById('game-over')?.classList.toggle('hidden');
        gameOverScore.innerText = `Your score: ${Math.floor(this.#gameDataInstance.currentScore)}`;

        this.initializeRestartButton();
    }

    // Restarts the game: hides game-over elements, cancels current animation frame, resets game variables, and reinitializes game
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
        this.#airObstacleList.forEach((obstacle) => {
            obstacle.draw();
        });

        this.#groundObstacleList.forEach((obstacle) => {
            obstacle.draw();
        });
    }

    // Updates and filters out obstacles that are out of bounds for both air and ground obstacles
    private updateObstacles(): void {
        let temp: Obstacle[] = [];

        this.#airObstacleList.forEach((obstacle) => {
            obstacle.update();

            if (this.isObstacleOutOfBounds(obstacle)) return;

            temp.push(obstacle);
        });

        this.#airObstacleList = temp;

        temp = [];

        this.#groundObstacleList.forEach((obstacle) => {
            obstacle.update();

            if (this.isObstacleOutOfBounds(obstacle)) return;

            temp.push(obstacle);
        });

        this.#groundObstacleList = temp;
    }

    private createAirObstacle(): AirObstacle {
        return this.#originalAirObstacle.clone();
    }

    private createGroundObstacle(): GroundObstacle {
        return this.#originalGroundObstacle.clone();
    }

    // Spawns a new obstacle if enough time has passed since the last one
    private spawnObstacle(): void {
        if (
            this.#gameDataInstance.lastObstacleTimestamp + this.#gameDataInstance.timeBetweenObstacles >
            this.#gameDataInstance.timePassed
        )
            return;

        this.createRandomObstacle();

        this.#gameDataInstance.lastObstacleTimestamp = this.#gameDataInstance.timePassed;
    }

    private createRandomObstacle(): void {
        if (Math.random() < this.#gameDataInstance.airObstacleGenerationProbability) {
            const obstacle = this.createAirObstacle();
            this.randomPositionForAirObstacle(obstacle);
            this.#airObstacleList.push(obstacle);
            return;
        }

        const obstacle = this.createGroundObstacle();
        this.randomSizeForGroundObstacle(obstacle);
        this.#groundObstacleList.push(obstacle);
    }

    private nextFrameObstacles(): void {
        this.#airObstacleList.forEach((obstacle) => {
            obstacle.sprite.nextFrame(this.#gameDataInstance.deltaTime);
        });

        this.#groundObstacleList.forEach((obstacle) => {
            obstacle.sprite.nextFrame(this.#gameDataInstance.deltaTime);
        });
    }

    // Advances to the next frame for the dinosaur sprite and obstacles
    private nextFrameAll(): void {
        this.#dinosaur.currentSprite.nextFrame(this.#gameDataInstance.deltaTime);
        this.nextFrameObstacles();
    }

    private isDinosaurHitObstacle(dinosaur: Dinosaur, obstacle: Obstacle): boolean {
        return dinosaur.hitBox.isHit(obstacle.hitBox);
    }

    private checkObstaclesCollision(): void {
        let isHit = false;

        this.#airObstacleList.forEach((obstacle) => {
            isHit = this.isDinosaurHitObstacle(this.#dinosaur, obstacle);
        });

        this.#groundObstacleList.forEach((obstacle) => {
            isHit = this.isDinosaurHitObstacle(this.#dinosaur, obstacle);
        });

        if (isHit) this.gameOver();
    }

    private initializeMenuButton(): void {
        const btn = document.getElementById('menu-btn');

        btn?.classList.toggle('hidden');

        btn?.addEventListener('click', () => this.goToMenu());
    }

    private goToMenu(): void {
        location.reload();
    }

    // Increases the probability of air obstacle generation, resets when a maximum is reached
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

    // Decreases the time between obstacles, resets when a minimum is reached
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

    // Randomly selects obstacle behavior (50% chance) and updates display. Applies selected behavior to air and ground obstacles
    private selectRandomObstacleBehaviour(): void {
        // 50% chance
        this.#obstaclesBehaviour = Math.random() < 0.5 ? new TraditionalStrategy() : new DynamicStrategy();

        const obstaclesTypeSpan = <HTMLElement>document.getElementById('obstacles-type');

        obstaclesTypeSpan.innerText =
            this.#obstaclesBehaviour instanceof TraditionalStrategy ? 'Traditional obstacles' : 'Dynamic obstacles';

        this.#originalAirObstacle.setBehaviour(this.#obstaclesBehaviour);
        this.#originalGroundObstacle.setBehaviour(this.#obstaclesBehaviour);
    }

    private randomPositionForAirObstacle(obstacle: AirObstacle): void {
        const maxY =
            GameData.instance.groundLevel -
            this.#dinosaur.bendDownSprite.currentImage.height * GameData.instance.dinosaurSizeMultiplier -
            obstacle.size.height;
        const minY = GameData.instance.maxHeightAirObstacles;
        obstacle.position.y = Math.random() * (maxY - minY) + minY;
    }

    private randomSizeForGroundObstacle(obstacle: GroundObstacle): void {
        const size =
            Math.random() *
            (GameData.instance.groundObstacleMaxSizeMultiplier -
                GameData.instance.groundObstacleMinSizeMultiplier) +
            GameData.instance.groundObstacleMinSizeMultiplier;
        obstacle.size.width *= size;
        obstacle.size.height *= size;
    }
}
