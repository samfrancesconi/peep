export default class Play {
    constructor(models) {
        this.scene = models;
    }

    render() {
        this.scene.canvas.clearRect(0,0,this.scene.board.width, this.scene.board.height);
        this.scene.sprite.render(this.scene.canvas);
        
        this.scene.canvas.strokeText(this.scene.points ,this.scene.board.width - 30, 25);
        this.scene.canvas.strokeStyle = "yellow";

        //let collider = new Collider(this.scene.sprite, this.scene.worms.elements);
        //collider.detectCollisions();
       
        this.scene.worms.elements.map(worm => {
            if (worm.noRender) {
                return
            }
            else {
                worm.render(this.scene.canvas);
                worm.move();
                // I slow down the speed of the widget animation
                if(this.scene.gameFrame % 5 == 0 && worm.isAnimated){
                    worm.animate();
                }    
            }
        });

        //collider function to optimize//
        //collider starts
        for (let i = 0; i < this.scene.worms.elements.length; i++) {
            let wormX = this.scene.worms.elements[i].position.x;
            let chickX = this.scene.sprite.position.x;
            if (
                ((chickX >= wormX && chickX <= wormX + this.scene.worms.elements[i].dimension.width) && (this.scene.worms.elements[i].position.y + this.scene.worms.elements[i].dimension.height >= this.scene.sprite.position.y)) 
                || 
                ((wormX >= chickX && wormX <= chickX + this.scene.sprite.dimension.width) && (this.scene.worms.elements[i].position.y + this.scene.worms.elements[i].dimension.height >= this.scene.sprite.position.y))
                ) {
                //delete this.scene.worms.elements[i];
                if(!this.scene.worms.elements[i].noRender) {
                    if(this.scene.worms.elements[i].isAnimated) {
                        this.scene.points -= 1;
                        new Audio('sounds/mua.mp3').play();
                    }
                    else {
                        this.scene.points += 1;
                        new Audio('sounds/peep.mp3').play();
                    }
                }
                    
                this.scene.worms.elements[i].noRender = true;
            };  
        };

        for (let i = 0; i < this.scene.worms.elements.length; i++) {
            if(this.scene.worms.elements[i].position.y + this.scene.worms.elements[i].dimension.height >= this.scene.board.height) {
                this.scene.worms.elements[i].noRender = true;
            };
        };
        //collider ends

        if(this.scene.points < 0) {
            this.scene.canvas.clearRect(0,0,this.scene.board.width, this.scene.board.height);
            return this.scene.nextScene = 'gameover'
        }
        
        this.scene.gameFrame++;

        window.requestAnimationFrame(this.render.bind(this));
    }
}
