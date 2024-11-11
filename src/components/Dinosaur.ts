import { Point } from '../utils/Point.ts';
import { Dimension } from '../utils/Dimension.ts';
import { HitBox } from '../utils/HitBox.ts';
import { Sprite } from '../utils/Sprite.ts';
import { Drawable } from '../main/Interfaces.ts';
import { GameData } from '../main/GameData.ts';
import { ImageLoader } from '../utils/ImageLoader.ts';

export abstract class Dinosaur implements Drawable {
    protected _idleSprite: Sprite;
    protected _runSprite: Sprite;
    protected _bendDownSprite: Sprite;
    //protected _deathSprite: Sprite;
    protected _currentSprite: Sprite;
    protected _position: Point;
    protected _size: Dimension;
    protected _sizeMultiplier: number;
    protected _hitBox: HitBox;
    protected _isJumping: boolean;
    protected _isBentDown: boolean;
    protected _velocityY: number;

    public constructor(position: Point, sizeMultiplier: number) {
        this._position = position;
        this._sizeMultiplier = sizeMultiplier;
        this._isJumping = false;
        this._isBentDown = false;
        this._velocityY = 0;

        this.setSpritesFromImageLoader();
    }

    protected constructorPart2() {
        this._currentSprite = this.idleSprite;
        this._size = new Dimension(
            this._currentSprite.currentImage.width * this._sizeMultiplier,
            this._currentSprite.currentImage.height * this._sizeMultiplier,
        );
        if (this._position.y >= GameData.instance.groundLevel) {
            this._position.y -= this._size.height;
            if (this._size.height == 0) this._position.y -= 17 * this._sizeMultiplier;
        }
        this._hitBox = new HitBox(this._position, this._size);
    }

    public draw(): void {
        GameData.instance.canvasContext.drawImage(
            this._currentSprite.currentImage,
            this._position.x,
            this._position.y,
            this._size.width,
            this._size.height,
        );
    }

    public update(): void {
        this._size = new Dimension(
            this._currentSprite.currentImage.width * this._sizeMultiplier,
            this._currentSprite.currentImage.height * this._sizeMultiplier,
        );
        this._hitBox = new HitBox(this._position, this._size);
        if (this._position.y < GameData.instance.groundLevel - this._size.height) this._isJumping = true;
        if (!this.isJumping) return;
        this._velocityY += GameData.instance.gravity * GameData.instance.deltaTime;
        this._position.y += this._velocityY * GameData.instance.deltaTime;

        if (this._position.y >= GameData.instance.groundLevel - this._size.height) {
            this.isJumping = false;
            this._position.y = GameData.instance.groundLevel - this._size.height;
            this._velocityY = 0;
            if (!this._isBentDown) this.run();
        }
    }

    public jump(): void {
        if (this.isJumping) return;
        if (!this._isBentDown) this._currentSprite = this._idleSprite;
        this.isJumping = true;
        this._velocityY = GameData.instance.initialVelocityJump;
    }

    public run(): void {
        this._currentSprite = this.runSprite;
    }

    public idle(): void {
        this._currentSprite = this.idleSprite;
    }

    public die(): void {}

    public bendDown(): void {
        this._currentSprite = this._bendDownSprite;
        this._isBentDown = true;
        if (this._size.height != this._bendDownSprite.currentImage.height * this._sizeMultiplier)
            this._position.y += this._size.height - this._bendDownSprite.currentImage.height * this._sizeMultiplier;
    }

    public standUp(): void {
        this._isBentDown = false;
        this._position.y -= this._runSprite.currentImage.height * this._sizeMultiplier - this._size.height;
        this.run();
    }

    public get idleSprite(): Sprite {
        return this._idleSprite;
    }

    public get runSprite(): Sprite {
        return this._runSprite;
    }

    public get bendDownSprite(): Sprite {
        return this._bendDownSprite;
    }

    private setSpritesFromImageLoader() {
        this._idleSprite = new Sprite(ImageLoader.instance.getImages('dino_idle'), 90);
        this._runSprite = new Sprite(ImageLoader.instance.getImages('dino_run'), 90);
        this._bendDownSprite = new Sprite(ImageLoader.instance.getImages('dino_bend'), 90);
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
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this.constructorPart2();
    }
}

export class ForestDinosaur extends Dinosaur {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this.constructorPart2();
    }
}

export class HellDinosaur extends Dinosaur {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this.constructorPart2();
    }
}
