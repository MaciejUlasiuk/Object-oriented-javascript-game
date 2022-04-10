
export class Missile {
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.class = 'missile'
        this.interval = null
        this.missile = document.createElement('div')
        this.initMissile()
        
         
    }
    initMissile(){
        
        this.missile.classList.add(this.class)
        this.missile.style.left = `${this.x}`;
        this.missile.style.top = `${this.y}`;
        document.querySelector('[data-container]').appendChild(this.missile)
    }
    updatePosition()
    {
        
        
        this.missile.style.top = `${this.missile.offsetTop - 2}px`;
        
    }
    
    
}