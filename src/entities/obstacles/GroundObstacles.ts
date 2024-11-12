import { Obstacle } from '../../components/Obstacle.ts';
import { Point } from '../../utils/Point.ts';
import { Sprite } from '../../utils/Sprite.ts';
import { GameData } from '../../main/GameData.ts';
import { HitBox } from '../../utils/HitBox.ts';
import { ImageLoader } from '../../utils/ImageLoader.ts';

export abstract class GroundObstacle extends Obstacle {
    public update(): void {
        // The obstacle moves to the left
        this._position.x -= GameData.instance.groundObstacleXSpeed * GameData.instance.deltaTime;

        // Only when the obstacle is on the ground it can jump
        if (this._position.y == GameData.instance.groundLevel - this._size.height) {
            if (this._velocityY == 0 && Math.random() < GameData.instance.probabilityForAGroundObstacleToMove)
                this._velocityY = this._behaviour.move() * -1; // adds a 20% chance that it jumps
        }

        // Applied gravity to the obstacle
        this._velocityY += GameData.instance.gravity * GameData.instance.deltaTime;
        this._position.y += this._velocityY * GameData.instance.deltaTime;

        // The obstacle does not pass the ground
        if (this._position.y >= GameData.instance.groundLevel - this._size.height) {
            this._position.y = GameData.instance.groundLevel - this._size.height;
            this._velocityY = 0;
        }
        // Changed the hit box because of the movement
        this._hitBox = new HitBox(this._position, this._size);
    }

    public setSpriteFromImageLoader() {
        this._sprite = new Sprite(ImageLoader.instance.getImages('ground_obst'), 250);
    }
}

export class DesertGroundObstacle extends GroundObstacle {
    public clone(): Obstacle {
        return new DesertGroundObstacle(
            new Point(this._position.x, this._position.y),
            this._sizeMultiplier,
            this._behaviour,
        );
    }
}

export class ForestGroundObstacle extends GroundObstacle {
    public clone(): Obstacle {
        return new ForestGroundObstacle(
            new Point(this._position.x, this._position.y),
            this._sizeMultiplier,
            this._behaviour,
        );
    }
}

export class HellGroundObstacle extends GroundObstacle {
    public clone(): Obstacle {
        return new HellGroundObstacle(
            new Point(this._position.x, this._position.y),
            this._sizeMultiplier,
            this._behaviour,
        );
    }
}
