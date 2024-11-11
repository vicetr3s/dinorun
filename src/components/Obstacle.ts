import { Point } from '../utils/Point.ts';
import { Dimension } from '../utils/Dimension.ts';
import { HitBox } from '../utils/HitBox.ts';
import { Drawable } from '../main/Interfaces.ts';
import { BehaviourStrategy, TraditionalStrategy } from '../main/Behaviours.ts';
import { Sprite } from '../utils/Sprite.ts';
import { GameData } from '../main/GameData.ts';

export interface ObstaclePrototype {
    clone(): Obstacle;
}

export abstract class Obstacle implements ObstaclePrototype, Drawable {
    protected _sprite: Sprite;
    protected _position: Point;
    protected _size: Dimension;
    protected _behaviour: BehaviourStrategy;
    protected _hitBox: HitBox;
    protected _sizeMultiplier: number;
    protected _velocityY: number;

    constructor(point: Point, sizeMultiplier: number) {
        this._position = point;
        this._behaviour = new TraditionalStrategy();
        this._sizeMultiplier = sizeMultiplier;

        this.setSpriteFromImageLoader();
        this._velocityY = 0;
    }

    protected constructorPart2() {
        this._size = new Dimension(
            this._sprite.currentImage.width * this._sizeMultiplier,
            this._sprite.currentImage.height * this._sizeMultiplier,
        );
        if (this._position.y >= GameData.instance.groundLevel) this._position.y -= this._size.height;
        this._hitBox = new HitBox(this._position, this._size);
    }

    abstract clone(): Obstacle;

    public draw(): void {
        GameData.instance.canvasContext.drawImage(
            this._sprite.currentImage,
            this._position.x,
            this._position.y,
            this._size.width,
            this._size.height,
        );
    }

    abstract update(): void;

    public setBehaviour(behaviour: BehaviourStrategy): void {
        this._behaviour = behaviour;
    }

    public get sprite(): Sprite {
        return this._sprite;
    }

    public abstract setSpriteFromImageLoader(): void;

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

    public get behaviour(): BehaviourStrategy {
        return this._behaviour;
    }

    public get hitBox(): HitBox {
        return this._hitBox;
    }

    public set hitBox(value: HitBox) {
        this._hitBox = value;
    }
}
