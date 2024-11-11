import { GameData } from './GameData.ts';

export interface BehaviourStrategy {
    move(up: boolean): void;
}

export class TraditionalStrategy implements BehaviourStrategy {
    move(up: boolean): void {
        return;
    }
}

export class DynamicStrategy implements BehaviourStrategy {
    move(up: boolean): void {
        if (Math.random() < 0.99) return; // 1% chance for the obstacle to move
        GameData.instance.airObstacleYSpeed = Math.random() * (5 - 2) + 2; // Max speed 5, and min speed 2
        if (up) GameData.instance.airObstacleYSpeed *= -1;
    }
}
