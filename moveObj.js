/**
 * w是运动物体的宽度
 * h是运动物体的高度
 * l是运动物体的左位置
 * t是运动物体的上位置
 * sX是运动物体的水平速度，+往右，-往左
 * sY是运动物体的垂直速度，+往下，-往上
 * dom是运动物体
 */

class moveObj {
    constructor(w, h, l, t, sX, sY, dom) {
        this.width = w;
        this.height = h;
        this.left = l;
        this.top = t;
        this.speedX = sX;
        this.speedY = sY;
        this.dom = dom;
        this.render();
    }
    render() {
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }

    move(duration) {
        const disX = duration * this.speedX;
        const disY = duration * this.speedY;
        this.left += disX;
        this.top += disY;
        if (this.onMove) {
            this.onMove(duration);
        }
        this.render();
    }
}