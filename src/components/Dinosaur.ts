import { Point } from '../utils/Point.ts';
import { Dimension } from '../utils/Dimension.ts';
import { HitBox } from '../utils/HitBox.ts';
import { Drawable } from '../main/Interfaces.ts';
import { GameData } from '../main/GameData.ts';

export abstract class Dinosaur implements Drawable {
    #idleSprite: Sprite;
    #runSprite: Sprite;
    #bendDownSprite: Sprite;
    //#deathSprite: Sprite;
    #currentSprite: Sprite;
    #position: Point;
    #size: Dimension;
    #hitBox: HitBox;
    #isJumping: boolean;

    public constructor(position: Point, size: Dimension) {
        /*this.#idleSprite = algo;
        this.#runSprite = algo;
        this.#bendDownSprite = algo;
        this.#currentSprite = algo;
         */
        this.#position = position;
        this.#size = size;
        this.#hitBox = new HitBox(this.#position, this.#size);
        this.#isJumping = false;
    }

    abstract draw(): void;

    public jump(): void {

    }
    public run(): void {

    }
    public idle(): void {

    }
    public die(): void {

    }

    public bendDown(): void {

    }

    public get idleSprite(): Sprite {
        return this.#idleSprite;
    }

    public set idleSprite(value: Sprite) {
        this.#idleSprite = value;
    }

    public get runSprite(): Sprite {
        return this.#runSprite;
    }

    public set runSprite(value: Sprite) {
        this.#runSprite = value;
    }

    public get bendDownSprite(): Sprite {
        return this.#bendDownSprite;
    }

    public set bendDownSprite(value: Sprite) {
        this.#bendDownSprite = value;
    }

    public get currentSprite(): Sprite {
        return this.#currentSprite;
    }

    public set currentSprite(value: Sprite) {
        this.#currentSprite = value;
    }

    public get position(): Point {
        return this.#position;
    }

    public set position(value: Point) {
        this.#position = value;
    }

    public get size(): Dimension {
        return this.#size;
    }

    public set size(value: Dimension) {
        this.#size = value;
    }

    public get hitBox(): HitBox {
        return this.#hitBox;
    }

    public set hitBox(value: HitBox) {
        this.#hitBox = value;
    }


    get isJumping(): boolean {
        return this.#isJumping;
    }

    set isJumping(value: boolean) {
        this.#isJumping = value;
    }
}

export class DesertDinosaur extends Dinosaur {
    public draw(): void {
        if (GameData.instance.canvasContext == null) return;
        GameData.instance.canvasContext.fillStyle = 'black';
        GameData.instance.canvasContext.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}

export class ForestDinosaur extends Dinosaur {
    public draw(): void {
        if (GameData.instance.canvasContext == null) return;
        GameData.instance.canvasContext.fillStyle = 'black';
        GameData.instance.canvasContext.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}

export class HellDinosaur extends Dinosaur {
    public draw(): void {
        if (GameData.instance.canvasContext == null) return;
        GameData.instance.canvasContext.fillStyle = 'black';
        GameData.instance.canvasContext.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}