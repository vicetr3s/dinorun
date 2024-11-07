import { Point } from '../utils/Point.ts';
import { Dimension } from '../utils/Dimension.ts';
import { HitBox } from '../utils/HitBox.ts';

export class Dinosaur {
    private _idleSprite: Sprite;
    private _runSprite: Sprite;
    private _bendDownSprite: Sprite;
    //private _deathSprite: Sprite;
    private _currentSprite: Sprite;
    private _position: Point;
    private _size: Dimension;
    private _hitBox: HitBox;

    constructor(idleSprite: Sprite, runSprite: Sprite, bendDownSprite: Sprite, currentSprite: Sprite, position: Point, size: Dimension) {
        this._idleSprite = idleSprite;
        this._runSprite = runSprite;
        this._bendDownSprite = bendDownSprite;
        this._currentSprite = currentSprite;
        this._position = position;
        this._size = size;
        this._hitBox = new HitBox(this._position, this._size);
    }

    public jump(): void {

    }
    public run(): void {

    }
    public idle(): void {

    }
    public die(): void {

    }

    public get idleSprite(): Sprite {
        return this._idleSprite;
    }

    public set idleSprite(value: Sprite) {
        this._idleSprite = value;
    }

    public get runSprite(): Sprite {
        return this._runSprite;
    }

    public set runSprite(value: Sprite) {
        this._runSprite = value;
    }

    public get bendDownSprite(): Sprite {
        return this._bendDownSprite;
    }

    public set bendDownSprite(value: Sprite) {
        this._bendDownSprite = value;
    }

    public get currentSprite(): Sprite {
        return this._currentSprite;
    }

    public set currentSprite(value: Sprite) {
        this._currentSprite = value;
    }

    public get position(): Point {
        return this._position;
    }

    public set position(value: Point) {
        this._position = value;
    }

    public get size(): Dimension {
        return this._size;
    }

    public set size(value: Dimension) {
        this._size = value;
    }

    public get hitBox(): HitBox {
        return this._hitBox;
    }

    public set hitBox(value: HitBox) {
        this._hitBox = value;
    }
}