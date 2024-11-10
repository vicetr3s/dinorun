import { Game } from './main/Game.ts';
import {
    ComponentFactory,
    DesertComponentFactory,
    ForestComponentFactory,
    HellComponentFactory,
} from './components/Factories.ts';

const form = document.getElementById('theme-form');
let gameApp;

form?.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (target.name === 'theme') {
        const selectedTheme = target.value;

        gameApp = new Game(getThemeFactory(selectedTheme));
        gameApp.startGame();

        document.getElementById('theme-menu')?.classList.toggle('hidden');
    }
});

function getThemeFactory(theme: string): ComponentFactory {
    switch (theme) {
        case 'forest':
            console.log('forest');
            return new ForestComponentFactory();
        case 'hell':
            return new HellComponentFactory();
        default:
            return new DesertComponentFactory();
    }
}