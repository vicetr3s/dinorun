import { Point } from '../utils/Point.ts';

export class GameData {
    #canvas: HTMLCanvasElement;
    #canvasContext: CanvasRenderingContext2D;
    #gameAcceleration: number;
    #airObstacleXSpeed: number;
    #groundObstacleXSpeed: number;
    #gravity: number;
    #scoreMultiplier: number;
    #highestScore: number;
    #currentScore: number;
    #timePassed: number;
    #deltaTime: number;
    static #instance: GameData;
    #currentScoreSpan: HTMLElement;
    #highestScoreSpan: HTMLElement;
    #groundLevel: number;
    #airObstacleGenerationProbability: number;
    #timeBetweenObstacles: number;
    #lastObstacleTimestamp: number;
    #dinosaurSpawnPosition: Point;
    #dinosaurSizeMultiplier: number;
    #groundObstacleMinSizeMultiplier: number;
    #groundObstacleMaxSizeMultiplier: number;
    #airObstacleSizeMultiplier: number;
    #maxHeightAirObstacles: number;
    #airObstaclesYAxisDeceleration: number;
    #probabilityForAnObstacleToMove: number;
    #probabilityForAGroundObstacleToMove: number;
    #obstacleMinSpeedY: number;
    #obstacleMaxSpeedY: number;
    #airObstacleGenerationStartProbability: number;
    #airObstacleGenerationEndProbability: number;
    #airObstacleGenerationProbabilityMultiplier: number;
    #initialVelocityJump: number;
    #hitBoxShrink: number;
    #startTimeBetweenObstacles: number;
    #endTimeBetweenObstacles: number;
    #timeBetweenObstaclesMultiplier: number;

    private constructor() {
        this.#gameAcceleration = 0.000002;
        this.#gravity = 0.00098;
        this.#scoreMultiplier = 0.005;
        this.#canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.#canvasContext = <CanvasRenderingContext2D>this.#canvas.getContext('2d');
        this.#highestScoreSpan = <HTMLElement>document.getElementById('highest-score');
        this.#currentScoreSpan = <HTMLElement>document.getElementById('current-score');
        this.#groundLevel = 300;
        this.#dinosaurSpawnPosition = new Point(50, this.#groundLevel);
        this.#dinosaurSizeMultiplier = 3;
        this.#groundObstacleMinSizeMultiplier = 1.5;
        this.#groundObstacleMaxSizeMultiplier = 2.5;
        this.#airObstacleSizeMultiplier = 2;
        this.#maxHeightAirObstacles = 100;
        this.#initialVelocityJump = -0.5;
        this.#airObstaclesYAxisDeceleration = 0.00001;
        this.#obstacleMinSpeedY = 0.5;
        this.#obstacleMaxSpeedY = 1;
        this.#hitBoxShrink = 6;
        this.#probabilityForAnObstacleToMove = 0.1;
        this.#probabilityForAGroundObstacleToMove = 0.2;

        this.configureCanvas();
        this.initializeNewGameVariables();
    }

    // Resets game variables to their initial values for a new game
    public initializeNewGameVariables(): void {
        this.#airObstacleXSpeed = 0.4;
        this.#groundObstacleXSpeed = 0.25;
        this.#highestScore = this.getLocalStorageScore();
        this.#lastObstacleTimestamp = 0;
        this.#airObstacleGenerationStartProbability = 0.1;
        this.#airObstacleGenerationEndProbability = 0.7;
        this.#airObstacleGenerationProbability = 0.1;
        this.#airObstacleGenerationProbabilityMultiplier = 0.00001;
        this.#currentScore = 0;
        this.#timePassed = 0;
        this.#deltaTime = 0;
        this.#timeBetweenObstacles = 2000;
        this.#startTimeBetweenObstacles = 1500;
        this.#endTimeBetweenObstacles = 750;
        this.#timeBetweenObstaclesMultiplier = 0.01;
    }

    private configureCanvas(): void {
        this.canvasContext.imageSmoothingEnabled = false;
    }

    private getLocalStorageScore(): number {
        return Number(localStorage.getItem('h-score')) || 0;
    }

    // Saves the highest score to localStorage
    public setLocalStorageScore(score: number) {
        localStorage.setItem('h-score', String(Math.floor(score)));
    }

    get gameAcceleration(): number {
        return this.#gameAcceleration;
    }

