import { Point } from '../utils/Point.ts';
import { Dimension } from '../utils/Dimension.ts';
import { HitBox } from '../utils/HitBox.ts';
import { Sprite } from '../utils/Sprite.ts';
import { Drawable, Movable } from '../main/Interfaces.ts';
import { GameData } from '../main/GameData.ts';

export abstract class Dinosaur implements Drawable {
    protected _idleSprite: Sprite;
    protected _runSprite: Sprite;
    protected _bendDownSprite: Sprite;
    //protected _deathSprite: Sprite;
    protected _currentSprite: Sprite;
    protected _position: Point;
    protected _size: Dimension;
    protected _hitBox: HitBox;
    protected _isJumping: boolean;
    protected _velocityY: number;

    public constructor(position: Point, size: Dimension) {
        this._position = position;
        this._size = size;
        this._hitBox = new HitBox(this._position, this._size);
        this._isJumping = false;
        this._velocityY = 0;
    }

    public draw(): void {
        GameData.instance.canvasContext.drawImage(
            this.currentSprite.currentImage,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height,
        );
    }

    public update(): void {
        if (!this.isJumping) return;
        this._velocityY += GameData.instance.gravity;
        this._position.y += this._velocityY;

        if (this._position.y >= GameData.instance.groundLevelForDinosaur) {
            this.isJumping = false;
            this._position.y = GameData.instance.groundLevelForDinosaur;
            this._velocityY = 0;
        }
    }

    public jump(): void {
        if (this.isJumping) return;
        this._currentSprite = this._idleSprite;
        this.isJumping = true;
        this._velocityY = -6; // Initial jump velocity
    }

    public run(): void {}

    public idle(): void {}

    public die(): void {}

    public bendDown(): void {}

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

    get isJumping(): boolean {
        return this._isJumping;
    }

    set isJumping(value: boolean) {
        this._isJumping = value;
    }
}

export class DesertDinosaur extends Dinosaur {
    public constructor(point: Point, size: Dimension) {
        super(point, size);
        this._idleSprite = new Sprite(
            [
                '/sprites/dinosaurs/desert/idle/idle_1.png',
                '/sprites/dinosaurs/desert/idle/idle_2.png',
                '/sprites/dinosaurs/desert/idle/idle_3.png',
                '/sprites/dinosaurs/desert/idle/idle_4.png',
            ],
            90,
        );
        this._runSprite = new Sprite(
            [
                '/sprites/dinosaurs/desert/run/run_1.png',
                '/sprites/dinosaurs/desert/run/run_2.png',
                '/sprites/dinosaurs/desert/run/run_3.png',
                '/sprites/dinosaurs/desert/run/run_4.png',
            ],
            9,
        );
        this.currentSprite = this.idleSprite;
    }
}

export class ForestDinosaur extends Dinosaur {
    public constructor(point: Point, size: Dimension) {
        super(point, size);
        this._idleSprite = new Sprite(
            [
                '/sprites/dinosaurs/forest/idle/idle_1.png',
                '/sprites/dinosaurs/forest/idle/idle_2.png',
                '/sprites/dinosaurs/forest/idle/idle_3.png',
                '/sprites/dinosaurs/forest/idle/idle_4.png',
            ],
            90,
        );
        this._runSprite = new Sprite(
            [
                '/sprites/dinosaurs/forest/run/run_1.png',
                '/sprites/dinosaurs/forest/run/run_2.png',
                '/sprites/dinosaurs/forest/run/run_3.png',
                '/sprites/dinosaurs/forest/run/run_4.png',
                '/sprites/dinosaurs/forest/run/run_5.png',
                '/sprites/dinosaurs/forest/run/run_6.png',
            ],
            9,
        );
        this.currentSprite = this.idleSprite;
    }
}

export class HellDinosaur extends Dinosaur {
    public constructor(point: Point, size: Dimension) {
        super(point, size);
        this._idleSprite = new Sprite(
            [
                '/sprites/dinosaurs/hell/idle/idle_1.png',
                '/sprites/dinosaurs/hell/idle/idle_2.png',
                '/sprites/dinosaurs/hell/idle/idle_3.png',
                '/sprites/dinosaurs/hell/idle/idle_4.png',
            ],
            90,
        );
        this._runSprite = new Sprite(
            [
                '/sprites/dinosaurs/hell/run/run_1.png',
                '/sprites/dinosaurs/hell/run/run_2.png',
                '/sprites/dinosaurs/hell/run/run_3.png',
                '/sprites/dinosaurs/hell/run/run_4.png',
                '/sprites/dinosaurs/hell/run/run_5.png',
                '/sprites/dinosaurs/hell/run/run_6.png',
            ],
            9,
        );
        this.currentSprite = this.idleSprite;
    }
}
