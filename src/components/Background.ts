import { Drawable } from '../main/Interfaces.ts';

export abstract class Background implements Drawable {
    abstract draw(): void;
}