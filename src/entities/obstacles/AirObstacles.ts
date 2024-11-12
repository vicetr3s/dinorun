import { Obstacle } from '../../components/Obstacle.ts';
import { Point } from '../../utils/Point.ts';
import { Sprite } from '../../utils/Sprite.ts';
import { GameData } from '../../main/GameData.ts';
import { HitBox } from '../../utils/HitBox.ts';
import { DesertComponentFactory, ForestComponentFactory, HellComponentFactory } from '../../components/Factories.ts';
import { ImageLoader } from '../../utils/ImageLoader.ts';
import { BehaviourStrategy } from '../../main/Behaviours.ts';

export abstract class AirObstacle extends Obstacle {
    public update(): void {
        this._position.x -= GameData.instance.airObstacleXSpeed * GameData.instance.deltaTime;
        if (this._velocityY == 0) {
            if (this._position.y > GameData.instance.groundLevel - this._position.y)
                this._velocityY = this._behaviour.move();
            else this._velocityY = this._behaviour.move() * -1;
        }
        const decelerate = 0.00001;
        if (this._velocityY < 0) {
            this._velocityY += decelerate * GameData.instance.deltaTime;
            if (this._velocityY > 0) this._velocityY = 0;
        } else if (this._velocityY > 0) {
            this._velocityY -= decelerate * GameData.instance.deltaTime;
            if (this._velocityY < 0) this._velocityY = 0;
        }
        this._position.y += this._velocityY * GameData.instance.deltaTime;
        if (this._position.y > GameData.instance.groundLevel - this._size.height)
            this._position.y = GameData.instance.groundLevel - this._size.height;
        if (this._position.y < this._size.height) this._position.y = this._size.height;
        this._hitBox = new HitBox(this._position, this._size);
    }

    public setSpriteFromImageLoader() {
        this._sprite = new Sprite(ImageLoader.instance.getImages('air_obst'), 90);
    }
}

export class DesertAirObstacle extends AirObstacle {
    public constructor(point: Point, sizeMultiplier: number, behaviour?: BehaviourStrategy) {
        super(point, sizeMultiplier, behaviour);

        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new DesertAirObstacle(new Point(this._position.x, this._position.y), this._sizeMultiplier, this._behaviour);
    }
}

export class ForestAirObstacle extends AirObstacle {
    public constructor(point: Point, sizeMultiplier: number, behaviour?: BehaviourStrategy) {
        super(point, sizeMultiplier, behaviour);

        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new ForestAirObstacle(new Point(this._position.x, this._position.y), this._sizeMultiplier, this._behaviour);
    }
}

export class HellAirObstacle extends AirObstacle {
    public constructor(point: Point, sizeMultiplier: number, behaviour?: BehaviourStrategy) {
        super(point, sizeMultiplier, behaviour);

        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new HellAirObstacle(new Point(this._position.x, this._position.y), this._sizeMultiplier, this._behaviour);
    }
}
