 import { Missile } from "./Missile.js";
 import { Missiles } from "./Missiles.js";

export class Enemy {
    constructor(type = null, lives = null, position = null)
    {
        this.type=type ? type : 'enemy'
        this.content = document.createElement('div')
        this.lives = lives
        this.top = 0;
        this.left = null
        this.enemyInterval = null
        
        this.position = position
        this.missilesInterval = null
    }
    initEnemy(){
        this.content.classList.add(this.type)
        document.querySelector('[data-container]').appendChild(this.content)
        this.left = this.position ? this.position : Math.floor(Math.random()*((window.innerWidth - this.content.offsetWidth)))
        this.content.style.left = `${this.left}px`;
        this.content.style.top = `${this.top}px`;
        this.lives = this.lives ? this.lives : 3
        //this.missilesInterval = setInterval(this.shootMissile, 3000)
        
        this.content.style.animationPlayState = 'running'
    }
    updatePosition(){
        
        this.content.style.top = `${this.content.offsetTop + 4}px`

    }

    shootMissile = (missiles) =>{
        const missileLeftPosition = this.content.offsetLeft + (this.content.offsetWidth/2);
         const missileTopPosition = (this.content.offsetTop - this.content.offsetHeight)
         const missile = new Missile(missileLeftPosition,missileTopPosition,'enemyMissile')
         missiles.push(missile)
         missile.interval = setInterval(()=> {
             missile.updatePositionForEnemyMissile()
             
         },5)
         
    }

    

    toggleAnimation()
    {
        if(this.content.style.animationPlayState==='paused') this.content.style.animationPlayState = 'running'
         else this.content.style.animationPlayState = 'paused'
    }

    enemyKill(){
        clearInterval(this.enemyInterval)
    }
      
}