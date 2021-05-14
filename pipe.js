const container = document.querySelector('.container');
const width = container.clientWidth;

class Pipe extends moveObj {
    constructor(h, t, sX, dom) {
        super(52, h, width, t, sX, 0, dom);
    }
    remove() {
        if (this.left < this.width) {
            this.dom.remove();
        }
    }
}

function getRandom(max, min) {
    return parseInt(Math.random() * (max - min) + min);
}

class DoublePipe {
    constructor(sX) {
        const upPipe = document.createElement('div');
        upPipe.className = 'pipe down';
        this.spaceHeight = 150;
        this.minHeight = 80;
        this.maxHeight = skyH - landH - this.spaceHeight - this.minHeight;
        const upHeight = getRandom(this.maxHeight, this.minHeight);
        this.upPipe = new Pipe(upHeight, 0, sX, upPipe);
        const downPipe = document.createElement('div');
        downPipe.className = 'pipe up';
        const downHeight = skyH - landH - this.spaceHeight - upHeight;
        const downTop = skyH - landH - downHeight;
        this.downPipe = new Pipe(downHeight, downTop, sX, downPipe);

        container.appendChild(upPipe);
        container.appendChild(downPipe);
    }
    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
    isUseful() {
        return this.upPipe.left < -this.upPipe.width;
    }
}

class ProducePipe {
    constructor(sX) {
        this.speedX = sX;
        this.pipeArr = [];
        this.timer = null;
        this.spaceTime = 1500;
    }
    startProduce() {
        if (this.timer == null) {
            this.timer = setInterval(() => {
                this.pipeArr.push(new DoublePipe(this.speedX));
                for (let i = 0; i < this.pipeArr.length; i++) {
                    let pipe = this.pipeArr[i];
                    if (pipe.isUseful()) {
                        this.pipeArr.splice(i, 1);
                        i--;
                    }
                }
            }, this.spaceTime)
        }
    }
    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}