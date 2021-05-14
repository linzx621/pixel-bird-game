const landDom = document.querySelector('.land');
const landDomStyle = getComputedStyle(landDom);
const landW = parseFloat(landDomStyle.width);
const landH = parseFloat(landDomStyle.height);
const landT = parseFloat(landDomStyle.top);
class Land extends moveObj {
    constructor(sX) {
        super(landW, landH, 0, landT, sX, 0, landDom)
    }
    onMove() {
        this.left %= (this.width / 2);
    }
}