export class GameData {
    #gameAcceleration: number;
    #airObstacleXSpeed: number;
    #airObstacleYSpeed: number;
    #groundObstacleXSpeed: number;
    #groundObstacleYSpeed: number;
    #gravity: number;
    #highestScore: number;
    #currentScore: number;
    #timePassed: number;
    #deltaTime: number;
    static #instance: GameData;

    private constructor() {
        this.#gameAcceleration = 5;
        this.#airObstacleXSpeed = 5;
        this.#airObstacleYSpeed = 8;
        this.#groundObstacleXSpeed = 5;
        this.#groundObstacleYSpeed = 8;
        this.#gravity = 10;
        this.#highestScore = this.getLocalStorageScore();
        this.#currentScore = 0;
        this.#timePassed = 0;
        this.#deltaTime = 0;
    }

    private getLocalStorageScore(): number {
        return Number(localStorage.getItem('h-score')) || 0;
    }

    public setLocalStorageScore(score: number) {
        localStorage.setItem('h-score', String(score));
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
        if (value < 5) return;
        this.#airObstacleXSpeed = value;
    }

    get airObstacleYSpeed(): number {
        return this.#airObstacleYSpeed;
    }

    set airObstacleYSpeed(value: number) {
        this.#airObstacleYSpeed = value;
    }

    get groundObstacleXSpeed(): number {
        return this.#groundObstacleXSpeed;
    }

    set groundObstacleXSpeed(value: number) {
        this.#groundObstacleXSpeed = value;
    }

    get groundObstacleYSpeed(): number {
        return this.#groundObstacleYSpeed;
    }

    set groundObstacleYSpeed(value: number) {
        this.#groundObstacleYSpeed = value;
    }

    get gravity(): number {
        return this.#gravity;
    }

    set gravity(value: number) {
        this.#gravity = value;
    }

    get highestScore(): number {
        return this.#highestScore;
    }

    set highestScore(value: number) {
        this.#highestScore = value;
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
}
