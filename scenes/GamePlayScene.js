import Prop from '../models/Prop.js';
import Group from '../models/Group.js';
import Worm from '../models/Worm.js';
import Player from '../models/Player.js';
import Controller from '../utils/Controller.js';

export default class GamePlayScene {
    constructor(game) {
        this.game = game;
        this.timer = 60;
        this.sprite = new Player('images/duckie.png', 0, 0, this.game.board.width / 2, this.game.board.height - 20, 30, 20);
        this.controller = new Controller({
            'ArrowRight' : this.sprite.moveRight.bind(this.sprite),
            'ArrowLeft' : this.sprite.moveLeft.bind(this.sprite),
        });
        this.worms = new Group();
        setInterval(()=>{
            const propsTypes = [
                new Prop('images/worm.png', 0,Math.floor(Math.random() * this.game.board.width), 0, 15, 15),
                new Prop('images/worm.png', 0,Math.floor(Math.random() * this.game.board.width), 0, 15, 15),
                new Prop('images/worm.png', 0,Math.floor(Math.random() * this.game.board.width), 0, 15, 15),
                new Worm ('images/wormtrs.png', Math.floor(Math.random() * this.game.board.width), 0, 17, 17)
            ];
            //this.worms.addElement(new Prop('/images/worm.png', 0,Math.floor(Math.random() * this.board.width), 0, 15, 15));
            this.worms.addElement(propsTypes[Math.floor(Math.random() * 4)]);
        }, 400);
        this.game.board.style.backgroundImage = "url('images/lake.jpeg')";
        this.startTimer();
    }

    render() {
        this.game.canvas.clearRect(0,0,this.game.board.width, this.game.board.height);
        this.sprite.render(this.game.canvas);
        
        this.game.canvas.strokeText(this.game.points ,this.game.board.width - 30, 25);
        this.game.canvas.strokeStyle = "yellow";

        this.game.canvas.strokeText(this.timer ,0 , 25);
        this.game.canvas.strokeStyle = "yellow";

        //let collider = new Collider(this.scene.sprite, this.scene.worms.elements);
        //collider.detectCollisions();
       
        this.worms.elements.map(worm => {
            if (worm.noRender) {
                return
            }
            else {
                worm.render(this.game.canvas);
                worm.move();
                // I slow down the speed of the widget animation
                if(this.game.gameFrame % 5 == 0 && worm.isAnimated){
                    worm.animate();
                }    
            }
        });

        //collider function to optimize//
        //collider starts
        for (let i = 0; i < this.worms.elements.length; i++) {
            let wormX = this.worms.elements[i].position.x;
            let chickX = this.sprite.position.x;
            if (
                ((chickX >= wormX && chickX <= wormX + this.worms.elements[i].dimension.width) && (this.worms.elements[i].position.y + this.worms.elements[i].dimension.height >= this.sprite.position.y)) 
                || 
                ((wormX >= chickX && wormX <= chickX + this.sprite.dimension.width) && (this.worms.elements[i].position.y + this.worms.elements[i].dimension.height >= this.sprite.position.y))
                ) {
                //delete this.scene.worms.elements[i];
                if(!this.worms.elements[i].noRender) {
                    if(this.worms.elements[i].isAnimated) {
                        this.game.points -= 1;
                        new Audio('sounds/mua.mp3').play();
                    }
                    else {
                        this.game.points += 1;
                        new Audio('sounds/peep.mp3').play();
                    }
                }
                    
                this.worms.elements[i].noRender = true;
            };  
        };

        for (let i = 0; i < this.worms.elements.length; i++) {
            if(this.worms.elements[i].position.y + this.worms.elements[i].dimension.height >= this.game.board.height) {
                this.worms.elements[i].noRender = true;
            };
        };
        //collider ends

        if(this.game.points < 0) {
            this.game.canvas.clearRect(0,0,this.game.board.width, this.game.board.height);
            return this.game.nextScene = 'gameover'
        }

        if(this.timer <= 0) {
            return this.game.nextScene = 'youwon'
        }
             
        this.game.gameFrame++;

        window.requestAnimationFrame(this.render.bind(this));
    }

    startTimer() {
        setInterval(()=>{
            this.timer--
        }, 1000)
    }
}
