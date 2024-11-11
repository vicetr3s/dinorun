import { Background } from '../../components/Background.ts';

export class ForestBackground extends Background {
    public constructor() {
        super();

        this.backLayerLevel = 0;
        this.middleLayerLevel = 0;
        this.frontLayerLevel = 0;
    }
}
