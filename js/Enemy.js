// import { Missile } from "./Missile";

export class Enemy {
    constructor(type = null, lives = null, position = null)
    {
        this.type=type ? type : 'enemy'
        this.content = document.createElement('div')
        this.lives = lives
        this.top = 0;
        this.left = null
        this.enemyInterval = null
        this.enemyMissiles = [];
        this.position = position
    }
    initEnemy(){
        this.content.classList.add(this.type)
        this.left = this.position ? this.position : Math.floor(Math.random()*((window.innerWidth - this.content.offsetWidth)))
        this.content.style.left = `${this.left}px`;
        this.content.style.top = `${this.top}px`;
        this.lives = this.lives ? this.lives : 3
        
        document.querySelector('[data-container]').appendChild(this.content)
        this.content.style.animationPlayState = 'running'
    }
    updatePosition(){
        
        this.content.style.top = `${this.content.offsetTop + 2}px`

    }

    // shootMissile(){
    //     const missileLeftPosition = this.content.offsetLeft + (this.content.offsetWidth/2);
    //      const missileTopPosition = this.content.offsetTop
    //      const missile = new Missile(missileLeftPosition,missileTopPosition,'enemyMissile')
    //      this.enemyMissiles.push(missile)
         
    //      missile.interval = setInterval(()=> {
    //          missile.updatePositionForEnemyMissile()
             
    //      },5)
         
    // }

    enemyKill(){
        clearInterval(this.enemyInterval)
    }
      
}