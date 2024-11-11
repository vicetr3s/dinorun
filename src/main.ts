import { Game } from './main/Game.ts';
import {
    ComponentFactory,
    DesertComponentFactory,
    ForestComponentFactory,
    HellComponentFactory,
} from './components/Factories.ts';
import { ImageLoader } from './utils/ImageLoader.ts';

const form = document.getElementById('theme-form');
let gameApp;

form?.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (target.name === 'theme') {
        const selectedTheme = target.value;

        initializeGame(getThemeFactory(selectedTheme));

        document.getElementById('theme-menu')?.classList.toggle('hidden');
    }
});

function getThemeFactory(theme: string): ComponentFactory {
    switch (theme) {
        case 'forest':
            return new ForestComponentFactory();
        case 'hell':
            return new HellComponentFactory();
        default:
            return new DesertComponentFactory();
    }
}

async function initializeGame(factory: ComponentFactory) {
    const loadingScreen = document.getElementById('loading-screen');

    loadingScreen?.classList.remove('hidden');

    const imageLoader = ImageLoader.instance;

    imageLoader.setImagePaths(factory.createImagePaths());

    try {
        await imageLoader.preloadImages();

        gameApp = new Game(factory);

        gameApp.startGame();
    } catch (error) {
        console.error('Failed to preload images:', error);

        alert('Error loading game assets. Please try again.');
    } finally {
        loadingScreen?.classList.add('hidden');
    }
}
