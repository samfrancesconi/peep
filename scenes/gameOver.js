export default class GameOver {
    constructor(models) {
        this.scene = models
    }

    render() {
        this.scene.canvas.clearRect(0,0,this.scene.board.width, this.scene.board.height);
        this.scene.canvas.strokeText('GAME OVER' , 100, 50);
        this.scene.canvas.strokeStyle = "yellow";

        window.requestAnimationFrame(this.render.bind(this));
    }

    changeScene() {
        this.scene.nextScene = 'play';
    }
}
