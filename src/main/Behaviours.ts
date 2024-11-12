import { GameData } from './GameData.ts';

export interface BehaviourStrategy {
    move(): number;
}

export class TraditionalStrategy implements BehaviourStrategy {
    move(): number {
        return 0;
    }
}

export class DynamicStrategy implements BehaviourStrategy {
    move(): number {
        if (Math.random() < 1 - GameData.instance.probabilityForAnObstacleToMove) return 0; // 1% chance for the obstacle to move
        // Max speed 1, and min speed 0.5
        return Math.random() * (GameData.instance.obstacleMaxSpeedY - GameData.instance.obstacleMinSpeedY) + GameData.instance.obstacleMinSpeedY;
    }
}
