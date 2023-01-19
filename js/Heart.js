export class Heart{
    constructor(top, left)
    {
        this.element = document.createElement('div');
        this.top = top;
        this.left = left;
        this.interval = null;
    }
    initHeart(){
        this.element.classList.add('heart');
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        document.querySelector('[data-container]').appendChild(this.element);
    }
    moveHeart(){
        this.element.style.top = `${this.element.offsetTop + 2}px`
    }
}