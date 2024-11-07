import { Obstacle } from '../../components/Obstacle.ts';

export abstract class AirObstacle extends Obstacle {}

export class DesertAirObstacle extends AirObstacle {}

export class ForestAirObstacle extends AirObstacle {}

export class HellAirObstacle extends AirObstacle {}
