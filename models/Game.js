import Controller from '../utils/Controller.js';
import Player from './Player.js';
import Prop from './Prop.js';
import Group from './Group.js';


export default class Game {
    constructor() {
        this.board = document.getElementById('game');
        this.canvas = this.board.getContext('2d');
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
            this.worms.addElement(new Prop('/images/worm.png', 0,Math.floor(Math.random() * this.board.width), 0, 15, 15));
        }, 2000);
       
        this.canvas.font = "25px Comic Sans MS";

        this.animationEngine()
    }
     

    animationEngine() {           
        this.canvas.clearRect(0,0,this.board.width, this.board.height);
        this.sprite.render(this.canvas);
        
        this.canvas.strokeText(this.points ,this.board.width - 30, 25);
        this.canvas.strokeStyle = "yellow";
        
        
       
        this.worms.elements.map(worm => {
            if (worm.noRender) {
                return
            }
            else {
                worm.render(this.canvas);
                worm.move();
                // I slow down the speed of the widget animation
                if(this.gameFrame % 5 == 0){
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
                //delete this.worms.elements[i];
                if(!this.worms.elements[i].noRender) {
                    this.points += 1;
                    new Audio('sounds/peep.mp3').play();
                }
                    
                this.worms.elements[i].noRender = true;
            };  
        };

        for (let i = 0; i < this.worms.elements.length; i++) {
            if(this.worms.elements[i].position.y + this.worms.elements[i].dimension.height >= this.board.height) {
                this.worms.elements[i].noRender = true;
            };
        };
        //collider ends
        
        this.gameFrame++;

        window.requestAnimationFrame(this.animationEngine.bind(this));
    };

}
