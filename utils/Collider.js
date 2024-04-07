export default class Collider {
    constructor(sprite, props) {
        this.sprite = sprite;
        this.props = props; 
    }

    detectCollisions() {
        for (let i = 0; i < this.props.length; i++) {
            let wormX = this.props[i].position.x;
            let chickX = this.sprite.position.x;
            if (
                ((chickX >= wormX && chickX <= wormX + this.props[i].dimension.width) && (this.props[i].position.y + this.props[i].dimension.height >= this.sprite.position.y)) 
                || 
                ((wormX >= chickX && wormX <= chickX + this.sprite.dimension.width) && (this.props[i].position.y + this.props[i].dimension.height >= this.sprite.position.y))
                ) {
                //delete this.props[i];
                this.props[i].noRender = true;
                return i;
            };  
        };
    }
}