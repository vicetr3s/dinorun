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
        if (Math.random() < 0.99) return 0; // 1% chance for the obstacle to move
        // Max speed 1, and min speed 0.5 for ground obstacles
        // Max speed 1 * 4, and min speed 0.5 * 4 for air obstacles
        return Math.random() * (1 - 0.5) + 0.5;
    }
}
