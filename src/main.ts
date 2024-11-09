import { Game } from './main/Game.ts';
import { Point } from './utils/Point.ts';
import { DesertComponentFactory, ForestComponentFactory, HellComponentFactory } from './components/Factories.ts';
import { GameData } from './main/GameData.ts';

const gameApp = new Game(new Point(50, GameData.instance.groundLevel), new DesertComponentFactory());
gameApp.startGame();
