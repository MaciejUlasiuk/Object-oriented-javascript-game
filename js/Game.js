import { Spaceship } from "./Spaceship.js"
import { Missile } from "./Missile.js";
import { Enemy } from "./Enemy.js";

class Game {
    constructor()
    {
        this.htmlElements = {
            container: document.querySelector('[data-container]'),
            button: document.querySelector('[data-button]'),
            MainMenu: document.querySelector('[data-mainmenu]'),
            score: document.querySelector('[data-score]'),
            lives: document.querySelector('[data-lives]'),
            resumeButton: document.querySelector('[data-resumeBtn]'),
            pauseMenu: document.querySelector('[data-pause]')
        }
        this.spaceship = new Spaceship()
        this.missileIntervalSpeed = 100;
        this.missilesInterval = null
        this.enemiesInterval = null
        this.checkPositionInterval = null
        this.missiles = [];
        this.enemies = [];
        this.score = 0;
        this.lives = 3;
        this.gameStarted = false;
        this.gameState = true;
        
    }
    
    start()
    {
        
       
        this.spaceship.initSpaceship()
        
        this.handleEventListeners()
       this.startGame()
       

    }
    startGame()
    {
        this.handleGameEventListeners()
        this.addIntervals()

    }
    showMenu()
    {
        this.htmlElements.MainMenu.classList.remove('hide')
    }

    handleEventListeners(){
        
    }
    handleGameEventListeners(){
        document.addEventListener("visibilitychange", this.stopGame);
        this.htmlElements.resumeButton.addEventListener('click', () => this.resumeGame())
        window.addEventListener('mousemove', this.spaceshipMove)
        window.addEventListener('keydown', (e) => this.toggleGameState(e))
        
    }
    removeEventListeners(){
        window.removeEventListener('mousemove', this.spaceshipMove)
        
    }
    animateCheckPosition(){
        window.requestAnimationFrame(this.checkPostion)
        this.animateCheckPosition()
    }
    addIntervals()
    {
        this.missilesInterval = setInterval(()=>this.shootMissile(),this.missileIntervalSpeed);
        this.enemiesInterval = setInterval(()=>this.addEnemy('enemy',4),500);
        this.checkPositionInterval = setInterval(()=>this.checkPostion(),50)
    }

     spaceshipMove = (e) => this.spaceship.move(e)

     toggleGameState(e){
         if(e.key === 'e')
         {
        this.gameState ? this.stopGame() : this.resumeGame()
        
         }
     }

    shootMissile()
     {
         const missileLeftPosition = this.spaceship.spaceship.style.left
         const missileTopPosition = this.spaceship.spaceship.style.top
         const missile = new Missile(missileLeftPosition,missileTopPosition)
         this.missiles.push(missile)
         
         missile.interval = setInterval(()=> {
             missile.updatePosition()
             
         },3)
         
     }

     checkPostion(){
         this.missiles.forEach((missile, index) => {
             const missilePosition = {
                 top: missile.missile.offsetTop,
                 right: missile.missile.offsetLeft + missile.missile.offsetWidth,
                 bottom: missile.missile.offsetTop + missile.missile.offsetHeight,
                 left: missile.missile.offsetLeft
             }
            if(missilePosition.top<=0)
            {
                
                missile.missile.remove()
                this.missiles.splice(index,1)
                clearInterval(missile.interval)
            }
            this.enemies.forEach((enemy,indexEnemy) => {
                const enemyPosition = {
                    top: enemy.content.offsetTop,
                    right: enemy.content.offsetLeft + enemy.content.offsetWidth,
                    bottom: enemy.content.offsetTop + enemy.content.offsetHeight,
                    left: enemy.content.offsetLeft
                }
                if(missilePosition.bottom >= enemyPosition.top 
                    && missilePosition.top <= enemyPosition.bottom 
                    && missilePosition.right >= enemyPosition.left && missilePosition.left <= enemyPosition.right)
                    {
                            missile.missile.remove()
                        this.missiles.splice(index,1)
                        clearInterval(missile.interval)
                        enemy.content.remove();
                        this.enemies.splice(indexEnemy,1)
                        clearInterval(enemy.enemyInterval)
                        this.score++
                        this.updateInformation()
                        if(this.score % 5 ===0)
                        {
                            console.log('hi')
                        }
                    }
                if(enemyPosition.top>=window.innerHeight)
                {
                    enemy.content.remove()
                    this.enemies.splice(indexEnemy,1)
                    clearInterval(enemy.enemyInterval)
                    
                }
            })
         })
     }
     addEnemy(){
         const enemy = new Enemy('enemy', 3)
         this.enemies.push(enemy)
         enemy.enemyInterval = setInterval(()=>{
             enemy.updatePosition()
         },10)
         enemy.initEnemy()
     }
     updateInformation(){
         this.htmlElements.score.textContent = this.score;
         this.htmlElements.lives.textContent = `Lives: ${this.lives}`
     }
     clearIntervals()
     {
        
       clearInterval(this.enemiesInterval)
       clearInterval(this.missilesInterval)
       clearInterval(this.checkPositionInterval)
       this.missiles.forEach(missile => {
           clearInterval(missile.interval)
       })
       this.enemies.forEach(enemy => {
           clearInterval(enemy.enemyInterval)
       })
       
    }
     stopGame(){
         console.log(this.htmlElements.pauseMenu)
         this.htmlElements.pauseMenu.classList.remove('hide')
        this.clearIntervals()
        this.removeEventListeners()
        this.toggleAnimations()
        this.spaceship.toggleSpaceshipAnimation()
        this.gameState = !this.gameState
     }
     resumeGame(){
         console.log(this.htmlElements.pauseMenu)
        this.htmlElements.pauseMenu.classList.add('hide')
        this.addIntervals()
        this.addOldIntervals()
        window.addEventListener('mousemove', this.spaceshipMove)
        this.toggleAnimations()
        this.spaceship.toggleSpaceshipAnimation()
        this.gameState = !this.gameState
     }
     addOldIntervals()
    {
        this.missiles.forEach(missile => {
            missile.interval = setInterval(()=> {
                missile.updatePosition()
                
            },3)
        })
        this.enemies.forEach(enemy => {
            enemy.enemyInterval = setInterval(()=>{
                enemy.updatePosition()
            },10)
        })
    }
     toggleAnimations(){
         this.enemies.forEach(element => {
            const running = element.content.style.animationPlayState;
             element.content.style.animationPlayState = running ? 'paused' : 'running';

         })
         
     }
     
}

const game = new Game()
game.showMenu()