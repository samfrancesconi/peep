export default class Prop {
    constructor(src,srcy, x, y, width, height) {
        this.position = {
            x : x,
            y : y
        };
        this.dimension = {
            width : width,
            height : height
        };
        this.srcy = srcy;
        this.image = new Image();
        this.image.src = src;
    }
    render(c){
        c.drawImage(this.image, 0, this.srcy, 16, 16,this.position.x, this.position.y, this.dimension.width, this.dimension.height);
    }
    move(){
        this.position.y += 1;
    }

    animate() {
        if(this.srcy < 48) {
            this.srcy += 16;
        }
        else {
            this.srcy = 0;
        } 
    }
}
 

