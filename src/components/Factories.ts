import { Background } from './Background.ts';
import {
    AirObstacle,
    DesertAirObstacle,
    ForestAirObstacle,
    HellAirObstacle,
} from '../entities/obstacles/AirObstacles.ts';
import { ForestBackground } from '../entities/backgrounds/ForestBackground.ts';
import { DesertBackground } from '../entities/backgrounds/DesertBackground.ts';
import { HellBackground } from '../entities/backgrounds/HellBackground.ts';
import { DesertDinosaur, Dinosaur, ForestDinosaur, HellDinosaur } from './Dinosaur.ts';
import { Point } from '../utils/Point.ts';
import {
    DesertGroundObstacle,
    ForestGroundObstacle,
    GroundObstacle,
    HellGroundObstacle,
} from '../entities/obstacles/GroundObstacles.ts';
import { GameData } from '../main/GameData.ts';

export interface ComponentFactory {
    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur;

    createGroundObstacle(sizeMultiplier: number): GroundObstacle;

    createAirObstacle(sizeMultiplier: number): AirObstacle;

    createBackground(): Background;
}

export class DesertComponentFactory implements ComponentFactory {
    protected dinosaurBentDown: HTMLImageElement;

    public constructor() {
        this.dinosaurBentDown = new Image();
        this.dinosaurBentDown.src = '/sprites/dinosaurs/desert/bend/bend_1.png';
    }

    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur {
        return new DesertDinosaur(new Point(point.x, point.y), sizeMultiplier);
    }

    createGroundObstacle(sizeMultiplier: number): GroundObstacle {
        return new DesertGroundObstacle(
            new Point(GameData.instance.canvas.width, GameData.instance.groundLevel),
            sizeMultiplier,
        );
    }

    createAirObstacle(sizeMultiplier: number): AirObstacle {
        const obstacle = new DesertAirObstacle(new Point(GameData.instance.canvas.width, 0), sizeMultiplier);
        const maxY =
            GameData.instance.groundLevel -
            this.dinosaurBentDown.height * GameData.instance.dinosaurSizeMultiplier -
            obstacle.size.height;
        const minY = 0;
        obstacle.position.y = Math.random() * (maxY - minY) + minY;
        return obstacle;
    }

    createBackground(): Background {
        return new DesertBackground();
    }
}

export class ForestComponentFactory implements ComponentFactory {
    protected dinosaurBentDown: HTMLImageElement;

    public constructor() {
        this.dinosaurBentDown = new Image();
        this.dinosaurBentDown.src = '/sprites/dinosaurs/forest/bend/bend_1.png';
    }

    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur {
        return new ForestDinosaur(point, sizeMultiplier);
    }

    createGroundObstacle(sizeMultiplier: number): GroundObstacle {
        return new ForestGroundObstacle(
            new Point(GameData.instance.canvas.width, GameData.instance.groundLevel),
            sizeMultiplier,
        );
    }

    createAirObstacle(sizeMultiplier: number): AirObstacle {
        const obstacle = new ForestAirObstacle(new Point(GameData.instance.canvas.width, 0), sizeMultiplier);
        const maxY =
            GameData.instance.groundLevel -
            this.dinosaurBentDown.height * GameData.instance.dinosaurSizeMultiplier -
            obstacle.size.height;
        const minY = 0;
        obstacle.position.y = Math.random() * (maxY - minY) + minY;
        return obstacle;
    }

    createBackground(): Background {
        return new ForestBackground();
    }
}

export class HellComponentFactory implements ComponentFactory {
    protected dinosaurBentDown: HTMLImageElement;

    public constructor() {
        this.dinosaurBentDown = new Image();
        this.dinosaurBentDown.src = '/sprites/dinosaurs/hell/bend/bend_1.png';
    }

    createDinosaur(point: Point, sizeMultiplier: number): Dinosaur {
        return new HellDinosaur(point, sizeMultiplier);
    }

    createGroundObstacle(sizeMultiplier: number): GroundObstacle {
        return new HellGroundObstacle(
            new Point(GameData.instance.canvas.width, GameData.instance.groundLevel),
            sizeMultiplier,
        );
    }

    createAirObstacle(sizeMultiplier: number): AirObstacle {
        const obstacle = new HellAirObstacle(new Point(GameData.instance.canvas.width, 0), sizeMultiplier);
        const maxY =
            GameData.instance.groundLevel -
            this.dinosaurBentDown.height * GameData.instance.dinosaurSizeMultiplier -
            obstacle.size.height;
        const minY = 0;
        obstacle.position.y = Math.random() * (maxY - minY) + minY;
        return obstacle;
    }

    createBackground(): Background {
        return new HellBackground();
    }
}
