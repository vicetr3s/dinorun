import { Movable } from './Interfaces.ts';

export interface BehaviourStrategy extends Movable {
    move(): void;
}

export class TraditionalStrategy implements BehaviourStrategy {
    move(): void {

    }
}

export class DynamicStrategy implements BehaviourStrategy {
    move(): void {

    }
}