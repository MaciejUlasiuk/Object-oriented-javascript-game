 import { Missile } from "./Missile.js";
 export class Spaceship {
     constructor()
     {
         this.spaceship = document.createElement('div')
     }
     initSpaceship()
     {
         
         this.spaceship.classList.add('spaceship')
         
         this.spaceship.style.bottom = 0;
         this.spaceship.style.left = `${window.innerWidth/2}px`
         document.querySelector('[data-container]').appendChild(this.spaceship)
         console.log(this.spaceship)
         

     }
     move = (e) => {
         
        this.spaceship.style.left = `${(e.clientX - (this.spaceship.offsetWidth/2) )}px`;
        this.spaceship.style.top = `${(e.clientY - (this.spaceship.offsetHeight/2))}px`;
     }
     toggleSpaceshipAnimation(){
         this.spaceship.style.animationPlayState = 'running' ? 'paused' : 'running'
     }
 }