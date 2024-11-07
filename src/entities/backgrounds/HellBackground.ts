import { Background } from '../../components/Background.ts';
import { GameData } from '../../main/GameData.ts';

export class HellBackground extends Background {
    public draw(): void {
        if (GameData.instance.canvasContext == null) return;
        const canvas = GameData.instance.canvasContext;
        canvas.fillStyle = 'red';
        canvas.fillRect(0, 0, innerWidth, innerHeight);
    }
}
