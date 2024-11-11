export abstract class ImagePaths {
    _dinosaurRunImagePaths: string[];
    _dinosaurIdleImagePaths: string[];
    _dinosaurBendDownImagePaths: string[];
    _airObstacleImagePaths: string[];
    _groundObstacleImagePaths: string[];
    _backgroundImagePaths: string[];
}

export class DesertImagePaths extends ImagePaths {
    constructor() {
        super();
        this._dinosaurIdleImagePaths = [
            '/sprites/dinosaurs/desert/idle/idle_1.png',
            '/sprites/dinosaurs/desert/idle/idle_2.png',
            '/sprites/dinosaurs/desert/idle/idle_3.png',
            '/sprites/dinosaurs/desert/idle/idle_4.png',
        ];
        this._dinosaurRunImagePaths = [
            '/sprites/dinosaurs/desert/run/run_1.png',
            '/sprites/dinosaurs/desert/run/run_2.png',
            '/sprites/dinosaurs/desert/run/run_3.png',
            '/sprites/dinosaurs/desert/run/run_4.png',
        ];
        this._dinosaurBendDownImagePaths = [
            '/sprites/dinosaurs/desert/bend/bend_1.png',
            '/sprites/dinosaurs/desert/bend/bend_2.png',
            '/sprites/dinosaurs/desert/bend/bend_3.png',
            '/sprites/dinosaurs/desert/bend/bend_4.png',
        ];
        this._airObstacleImagePaths = [
            '/sprites/obstacles/air/desert/pterosaur_1.png',
            '/sprites/obstacles/air/desert/pterosaur_2.png',
            '/sprites/obstacles/air/desert/pterosaur_3.png',
            '/sprites/obstacles/air/desert/pterosaur_4.png',
        ];
        this._groundObstacleImagePaths = ['/sprites/obstacles/ground/desert/cactus.png'];
        this._backgroundImagePaths = [
            '/sprites/backgrounds/desert/bg_1.png',
            '/sprites/backgrounds/desert/bg_2.png',
            '/sprites/backgrounds/desert/bg_3.png',
            '/sprites/backgrounds/desert/ground/ground.png',
        ];
    }
}

export class ForestImagePaths extends ImagePaths {
    constructor() {
        super();
        this._dinosaurIdleImagePaths = [
            '/sprites/dinosaurs/forest/idle/idle_1.png',
            '/sprites/dinosaurs/forest/idle/idle_2.png',
            '/sprites/dinosaurs/forest/idle/idle_3.png',
            '/sprites/dinosaurs/forest/idle/idle_4.png',
        ];
        this._dinosaurRunImagePaths = [
            '/sprites/dinosaurs/forest/run/run_1.png',
            '/sprites/dinosaurs/forest/run/run_2.png',
            '/sprites/dinosaurs/forest/run/run_3.png',
            '/sprites/dinosaurs/forest/run/run_4.png',
            '/sprites/dinosaurs/forest/run/run_5.png',
            '/sprites/dinosaurs/forest/run/run_6.png',
        ];
        this._dinosaurBendDownImagePaths = [
            '/sprites/dinosaurs/forest/bend/bend_1.png',
            '/sprites/dinosaurs/forest/bend/bend_2.png',
            '/sprites/dinosaurs/forest/bend/bend_3.png',
            '/sprites/dinosaurs/forest/bend/bend_4.png',
        ];
        this._airObstacleImagePaths = [
            '/sprites/obstacles/air/forest/pterosaur_1.png',
            '/sprites/obstacles/air/forest/pterosaur_2.png',
            '/sprites/obstacles/air/forest/pterosaur_3.png',
            '/sprites/obstacles/air/forest/pterosaur_4.png',
        ];
        this._groundObstacleImagePaths = ['/sprites/obstacles/ground/forest/tree_trunk.png'];
        this._backgroundImagePaths = [
            '/sprites/backgrounds/forest/bg_1.png',
            '/sprites/backgrounds/forest/bg_2.png',
            '/sprites/backgrounds/forest/bg_3.png',
            '/sprites/backgrounds/forest/ground/ground.png',
        ];
    }
}

export class HellImagePaths extends ImagePaths {
    constructor() {
        super();
        this._dinosaurIdleImagePaths = [
            '/sprites/dinosaurs/hell/idle/idle_1.png',
            '/sprites/dinosaurs/hell/idle/idle_2.png',
            '/sprites/dinosaurs/hell/idle/idle_3.png',
            '/sprites/dinosaurs/hell/idle/idle_4.png',
        ];
        this._dinosaurRunImagePaths = [
            '/sprites/dinosaurs/hell/run/run_1.png',
            '/sprites/dinosaurs/hell/run/run_2.png',
            '/sprites/dinosaurs/hell/run/run_3.png',
            '/sprites/dinosaurs/hell/run/run_4.png',
            '/sprites/dinosaurs/hell/run/run_5.png',
            '/sprites/dinosaurs/hell/run/run_6.png',
        ];
        this._dinosaurBendDownImagePaths = [
            '/sprites/dinosaurs/hell/bend/bend_1.png',
            '/sprites/dinosaurs/hell/bend/bend_2.png',
            '/sprites/dinosaurs/hell/bend/bend_3.png',
            '/sprites/dinosaurs/hell/bend/bend_4.png',
        ];
        this._airObstacleImagePaths = [
            '/sprites/obstacles/air/hell/demon/demon_idle_1.png',
            '/sprites/obstacles/air/hell/demon/demon_idle_2.png',
            '/sprites/obstacles/air/hell/demon/demon_idle_3.png',
            '/sprites/obstacles/air/hell/demon/demon_idle_4.png',
        ];
        this._groundObstacleImagePaths = [
            '/sprites/obstacles/ground/hell/hand/malefic_hand_1.png',
            '/sprites/obstacles/ground/hell/hand/malefic_hand_2.png',
        ];
        this._backgroundImagePaths = [
            '/sprites/backgrounds/hell/bg_1.png',
            '/sprites/backgrounds/hell/bg_2.png',
            '/sprites/backgrounds/hell/bg_3.png',
            '/sprites/backgrounds/hell/ground/ground.png',
        ];
    }
}
