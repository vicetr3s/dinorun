import { Point } from '../utils/Point.ts';
import { Dimension } from '../utils/Dimension.ts';
import { HitBox } from '../utils/HitBox.ts';
import { Drawable } from '../main/Interfaces.ts';
import { BehaviourStrategy, TraditionalStrategy } from '../main/Behaviours.ts';

export interface ObstacleProtoype {
    clone(): Obstacle;
}

export abstract class Obstacle implements ObstacleProtoype, Drawable {
    private _sprite: Sprite;
    private _position: Point;
    private _size: Dimension;
    private _behaviour: BehaviourStrategy;
    private _hitBox: HitBox;

    constructor(sprite: Sprite, point: Point, size: Dimension, hitBox: HitBox) {
        this._sprite = sprite;
        this._position = point;
        this._size = size;
        this._behaviour = new TraditionalStrategy();
        this._hitBox = hitBox;
    }

    clone(): Obstacle {
        return this;
    }

    draw(): void {}

    public setBehaviour(behaviour: BehaviourStrategy): void {
        this._behaviour = behaviour;
    }

    public get sprite(): Sprite {
        return this._sprite;
    }

    public set sprite(value: Sprite) {
        this._sprite = value;
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