    set gameAcceleration(value: number) {
        this.#gameAcceleration = value;
    }

    get airObstacleXSpeed(): number {
        return this.#airObstacleXSpeed;
    }

    set airObstacleXSpeed(value: number) {
        this.#airObstacleXSpeed = value;
    }

    get groundObstacleXSpeed(): number {
        return this.#groundObstacleXSpeed;
    }

    set groundObstacleXSpeed(value: number) {
        this.#groundObstacleXSpeed = value;
    }

    get gravity(): number {
        return this.#gravity;
    }

    get highestScore(): number {
        return this.#highestScore;
    }

    get currentScore(): number {
        return this.#currentScore;
    }

    set currentScore(value: number) {
        this.#currentScore = value;
    }

    get timePassed(): number {
        return this.#timePassed;
    }

    set timePassed(value: number) {
        this.#timePassed = value;
    }

    static get instance(): GameData {
        if (!GameData.#instance) {
            GameData.#instance = new GameData();
        }

        return GameData.#instance;
    }

    get deltaTime(): number {
        return this.#deltaTime;
    }

    set deltaTime(value: number) {
        this.#deltaTime = value;
    }

    get canvas(): HTMLCanvasElement {
        return this.#canvas;
    }

    get canvasContext(): CanvasRenderingContext2D {
        return this.#canvasContext;
    }

    get scoreMultiplier(): number {
        return this.#scoreMultiplier;
    }

    get currentScoreSpan(): HTMLElement {
        return this.#currentScoreSpan;
    }

    get highestScoreSpan(): HTMLElement {
        return this.#highestScoreSpan;
    }

    get groundLevel(): number {
        return this.#groundLevel;
    }

    get airObstacleGenerationProbability(): number {
        return this.#airObstacleGenerationProbability;
    }

    get timeBetweenObstacles(): number {
        return this.#timeBetweenObstacles;
    }

    get lastObstacleTimestamp(): number {
        return this.#lastObstacleTimestamp;
    }

    set lastObstacleTimestamp(value: number) {
        this.#lastObstacleTimestamp = value;
    }

    get dinosaurSpawnPosition(): Point {
        return this.#dinosaurSpawnPosition;
    }

    get dinosaurSizeMultiplier(): number {
        return this.#dinosaurSizeMultiplier;
    }

    get groundObstacleMinSizeMultiplier(): number {
        return this.#groundObstacleMinSizeMultiplier;
    }

    get groundObstacleMaxSizeMultiplier(): number {
        return this.#groundObstacleMaxSizeMultiplier;
    }

    get airObstacleSizeMultiplier(): number {
        return this.#airObstacleSizeMultiplier;
    }

    get maxHeightAirObstacles(): number {
        return this.#maxHeightAirObstacles;
    }

    get airObstacleGenerationStartProbability(): number {
        return this.#airObstacleGenerationStartProbability;
    }

    get airObstacleGenerationEndProbability(): number {
        return this.#airObstacleGenerationEndProbability;
    }

    get airObstacleGenerationProbabilityMultiplier(): number {
        return this.#airObstacleGenerationProbabilityMultiplier;
    }

    set airObstacleGenerationProbability(value: number) {
        this.#airObstacleGenerationProbability = value;
    }

    get initialVelocityJump(): number {
        return this.#initialVelocityJump;
    }

    get airObstaclesYAxisDeceleration(): number {
        return this.#airObstaclesYAxisDeceleration;
    }

    get obstacleMinSpeedY(): number {
        return this.#obstacleMinSpeedY;
    }

    get obstacleMaxSpeedY(): number {
        return this.#obstacleMaxSpeedY;
    }

    get hitBoxShrink(): number {
        return this.#hitBoxShrink;
    }

    get probabilityForAnObstacleToMove(): number {
        return this.#probabilityForAnObstacleToMove;
    }

    get probabilityForAGroundObstacleToMove(): number {
        return this.#probabilityForAGroundObstacleToMove;
    }

    set timeBetweenObstacles(value: number) {
        this.#timeBetweenObstacles = value;
    }

    get startTimeBetweenObstacles(): number {
        return this.#startTimeBetweenObstacles;
    }

    get endTimeBetweenObstacles(): number {
        return this.#endTimeBetweenObstacles;
    }

    get timeBetweenObstaclesMultiplier(): number {
        return this.#timeBetweenObstaclesMultiplier;
    }
}
