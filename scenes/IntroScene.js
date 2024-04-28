export default class IntroScene {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', (e) => {
            if(e.code == 'Space') {
                return this.changeScene()
            }
        })
        this.game.board.style.backgroundImage = "url('/images/intro_bg.png')";
    }

    render() {
        this.game.canvas.clearRect(0,0,this.game.board.width, this.game.board.height);
        this.game.canvas.strokeText('PRESS ENTER TO START...' , 20, 50);
        this.game.canvas.strokeStyle = "yellow";

        if(this.game.nextScene == 'play') {
            return this.game.canvas.clearRect(0,0,this.game.board.width, this.game.board.height);
        }

        window.requestAnimationFrame(this.render.bind(this));
    }

    changeScene() {
        this.game.nextScene = 'play';
    }
}
