import { Background } from '../../components/Background.ts';
import { GameData } from '../../main/GameData.ts';
import { Sprite } from '../../utils/Sprite.ts';
import { Dimension } from '../../utils/Dimension.ts';

export class DesertBackground extends Background {
    public constructor() {
        super();
        this.backLayer = new Sprite(['/sprites/backgrounds/desert/bg_1.png'], new Dimension(20000, 20000), 0);
        this.middleLayer = new Sprite(['/sprites/backgrounds/desert/bg_2.png'], new Dimension(200, 200), 0);
        this.frontLayer = new Sprite(['/sprites/backgrounds/desert/bg_3.png'], new Dimension(200, 200), 0);
    }
}
