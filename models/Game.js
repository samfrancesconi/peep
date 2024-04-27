import Play from '../scenes/GamePlay.js'
import Intro from '../scenes/Intro.js'
import GameOver from '../scenes/GameOver.js'


export default class Game {
    constructor() {
        this.board = document.getElementById('game');
        this.canvas = this.board.getContext('2d');
        [this.currentScene, this.nextScene] = [null, 'intro'];
        this.gameFrame = 0;
        this.points = 0;
        this.canvas.font = "20px Comic Sans MS";
    }

    initialize() {
        setInterval(()=>{
            if(this.nextScene == null)
                return

            switch (this.nextScene) {
                case 'intro':
                    new Intro(this).render();
                    break;
                case 'play':
                    new Play(this).render(); 
                    break;
                case 'gameover':
                    new GameOver(this).render()
                    break
            };
            this.currentScene = this.nextState;
            this.nextScene = null;
        }, 100);
    }
}
