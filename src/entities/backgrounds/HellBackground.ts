import { Background } from '../../components/Background.ts';
import { Sprite } from '../../utils/Sprite.ts';

export class HellBackground extends Background {
    public constructor() {
        super();
        this.backLayer = new Sprite(['/sprites/backgrounds/hell/bg_1.png'], 0);
        this.middleLayer = new Sprite(['/sprites/backgrounds/hell/bg_2.png'], 0);
        this.frontLayer = new Sprite(['/sprites/backgrounds/hell/bg_3.png'], 0);
        this.backLayerLevel = 0;
        this.middleLayerLevel = -20;
        this.frontLayerLevel = -10;
    }
}
