import { Obstacle } from '../../components/Obstacle.ts';
import { Point } from '../../utils/Point.ts';
import { Sprite } from '../../utils/Sprite.ts';
import { GameData } from '../../main/GameData.ts';
import { HitBox } from '../../utils/HitBox.ts';
import { DesertComponentFactory, ForestComponentFactory, HellComponentFactory } from '../../components/Factories.ts';

export abstract class AirObstacle extends Obstacle {
    public update(): void {
        this._position.x -= GameData.instance.airObstacleXSpeed;
        if (this._velocityY == 0) {
            if (this._position.y > GameData.instance.groundLevel - this._position.y)
                this._velocityY = this._behaviour.move() * 4;
            else this._velocityY = this._behaviour.move() * -4;
        }
        const decelerate = 0.01;
        if (this._velocityY < 0) {
            this._velocityY += decelerate * GameData.instance.deltaTime;
            if (this._velocityY > 0) this._velocityY = 0;
        } else if (this._velocityY > 0) {
            this._velocityY -= decelerate * GameData.instance.deltaTime;
            if (this._velocityY < 0) this._velocityY = 0;
        }
        this._position.y += this._velocityY;
        if (this._position.y > GameData.instance.groundLevel - this._size.height)
            this._position.y = GameData.instance.groundLevel - this._size.height;
        if (this._position.y < this._size.height) this._position.y = this._size.height;
        this._hitBox = new HitBox(this._position, this._size);
    }
}

export class DesertAirObstacle extends AirObstacle {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this._sprite = new Sprite(
            [
                '/sprites/obstacles/air/desert/pterosaur_1.png',
                '/sprites/obstacles/air/desert/pterosaur_2.png',
                '/sprites/obstacles/air/desert/pterosaur_3.png',
                '/sprites/obstacles/air/desert/pterosaur_4.png',
            ],
            90,
        );
        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new DesertComponentFactory().createAirObstacle(this._sizeMultiplier);
    }
}

export class ForestAirObstacle extends AirObstacle {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this._sprite = new Sprite(
            [
                '/sprites/obstacles/air/forest/pterosaur_1.png',
                '/sprites/obstacles/air/forest/pterosaur_2.png',
                '/sprites/obstacles/air/forest/pterosaur_3.png',
                '/sprites/obstacles/air/forest/pterosaur_4.png',
            ],
            90,
        );
        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new ForestComponentFactory().createAirObstacle(this._sizeMultiplier);
    }
}

export class HellAirObstacle extends AirObstacle {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this._sprite = new Sprite(
            [
                '/sprites/obstacles/air/hell/demon/demon_idle_1.png',
                '/sprites/obstacles/air/hell/demon/demon_idle_2.png',
                '/sprites/obstacles/air/hell/demon/demon_idle_3.png',
                '/sprites/obstacles/air/hell/demon/demon_idle_4.png',
            ],
            90,
        );
        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new HellComponentFactory().createAirObstacle(this._sizeMultiplier);
    }
}
