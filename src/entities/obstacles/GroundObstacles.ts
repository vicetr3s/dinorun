import { Obstacle } from '../../components/Obstacle.ts';
import { Point } from '../../utils/Point.ts';
import { Sprite } from '../../utils/Sprite.ts';
import { GameData } from '../../main/GameData.ts';
import { HitBox } from '../../utils/HitBox.ts';
import { DesertComponentFactory, ForestComponentFactory, HellComponentFactory } from '../../components/Factories.ts';

export abstract class GroundObstacle extends Obstacle {
    public update(): void {
        this._position.x -= GameData.instance.groundObstacleXSpeed;

        if (this._position.y == GameData.instance.groundLevel - this._size.height) {
            if (this._velocityY == 0 && Math.random() < 0.1) this._velocityY = this._behaviour.move() * -1; // adds a 10% chance that it jumps
        }

        this._velocityY += GameData.instance.gravity * GameData.instance.deltaTime;
        this._position.y += this._velocityY * GameData.instance.deltaTime;

        if (this._position.y >= GameData.instance.groundLevel - this._size.height) {
            this._position.y = GameData.instance.groundLevel - this._size.height;
            this._velocityY = 0;
        }
        this._hitBox = new HitBox(this._position, this._size);
    }
}

export class DesertGroundObstacle extends GroundObstacle {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this._sprite = new Sprite(['/sprites/obstacles/ground/desert/cactus.png'], 90);
        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new DesertComponentFactory().createGroundObstacle();
    }
}

export class ForestGroundObstacle extends GroundObstacle {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this._sprite = new Sprite(['/sprites/obstacles/ground/forest/tree_trunk.png'], 90);
        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new ForestComponentFactory().createGroundObstacle();
    }
}

export class HellGroundObstacle extends GroundObstacle {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this._sprite = new Sprite(
            [
                '/sprites/obstacles/ground/hell/hand/malefic_hand_1.png',
                '/sprites/obstacles/ground/hell/hand/malefic_hand_2.png',
            ],
            90,
        );
        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new HellComponentFactory().createGroundObstacle();
    }
}
