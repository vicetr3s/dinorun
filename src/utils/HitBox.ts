import { Point } from './Point.ts';
import { Dimension } from './Dimension.ts';

export class HitBox {
    private points: Point[];

    constructor(position: Point, size: Dimension) {
        this.points = [];

        this.points.push(new Point(position.x, position.y));
        this.points.push(new Point(position.x + size.width, position.y));
        this.points.push(new Point(position.x + size.width, position.y + size.height));
        this.points.push(new Point(position.x, position.y + size.height));

    }

    public isHit(hitBox: HitBox): boolean {

    }
}