export default class Intro {
    constructor(models) {
        this.scene = models
        window.addEventListener('keydown', (e) => {
            if(e.code == 'Space') {
                return this.changeScene()
            }
        })
    }

    render() {
        this.scene.canvas.clearRect(0,0,this.scene.board.width, this.scene.board.height);
        this.scene.canvas.strokeText('PRESS ENTER TO START...' , 20, 50);
        this.scene.canvas.strokeStyle = "yellow";

        if(this.scene.nextScene == 'play') {
            return this.scene.canvas.clearRect(0,0,this.scene.board.width, this.scene.board.height);
        }

        window.requestAnimationFrame(this.render.bind(this));
    }

    changeScene() {
        this.scene.nextScene = 'play';
    }
}
