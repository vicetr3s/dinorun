import { Obstacle } from '../../components/Obstacle.ts';
import { Point } from '../../utils/Point.ts';
import { Sprite } from '../../utils/Sprite.ts';
import { GameData } from '../../main/GameData.ts';

export abstract class GroundObstacle extends Obstacle {
    public update(): void {
        if (this._position.x < 0) {
            this._position.x = -1;
            return;
        }
        GameData.instance.groundObstacleXSpeed += GameData.instance.gameAcceleration;
        this._position.x -= GameData.instance.groundObstacleXSpeed;
    }
}

export class DesertGroundObstacle extends GroundObstacle {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this._sprite = new Sprite(
            [
                '/sprites/obstacles/ground/desert/cactus.png'
            ],
            90
        );
        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new DesertGroundObstacle(new Point(this._position.x, this._position.y), this._sizeMultiplier);
    }
}

export class ForestGroundObstacle extends GroundObstacle {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this._sprite = new Sprite(
            [
                '/sprites/obstacles/ground/tree_trunk.png'
            ],
            90
        );
        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new ForestGroundObstacle(new Point(this._position.x, this._position.y), this._sizeMultiplier);
    }
}

export class HellGroundObstacle extends GroundObstacle {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this._sprite = new Sprite(
            [
                '/sprites/obstacles/ground/hell/hand/malefic_hand_1.png',
                '/sprites/obstacles/ground/hell/hand/malefic_hand_2.png'
            ],
            90
        );
        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new HellGroundObstacle(new Point(this._position.x, this._position.y), this._sizeMultiplier);
    }
}
