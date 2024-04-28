export default class GameOverScene {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', (e) => {
            if(e.code == 'Space') {
                location.reload()
            }
        })
        this.game.board.style.backgroundImage = "url('/images/gameover_bg.png')";
    }

    render() {
        this.game.canvas.clearRect(0,0,this.game.board.width, this.game.board.height);
        this.game.canvas.strokeText('GAME OVER' , 100, 50);
        this.game.canvas.strokeStyle = "yellow";

        window.requestAnimationFrame(this.render.bind(this));
    }

    changeScene() {
        this.game.nextScene = 'intro';
    }
}
