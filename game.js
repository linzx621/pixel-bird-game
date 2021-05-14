const modal = document.querySelector('.modal');
class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipeProduce = new ProducePipe(-100);
        this.timer = null;
        this.spaceTime = 16;
        this.key = true;
        this.over = false;
    }
    start() {
        if (this.timer) {
            return;
        }
        if (this.over) {
            window.location.reload();
            modal.style.display = 'none';
        }
        this.bird.startSwitchStates();
        this.pipeProduce.startProduce();
        this.timer = setInterval(() => {
            const duration = this.spaceTime / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipeProduce.pipeArr.forEach((pipes) => {
                pipes.move(duration);
            })
            if (this.gameOver()) {
                this.key = true;
                this.over = true;
                this.stop();
            }
        }, this.spaceTime)
    }
    stop() {
        this.bird.stopSwitchStates();
        this.pipeProduce.stopProduce();
        clearInterval(this.timer);
        this.timer = null;
        modal.style.display = 'block';
    }
    gameOver() {
        if (this.bird.top == this.bird.maxT || this.bird.top == 0) {
            return true;
        }
        for (let i = 0; i < this.pipeProduce.pipeArr.length; i++) {
            const pipes = this.pipeProduce.pipeArr[i];
            if (this.isHit(this.bird, pipes.upPipe) || this.isHit(this.bird, pipes.downPipe)) {
                return true;
            }
        }
        // this.pipeProduce.pipeArr.forEach((pipes) => {
        //     console.log(this.isHit(this.bird, pipes.upPipe));
        //     if (this.isHit(this.bird, pipes.upPipe) || this.isHit(this.bird, pipes.downPipe)) {
        //         return true;
        //     }
        // })
        return false;
    }
    isHit(obj1, obj2) {
        const centerX1 = obj1.left + (obj1.width / 2);
        const centerY1 = obj1.top + (obj1.height / 2);
        const centerX2 = obj2.left + (obj2.width / 2);
        const centerY2 = obj2.top + (obj2.height / 2);
        const disX = Math.abs(centerX1 - centerX2);
        const disY = Math.abs(centerY1 - centerY2);
        if (disX <= (obj1.width + obj2.width) / 2 && disY <= (obj1.height + obj2.height) / 2) {
            return true;
        }
        return false;
    }
    bindEvent() {
        window.onkeydown = (e) => {
            if (e.key == 'Enter') {
                if (this.key) {
                    this.key = false;
                    this.start();
                } else {
                    this.key = true;
                    this.stop();
                }
            } else if (e.key == ' ') {
                this.bird.jump();
            }
        }
    }
}
const game = new Game();
game.bindEvent();