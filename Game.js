import PlayScene from './scenes/GamePlayScene.js'
import IntroScene from './scenes/IntroScene.js'
import YouWonScene from './scenes/YouWonScene.js'
import GameOverScene from './scenes/GameOverScene.js'


export default class Game {
    constructor() {
        this.board = document.getElementById('game');
        this.canvas = this.board.getContext('2d');
        [this.currentScene, this.nextScene] = [null, 'intro'];
        this.gameFrame = 0;
        this.points = 0;
        this.canvas.font = "20px Comic Sans MS";
    }

    start() {
        setInterval(()=>{
            if(this.nextScene == null)
                return

            switch (this.nextScene) {
                case 'intro':
                    new IntroScene(this).render();
                    break;
                case 'play':
                    new PlayScene(this).render(); 
                    break;
                case 'youwon':
                    new YouWonScene(this).render();
                    break;
                case 'gameover':
                    new GameOverScene(this).render();
                    break;
            };
            this.currentScene = this.nextState;
            this.nextScene = null;
        }, 100);
    }
}
