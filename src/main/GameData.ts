export class GameData {
    private _gameAcceleration: number;
    private _airObstacleXSpeed: number;
    private _airObstacleYSpeed: number;
    private _groundObstacleXSpeed: number;
    private _groundObstacleYSpeed: number;
    private _gravity: number;
    private _highestScore: number;
    private _currentScore: number;
    private _timePassed: number;
    private static _instance: GameData;

    private constructor() {
        this._gameAcceleration = 5;
        this._airObstacleXSpeed = 5;
        this._airObstacleYSpeed = 8;
        this._groundObstacleXSpeed = 5;
        this._groundObstacleYSpeed = 8;
        this._gravity = 10;
        this._highestScore = this.getLocalStorageScore();
        this._currentScore = 0;
        this._timePassed = 0;
    }

    private getLocalStorageScore(): number {
        return Number(localStorage.getItem('h-score')) || 0;
    }

    public setLocalStorageScore(score: number) {
        localStorage.setItem('h-score', String(score));
    }

    get gameAcceleration(): number {
        return this._gameAcceleration;
    }

    set gameAcceleration(value: number) {
        this._gameAcceleration = value;
    }

    get airObstacleXSpeed(): number {
        return this._airObstacleXSpeed;
    }

    set airObstacleXSpeed(value: number) {
        if (value < 5) return;
        this._airObstacleXSpeed = value;
    }

    get airObstacleYSpeed(): number {
        return this._airObstacleYSpeed;
    }

    set airObstacleYSpeed(value: number) {
        this._airObstacleYSpeed = value;
    }

    get groundObstacleXSpeed(): number {
        return this._groundObstacleXSpeed;
    }

    set groundObstacleXSpeed(value: number) {
        this._groundObstacleXSpeed = value;
    }

    get groundObstacleYSpeed(): number {
        return this._groundObstacleYSpeed;
    }

    set groundObstacleYSpeed(value: number) {
        this._groundObstacleYSpeed = value;
    }

    get gravity(): number {
        return this._gravity;
    }

    set gravity(value: number) {
        this._gravity = value;
    }

    get highestScore(): number {
        return this._highestScore;
    }

    set highestScore(value: number) {
        this._highestScore = value;
    }

    get currentScore(): number {
        return this._currentScore;
    }

    set currentScore(value: number) {
        this._currentScore = value;
    }

    get timePassed(): number {
        return this._timePassed;
    }

    set timePassed(value: number) {
        this._timePassed = value;
    }

    static get instance(): GameData {
        if (!GameData._instance) {
            GameData._instance = new GameData();
        }

        return GameData._instance;
    }

    static set instance(value: GameData) {
        this._instance = value;
    }
}
