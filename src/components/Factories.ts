import { Background } from './Background.ts';
import { GroundObstacle } from '../entities/obstacles/GroundObstacles.ts';
import { AirObstacle } from '../entities/obstacles/AirObstacles.ts';

export interface ComponentFactory {
    createGroundObstacle(): GroundObstacle;
    createAirObstacle(): AirObstacle;
    createBackground(): Background;
}

export class DesertComponentFactory implements ComponentFactory {
    createGroundObstacle(): GroundObstacle {

    }

    createAirObstacle(): AirObstacle {

    }

    createBackground(): Background {
        return Background;
    }
}

export class ForestComponentFactory implements ComponentFactory {
    createGroundObstacle(): GroundObstacle {

    }

    createAirObstacle(): AirObstacle {

    }

    createBackground(): Background {
        return Background;
    }
}

export class HellComponentFactory implements ComponentFactory {
    createGroundObstacle(): GroundObstacle {

    }

    createAirObstacle(): AirObstacle {

    }

    createBackground(): Background {
        return Background;
    }
}