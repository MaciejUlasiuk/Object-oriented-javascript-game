export class Enemy {
    constructor(type, lives)
    {
        this.type=type
        this.content = document.createElement('div')
        this.lives = lives
        this.top = 0;
        this.left = Math.floor(Math.random()*window.innerWidth)
        this.enemyInterval = null
    }
    initEnemy(){
        this.content.classList.add(this.type)
        this.content.style.left = `${this.left}px`;
        this.content.style.top = `${this.top}px`;
        document.querySelector('[data-container]').appendChild(this.content)
        this.content.style.animationPlayState = 'running'
    }
    updatePosition(){
        
        this.content.style.top = `${this.content.offsetTop + 2}px`

    }
    
}