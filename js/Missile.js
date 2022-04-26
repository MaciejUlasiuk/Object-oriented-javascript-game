
export class Missile {
    constructor(x,y, type = 'missile',)
    {
        this.x = x;
        this.y = y;
        this.class = type;
        this.interval = null
        this.missile = document.createElement('div')
        this.initMissile()
        
         
    }
    initMissile(e){
        
        this.missile.classList.add(this.class)
        document.querySelector('[data-container]').appendChild(this.missile)
        this.missile.style.left = `${this.x - (this.missile.offsetWidth / 2)}px`;
        this.missile.style.top = `${this.y - this.missile.offsetHeight}px`;
        
    }
    updatePosition()
    {
        
        
        this.missile.style.top = `${this.missile.offsetTop - 2}px`;
        
    }
    updatePositionForEnemyMissile()
    {
        this.missile.style.top = `${this.missile.offsetTop + 2}px`;
    }
    
}