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
import { DesertImagePaths, ForestImagePaths, HellImagePaths, ImagePaths } from './ImagePaths.ts';
import { BehaviourStrategy } from '../main/Behaviours.ts';

export interface ComponentFactory {
    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur;

    createGroundObstacle(point: Point, sizeMultiplier: number, behaviour?: BehaviourStrategy): GroundObstacle;

    createAirObstacle(point: Point, sizeMultiplier: number, behaviour?: BehaviourStrategy): AirObstacle;

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

    createGroundObstacle(point: Point, sizeMultiplier: number, behaviour?: BehaviourStrategy): GroundObstacle {
        return new DesertGroundObstacle(point, sizeMultiplier, behaviour);
    }

    createAirObstacle(point: Point, sizeMultiplier: number, behaviour?: BehaviourStrategy): AirObstacle {
        return new DesertAirObstacle(point, sizeMultiplier, behaviour);
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

    createGroundObstacle(point: Point, sizeMultiplier: number, behaviour?: BehaviourStrategy): GroundObstacle {
        return new ForestGroundObstacle(point, sizeMultiplier, behaviour);
    }

    createAirObstacle(point: Point, sizeMultiplier: number, behaviour?: BehaviourStrategy): AirObstacle {
        return new ForestAirObstacle(point, sizeMultiplier, behaviour);
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

    createGroundObstacle(point: Point, sizeMultiplier: number, behaviour?: BehaviourStrategy): GroundObstacle {
        return new HellGroundObstacle(point, sizeMultiplier, behaviour);
    }

    createAirObstacle(point: Point, sizeMultiplier: number, behaviour?: BehaviourStrategy): AirObstacle {
        return new HellAirObstacle(point, sizeMultiplier, behaviour);
    }

    createBackground(): Background {
        return new HellBackground();
    }

    createImagePaths(): ImagePaths {
        return new HellImagePaths();
    }
}
