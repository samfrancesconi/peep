import Controller from '../utils/Controller.js';
import Player from './Player.js';
import Prop from './Prop.js';
import Group from './Group.js';
import Worm from './Worm.js';
import Collider from '../utils/Collider.js';
import Play from '../scenes/play.js'
import Intro from '../scenes/intro.js'
import GameOver from '../scenes/gameOver.js'


export default class Game {
    constructor() {
        this.board = document.getElementById('game');
        this.canvas = this.board.getContext('2d');
        [this.currentScene, this.nextScene] = [null, 'intro'];
        this.sprite = new Player('images/duckie.png', 0, 0, this.board.width / 2, this.board.height - 20, 30, 20);
        this.worms = new Group();
        this.controller = new Controller({
            'ArrowRight' : this.sprite.moveRight.bind(this.sprite),
            'ArrowLeft' : this.sprite.moveLeft.bind(this.sprite),
        });
        this.gameFrame = 0;
        this.points = 0;
        //props spawner put it in a function
        setInterval(()=>{
            const propsTypes = [
                new Prop('/images/worm.png', 0,Math.floor(Math.random() * this.board.width), 0, 15, 15),
                new Prop('/images/worm.png', 0,Math.floor(Math.random() * this.board.width), 0, 15, 15),
                new Prop('/images/worm.png', 0,Math.floor(Math.random() * this.board.width), 0, 15, 15),
                new Worm ('/images/wormtrs.png', Math.floor(Math.random() * this.board.width), 0, 17, 17)
            ];
            //this.worms.addElement(new Prop('/images/worm.png', 0,Math.floor(Math.random() * this.board.width), 0, 15, 15));
            this.worms.addElement(propsTypes[Math.floor(Math.random() * 4)]);
        }, 400);
        this.canvas.font = "20px Comic Sans MS";
        //this.animationEngine()
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
                    this.reset();
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

    reset() {
        this.board = document.getElementById('game');
        this.canvas = this.board.getContext('2d');
        [this.currentScene, this.nextScene] = [null, 'intro'];
        this.sprite = new Player('images/duckie.png', 0, 0, this.board.width / 2, this.board.height - 20, 30, 20);
        this.worms = new Group();
        this.controller = new Controller({
            'ArrowRight' : this.sprite.moveRight.bind(this.sprite),
            'ArrowLeft' : this.sprite.moveLeft.bind(this.sprite),
        });
        this.gameFrame = 0;
        this.points = 0;
        //props spawner put it in a function
        setInterval(()=>{
            const propsTypes = [
                new Prop('/images/worm.png', 0,Math.floor(Math.random() * this.board.width), 0, 15, 15),
                new Prop('/images/worm.png', 0,Math.floor(Math.random() * this.board.width), 0, 15, 15),
                new Prop('/images/worm.png', 0,Math.floor(Math.random() * this.board.width), 0, 15, 15),
                new Worm ('/images/wormtrs.png', Math.floor(Math.random() * this.board.width), 0, 17, 17)
            ];
            //this.worms.addElement(new Prop('/images/worm.png', 0,Math.floor(Math.random() * this.board.width), 0, 15, 15));
            this.worms.addElement(propsTypes[Math.floor(Math.random() * 4)]);
        }, 400);
        this.canvas.font = "20px Comic Sans MS";
    }
}
