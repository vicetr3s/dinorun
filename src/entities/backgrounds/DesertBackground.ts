import { Background } from '../../components/Background.ts';

export class DesertBackground extends Background {
    public constructor() {
        super();

        this.backLayerLevel = 0;
        this.middleLayerLevel = 50;
        this.frontLayerLevel = 80;
    }
}
