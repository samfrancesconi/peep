export default class Worm {
    constructor(src, x, y, width, height) {
        this.position = {
            x : x,
            y : y
        };
        this.dimension = {
            width : width,
            height : height
        };
        this.image = new Image();
        this.image.src = src;
    }

    render(c){
        c.drawImage(this.image, this.position.x, this.position.y, this.dimension.width, this.dimension.height);
    }

    move(){
        this.position.y += 1;
    }
}
 

