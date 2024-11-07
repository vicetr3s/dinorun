import { Background } from './Background.ts';
import { AirObstacle } from '../entities/obstacles/AirObstacles.ts';
import { ForestBackground } from '../entities/backgrounds/ForestBackground.ts';
import { DesertBackground } from '../entities/backgrounds/DesertBackground.ts';
import { HellBackground } from '../entities/backgrounds/HellBackground.ts';
import { DesertDinosaur, Dinosaur, ForestDinosaur, HellDinosaur } from './Dinosaur.ts';
import { Point } from '../utils/Point.ts';
import { Dimension } from '../utils/Dimension.ts';
import { GroundObstacle } from '../entities/obstacles/GroundObstacles.ts';

export interface ComponentFactory {
    createDinosaur(point: Point, size: Dimension): Dinosaur;

    createGroundObstacle(): GroundObstacle;

    createAirObstacle(): AirObstacle;

    createBackground(): Background;
}

export class DesertComponentFactory implements ComponentFactory {
    public constructor() {}

    createDinosaur(point: Point, size: Dimension): Dinosaur {
        return new DesertDinosaur(point, size);
    }

    createGroundObstacle(): GroundObstacle {}

    createAirObstacle(): AirObstacle {}

    createBackground(): Background {
        return new DesertBackground();
    }
}

export class ForestComponentFactory implements ComponentFactory {
    createDinosaur(point: Point, size: Dimension): Dinosaur {
        return new ForestDinosaur(point, size);
    }

    createGroundObstacle(): GroundObstacle {}

    createAirObstacle(): AirObstacle {}

    createBackground(): Background {
        return new ForestBackground();
    }
}

export class HellComponentFactory implements ComponentFactory {
    createDinosaur(point: Point, size: Dimension): Dinosaur {
        return new HellDinosaur(point, size);
    }

    createGroundObstacle(): GroundObstacle {}

    createAirObstacle(): AirObstacle {}

    createBackground(): Background {
        return new HellBackground();
    }
}
