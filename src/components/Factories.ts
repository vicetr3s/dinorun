import { Background } from './Background.ts';
import {
    AirObstacle,
    DesertAirObstacle,
    ForestAirObstacle,
    HellAirObstacle
} from '../entities/obstacles/AirObstacles.ts';
import { ForestBackground } from '../entities/backgrounds/ForestBackground.ts';
import { DesertBackground } from '../entities/backgrounds/DesertBackground.ts';
import { HellBackground } from '../entities/backgrounds/HellBackground.ts';
import { DesertDinosaur, Dinosaur, ForestDinosaur, HellDinosaur } from './Dinosaur.ts';
import { Point } from '../utils/Point.ts';
import { DesertGroundObstacle, GroundObstacle, HellGroundObstacle } from '../entities/obstacles/GroundObstacles.ts';

export interface ComponentFactory {
    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur;

    createGroundObstacle(point: Point, sizeMultiplier: number): GroundObstacle;

    createAirObstacle(point: Point, sizeMultiplier: number): AirObstacle;

    createBackground(): Background;
}

export class DesertComponentFactory implements ComponentFactory {
    public constructor() {}

    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur {
        return new DesertDinosaur(point, sizeMultiplier);
    }

    createGroundObstacle(point: Point, sizeMultiplier: number): GroundObstacle {
        return new DesertGroundObstacle(point, sizeMultiplier);
    }

    createAirObstacle(point: Point, sizeMultiplier: number): AirObstacle {
        return new DesertAirObstacle(point, sizeMultiplier);
    }

    createBackground(): Background {
        return new DesertBackground();
    }
}

export class ForestComponentFactory implements ComponentFactory {
    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur {
        return new ForestDinosaur(point, sizeMultiplier);
    }

    createGroundObstacle(point: Point, sizeMultiplier: number): GroundObstacle {
        return new ForestGroundObstacle(point, sizeMultiplier);
    }

    createAirObstacle(point: Point, sizeMultiplier: number): AirObstacle {
        return new ForestAirObstacle(point, sizeMultiplier);
    }

    createBackground(): Background {
        return new ForestBackground();
    }
}

export class HellComponentFactory implements ComponentFactory {
    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur {
        return new HellDinosaur(point, sizeMultiplier);
    }

    createGroundObstacle(point: Point, sizeMultiplier: number): GroundObstacle {
        return new HellGroundObstacle(point, sizeMultiplier);
    }

    createAirObstacle(point: Point, sizeMultiplier: number): AirObstacle {
        return new HellAirObstacle(point, sizeMultiplier);
    }

    createBackground(): Background {
        return new HellBackground();
    }
}
