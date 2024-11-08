import { Game } from './main/Game.ts';
import { Point } from './utils/Point.ts';
import { DesertComponentFactory } from './components/Factories.ts';

const gameApp = new Game(new Point(100, 100), new DesertComponentFactory());
gameApp.startGame();