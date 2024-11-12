import { Point } from './Point.ts';
import { Dimension } from './Dimension.ts';
import { GameData } from '../main/GameData.ts';

export class HitBox {
    #points: Point[];
    #shrink: number;

    constructor(position: Point, size: Dimension) {
        this.#points = [];
        this.#shrink = GameData.instance.hitBoxShrink;

        // Constructs a hit box with 4 points (clockwise) and applies shrink factor to reduce its size
        this.#points.push(new Point(position.x + this.#shrink, position.y + this.#shrink));
        this.#points.push(new Point(position.x + size.width - this.#shrink, position.y + this.#shrink));
        this.#points.push(new Point(position.x + size.width - this.#shrink, position.y + size.height - this.#shrink));
        this.#points.push(new Point(position.x + this.#shrink, position.y + size.height - this.#shrink));
    }

    // Checks for collision with another hit box, defines 4 boundaries in each hit box and returns true if they are overlapping
    public isHit(hitBox: HitBox): boolean {
        const leftA = this.#points[0].x;
        const rightA = this.#points[1].x;
        const topA = this.#points[0].y;
        const bottomA = this.#points[3].y;

        const leftB = hitBox.#points[0].x;
        const rightB = hitBox.#points[1].x;
        const topB = hitBox.#points[0].y;
        const bottomB = hitBox.#points[3].y;

        return !(leftA >= rightB || rightA <= leftB || topA >= bottomB || bottomA <= topB);
    }

    // Draw the hit box, just for testing
    public draw(): void {
        const ctx = GameData.instance.canvasContext;

        ctx.beginPath();
        ctx.moveTo(this.#points[0].x, this.#points[0].y);

        for (let i = 1; i < this.#points.length; i++) {
            ctx.lineTo(this.#points[i].x, this.#points[i].y);
        }

        ctx.lineTo(this.#points[0].x, this.#points[0].y);

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
