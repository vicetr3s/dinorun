import { Background } from './Background.ts';
import {
    AirObstacle,
    DesertAirObstacle,
    ForestAirObstacle,
    HellAirObstacle,
} from '../entities/obstacles/AirObstacles.ts';
import { ForestBackground } from '../entities/backgrounds/ForestBackground.ts';
import { DesertBackground } from '../entities/backgrounds/DesertBackground.ts';
import { HellBackground } from '../entities/backgrounds/HellBackground.ts';
import { DesertDinosaur, Dinosaur, ForestDinosaur, HellDinosaur } from './Dinosaur.ts';
import { Point } from '../utils/Point.ts';
import {
    DesertGroundObstacle,
    ForestGroundObstacle,
    GroundObstacle,
    HellGroundObstacle,
} from '../entities/obstacles/GroundObstacles.ts';
import { GameData } from '../main/GameData.ts';
import { DesertImagePaths, ForestImagePaths, HellImagePaths, ImagePaths } from './ImagePaths.ts';
import { BehaviourStrategy } from '../main/Behaviours.ts';

export interface ComponentFactory {
    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur;

    createGroundObstacle(): GroundObstacle;

    createAirObstacle(sizeMultiplier: number): AirObstacle;

    createBackground(): Background;

    createImagePaths(): ImagePaths;
}

export class DesertComponentFactory implements ComponentFactory {
    protected dinosaurBentDown: HTMLImageElement;

    public constructor() {
        this.dinosaurBentDown = new Image();
        this.dinosaurBentDown.src = '/sprites/dinosaurs/desert/bend/bend_1.png';
    }

    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur {
        return new DesertDinosaur(new Point(point.x, point.y), sizeMultiplier);
    }

    createGroundObstacle(behaviour?: BehaviourStrategy): GroundObstacle {
        const size =
            Math.random() *
                (GameData.instance.groundObstacleMaxSizeMultiplier -
                    GameData.instance.groundObstacleMinSizeMultiplier) +
            GameData.instance.groundObstacleMinSizeMultiplier;
        return new DesertGroundObstacle(
            new Point(GameData.instance.canvas.width, GameData.instance.groundLevel),
            size,
            behaviour,
        );
    }

    createAirObstacle(sizeMultiplier: number, behaviour?: BehaviourStrategy): AirObstacle {
        const obstacle = new DesertAirObstacle(new Point(GameData.instance.canvas.width, 0), sizeMultiplier, behaviour);
        const maxY =
            GameData.instance.groundLevel -
            this.dinosaurBentDown.height * GameData.instance.dinosaurSizeMultiplier -
            obstacle.size.height;
        const minY = GameData.instance.maxHeightAirObstacles;
        obstacle.position.y = Math.random() * (maxY - minY) + minY;
        return obstacle;
    }

    createBackground(): Background {
        return new DesertBackground();
    }

    createImagePaths(): ImagePaths {
        return new DesertImagePaths();
    }
}

export class ForestComponentFactory implements ComponentFactory {
    protected dinosaurBentDown: HTMLImageElement;

    public constructor() {
        this.dinosaurBentDown = new Image();
        this.dinosaurBentDown.src = '/sprites/dinosaurs/forest/bend/bend_1.png';
    }

    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur {
        return new ForestDinosaur(point, sizeMultiplier);
    }

    createGroundObstacle(behaviour?: BehaviourStrategy): GroundObstacle {
        const size =
            Math.random() *
                (GameData.instance.groundObstacleMaxSizeMultiplier -
                    GameData.instance.groundObstacleMinSizeMultiplier) +
            GameData.instance.groundObstacleMinSizeMultiplier;
        return new ForestGroundObstacle(
            new Point(GameData.instance.canvas.width, GameData.instance.groundLevel),
            size * 0.75,
            behaviour,
        );
    }

    createAirObstacle(sizeMultiplier: number, behaviour?: BehaviourStrategy): AirObstacle {
        const obstacle = new ForestAirObstacle(new Point(GameData.instance.canvas.width, 0), sizeMultiplier, behaviour);
        const maxY =
            GameData.instance.groundLevel -
            this.dinosaurBentDown.height * GameData.instance.dinosaurSizeMultiplier -
            obstacle.size.height;
        const minY = GameData.instance.maxHeightAirObstacles;
        obstacle.position.y = Math.random() * (maxY - minY) + minY;
        return obstacle;
    }

    createBackground(): Background {
        return new ForestBackground();
    }

    createImagePaths(): ImagePaths {
        return new ForestImagePaths();
    }
}

export class HellComponentFactory implements ComponentFactory {
    protected dinosaurBentDown: HTMLImageElement;

    public constructor() {
        this.dinosaurBentDown = new Image();
        this.dinosaurBentDown.src = '/sprites/dinosaurs/hell/bend/bend_1.png';
    }

    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur {
        return new HellDinosaur(point, sizeMultiplier);
    }

    createGroundObstacle(behaviour?: BehaviourStrategy): GroundObstacle {
        const size =
            Math.random() *
                (GameData.instance.groundObstacleMaxSizeMultiplier -
                    GameData.instance.groundObstacleMinSizeMultiplier) +
            GameData.instance.groundObstacleMinSizeMultiplier;
        return new HellGroundObstacle(
            new Point(GameData.instance.canvas.width, GameData.instance.groundLevel),
            size * 1.35,
            behaviour,
        );
    }

    createAirObstacle(sizeMultiplier: number, behaviour?: BehaviourStrategy): AirObstacle {
        const obstacle = new HellAirObstacle(new Point(GameData.instance.canvas.width, 0), sizeMultiplier, behaviour);
        const maxY =
            GameData.instance.groundLevel -
            this.dinosaurBentDown.height * GameData.instance.dinosaurSizeMultiplier -
            obstacle.size.height;
        const minY = GameData.instance.maxHeightAirObstacles;
        obstacle.position.y = Math.random() * (maxY - minY) + minY;
        return obstacle;
    }

    createBackground(): Background {
        return new HellBackground();
    }

    createImagePaths(): ImagePaths {
        return new HellImagePaths();
    }
}
