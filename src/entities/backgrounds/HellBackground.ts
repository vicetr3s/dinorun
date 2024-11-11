import { Background } from '../../components/Background.ts';

export class HellBackground extends Background {
    public constructor() {
        super();

        this.backLayerLevel = 0;
        this.middleLayerLevel = -20;
        this.frontLayerLevel = -10;
    }
}
