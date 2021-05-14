const birdDom = document.querySelector('.bird');
const birdDomStyle = getComputedStyle(birdDom);
const birdW = parseInt(birdDomStyle.width);
const birdH = parseInt(birdDomStyle.height);
const birdL = parseFloat(birdDomStyle.left);
const birdT = parseFloat(birdDomStyle.top);
const maxT = parseFloat(skyH) - parseFloat(landH) - parseFloat(birdH);
class Bird extends moveObj {
    constructor() {
        super(birdW, birdH, birdL, birdT, 0, 0, birdDom);
        this.state = 1;
        this.maxT = maxT;
        this.g = 1500;
        this.timer = null;
    }
    startSwitchStates() {
        if (this.timer == null) {
            this.timer = setInterval(() => {
                this.state = (this.state + 1) % 3 + 1;
                this.dom.className = 'bird states' + this.state;
            }, 150)
        }
    }
    stopSwitchStates() {
        clearInterval(this.timer);
        this.timer = null;
    }
    onMove(duration) {
        this.speedY += duration * this.g;
        if (this.top <= 0) {
            this.top = 0;
        } else if (this.top >= this.maxT) {
            this.top = this.maxT;
        }
    }
    jump() {
        this.speedY = -450;
    }
}