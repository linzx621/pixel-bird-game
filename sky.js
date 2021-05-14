const skyDom = document.querySelector('.sky');
const skyDomStyle = getComputedStyle(skyDom);
const skyW = parseInt(skyDomStyle.width);
const skyH = parseInt(skyDomStyle.height);
class Sky extends moveObj {
    constructor() {
        super(skyW, skyH, 0, 0, -50, 0, skyDom);
    }
    onMove() {
        this.left %= (this.width / 2);
    }
}