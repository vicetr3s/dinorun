import { Obstacle } from '../../components/Obstacle.ts';
import { Point } from '../../utils/Point.ts';
import { Sprite } from '../../utils/Sprite.ts';
import { GameData } from '../../main/GameData.ts';
import { HitBox } from '../../utils/HitBox.ts';
import { DesertComponentFactory, ForestComponentFactory, HellComponentFactory } from '../../components/Factories.ts';

export abstract class GroundObstacle extends Obstacle {
    public update(): void {
        this._position.x -= GameData.instance.groundObstacleXSpeed;
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
        return new DesertComponentFactory().createGroundObstacle(this._sizeMultiplier);
    }
}

export class ForestGroundObstacle extends GroundObstacle {
    public constructor(point: Point, sizeMultiplier: number) {
        super(point, sizeMultiplier);
        this._sprite = new Sprite(['/sprites/obstacles/ground/forest/tree_trunk.png'], 90);
        this.constructorPart2();
    }

    public clone(): Obstacle {
        return new ForestComponentFactory().createGroundObstacle(this._sizeMultiplier);
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
        return new HellComponentFactory().createGroundObstacle(this._sizeMultiplier);
    }
}
