import { Background } from '../../components/Background.ts';
import { Sprite } from '../../utils/Sprite.ts';

export class DesertBackground extends Background {
    public constructor() {
        super();
        this.backLayer = new Sprite(['/sprites/backgrounds/desert/bg_1.png'], 0);
        this.middleLayer = new Sprite(['/sprites/backgrounds/desert/bg_2.png'], 0);
        this.frontLayer = new Sprite(['/sprites/backgrounds/desert/bg_3.png'], 0);
        this.backLayerLevel = 0;
        this.middleLayerLevel = 50;
        this.frontLayerLevel = 80;
    }
}
