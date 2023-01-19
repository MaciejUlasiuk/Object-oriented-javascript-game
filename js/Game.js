import { Spaceship } from "./Spaceship.js"
import { Missile } from "./Missile.js";
import { Enemy } from "./Enemy.js";
import { Statistics } from "./Statistics.js";
import { Modal } from "./Modal.js";
import { Missiles } from "./Missiles.js";
import { LevelBar } from "./LevelBar.js";
import { EventModal } from "./EventModal.js";
import { Heart } from "./Heart.js";

class Game {
    
    constructor()
    {
        this.htmlElements = {
            container: document.querySelector('[data-container]'),
            button: document.querySelector('[data-button]'),
            MainMenu: document.querySelector('[data-mainmenu]'),
            MainMenuBtn: document.querySelector('[data-startGame]'),
            score: document.querySelector('[data-score]'),
            lives: document.querySelector('[data-lives]'),
            level: document.querySelector('[data-level]'),
            resumeButton: document.querySelector('[data-resumeBtn]'),
            pauseMenu: document.querySelector('[data-pause]'),
            statisticsButton: document.querySelector('[data-statistics-button]'),
            //endButton: document.querySelector('[data-modal-button]'),
            
            
        }
        this.spaceship = new Spaceship()
        this.missileIntervalSpeed = 1000;
        this.enemyIntervalSpeed = 3000;
        this.missilesInterval = null
        this.enemiesInterval = null
        this.checkPositionInterval = null
         
        this.missiles = []
        this.enemyMissiles = [];
        this.enemies = [];
        this.hearts= [];
        this.score = 0;
        this.lives = 3;
        this.gameStarted = false;
        this.gameState = true;
        this.statistics = new Statistics()
        this.shotsFired = 0;
        this.enemiesDestroyed = 0;
        this.bossesDestroyed = 0;
        this.time = new Date()
        this.modal = new Modal()
        this.eventModal = new EventModal()
        this.expToLevel = 5
        this.exp = 0
        this.money = 0
        this.lvl = 1
        this.stage = 1;
        this.levelBar = new LevelBar()
        this.alreadyPlayed = false;
        
    }
     
    
    start()
    {
        
       
        this.alreadyPlayed ? null : this.spaceship.initSpaceship()
        
        
        this.htmlElements.MainMenu.classList.add('hide')
        this.htmlElements.container.style.backgroundImage = 'none'
        this.htmlElements.container.style.animation = 'none'
       this.startGame()
       this.alreadyPlayed = true
       this.gameState = true
       

    }

    restartGame(){
        this.htmlElements.MainMenu.classList.add('hide')
        this.htmlElements.container.style.backgroundImage = 'none'
        this.htmlElements.container.style.animation = 'none'
        this.missileIntervalSpeed = 1000;
        this.enemyIntervalSpeed = 3000;
        this.missilesInterval = null
        this.enemiesInterval = null
        this.checkPositionInterval = null
         
        this.missiles = []
        this.enemyMissiles = [];
        this.enemies = [];
        this.hearts= [];
        this.score = 0;
        this.lives = 3;
       this.alreadyPlayed = true
       this.gameState = true
       this.lives = 3
       this.gameStarted = false;
        this.gameState = true;
        this.expToLevel = 5
        this.exp = 0
        this.money = 0
        this.lvl = 1
        this.stage = 1;
        this.addIntervals()
        this.addOldIntervals()
        this.updateInformation()
        window.addEventListener('mousemove', this.spaceshipMove)
        this.toggleAnimations()
        this.spaceship.toggleSpaceshipAnimation()
        
    }
    startGame()
    {
        this.handleGameEventListeners()
        this.addIntervals()
        this.updateInformation()

    }
    showMenu()
    {
        this.htmlElements.MainMenu.classList.remove('hide')
        this.alreadyPlayed ? console.log('yes') : this.handleEventListeners()
    }

    handleEventListeners(){
        this.htmlElements.MainMenuBtn.addEventListener('click', () => this.alreadyPlayed ? this.restartGame() : this.start())
        this.htmlElements.statisticsButton.addEventListener('click', ()=>{
            this.htmlElements.pauseMenu.classList.add('hide')
            this.statistics.updateElements(this.time,this.shotsFired,this.enemiesDestroyed,this.bossesDestroyed)
            this.statistics.show()
            
           
        })
       /* this.modal.elements.button.addEventListener('click',()=>{
            console.log('dziala')
            this.modal.hide()

           // game.showMenu()
        }
            ) */
    }
    handleGameEventListeners(){
        document.addEventListener("visibilitychange", this.stopGame);
        this.htmlElements.resumeButton.addEventListener('click', () => this.resumeGame())
        window.addEventListener('keydown', (e) => this.spaceship.keyboardMoveLeft(e))
        window.addEventListener('keydown', (e) => this.spaceship.keyboardMoveRight(e))
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
        this.enemiesInterval = setInterval(()=>this.addEnemy('enemy',4),this.enemyIntervalSpeed);
        this.checkPositionInterval = setInterval(()=>this.checkPostion(),50)
    }

     spaceshipMove = (e) => this.spaceship.move(e)

     toggleGameState(e){
         if(e.key === 'Escape' && this.gameState!=='end')
         {
        this.gameState ? this.stopGame() : this.resumeGame()
        
         }
     }

    shootMissile()
     {
         const missileLeftPosition = this.spaceship.spaceship.offsetLeft + (this.spaceship.spaceship.offsetWidth/2);
         const missileTopPosition = this.spaceship.spaceship.offsetTop
         const missile = new Missile(missileLeftPosition,missileTopPosition)
         this.missiles.push(missile)
         this.shotsFired++;
         missile.interval = setInterval(()=> {
             missile.updatePosition()
             
         },3)
         
     }

    nextLevel(){
        this.expToLevel = Math.floor(this.expToLevel * 1.5)
        this.exp = 0
        this.lvl +=1;
        this.score +=1000
        this.missileIntervalSpeed = 300;
        this.enemyIntervalSpeed = 600;
        this.enemySpeed = 2;
        this.clearIntervals()
       this.gameState !='end' ? this.addIntervals() : null
       this.gameState !='end' ?  this.addOldIntervals() : null
    }
    checkIfLvlUp(){
        if(this.exp>=this.expToLevel)
        {
            this.nextLevel()
            this.eventModal.showInformation(`Lvl up to ${this.lvl}`);

        }
    }
     checkEnemyMissilePosition = () =>
    {
        this.enemyMissiles.forEach((missile, index) => {
            const missilePosition = {
                top: missile.missile.offsetTop,
                right: missile.missile.offsetLeft + missile.missile.offsetWidth,
                bottom: missile.missile.offsetTop + missile.missile.offsetHeight,
                left: missile.missile.offsetLeft
            }
           if(missilePosition.top<=0 || missilePosition.top>=window.innerHeight)
           {
               
               missile.missile.remove()
               this.enemyMissiles.splice(index,1)
               clearInterval(missile.interval)
               
           }
        }
        )}

     checkPostion(){
         
         this.missiles.forEach((missile, index) => {
             const missilePosition = {
                 top: missile.missile.offsetTop,
                 right: missile.missile.offsetLeft + missile.missile.offsetWidth,
                 bottom: missile.missile.offsetTop + missile.missile.offsetHeight,
                 left: missile.missile.offsetLeft
             }
            if(missilePosition.top<=0 || missilePosition.top>=window.innerHeight)
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
                        enemy.content.classList.add('explosion')
                       setTimeout(()=>enemy.content.remove(),600)
                        this.enemies.splice(indexEnemy,1)
                        clearInterval(enemy.enemyInterval)
                        clearInterval(enemy.missilesInterval)
                        this.score+=10;
                        this.enemiesDestroyed++;
                        this.exp +=2;
                        this.checkIfLvlUp()
                        this.levelBar.updateLvl(this.exp,this.expToLevel)
                        this.updateInformation()
                  //      this.respawnHeart(missilePosition.top,missilePosition.left);
                        
                        
                    }
                if(enemyPosition.top>=window.innerHeight)
                {
                    this.htmlElements.container.classList.add('hit')
                    setTimeout(()=>this.htmlElements.container.classList.remove('hit'),50)
                    this.lives--;
                    enemy.content.remove()
                    this.enemies.splice(indexEnemy,1)
                    clearInterval(enemy.enemyInterval)
                    clearInterval(enemy.missilesInterval)
                    this.updateInformation()
                    if(this.lives===0)this.endGame()
                }
                
            })
    /*        this.hearts.forEach((heart,indexHeart) => {
                const heartPosition = {
                    top: heart.element.offsetTop,
                    right: heart.element.offsetLeft + heart.element.offsetWidth,
                    bottom: heart.element.offsetTop + heart.element.offsetHeight,
                    left: heart.element.offsetLeft
                }
                const spaceshipPosition = {
                    top: this.spaceship.spaceship.offsetTop,
                    right: this.spaceship.spaceship.offsetLeft + this.spaceship.spaceship.offsetWidth,
                    bottom: this.spaceship.spaceship.offsetTop + this.spaceship.spaceship.offsetHeight,
                    left: this.spaceship.spaceship.offsetLeft 
                }
                console.log(heartPosition, spaceshipPosition)
                if(spaceshipPosition.bottom >= heartPosition.top 
                    && spaceshipPosition.top <= heartPosition.bottom 
                    && spaceshipPosition.right >= heartPosition.left && spaceshipPosition.left <= heartPosition.spaceship)
                    {
                        console.log('dziala')
                        this.lives++;
                        heart.element.remove()
                        this.hearts.splice(indexHeart,1);
                        clearInterval(heart.interval);
                    }

                if(heartPosition.top>=window.innerHeight)
                {
                    heart.element.remove()
                        this.hearts.splice(indexHeart,1);
                        clearInterval(heart.interval);
                }
            })*/
         })
         this.checkEnemyMissilePosition()
     }

      createHeart(top,left){
        const heart = new Heart(top,left);
        heart.initHeart()
        this.hearts.push(heart);
        heart.interval = setInterval(()=>{
            heart.moveHeart()
        },10)

      }

      respawnHeart(top,left){
        console.log(Math.floor(Math.random()*5))
        if(Math.floor(Math.random()*5))
        {
            
            this.createHeart(top,left)
        }
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
         this.htmlElements.score.textContent = `Score ${this.score}`;
         this.htmlElements.lives.textContent = `Lives: ${this.lives}`
         this.htmlElements.level.textContent = `Level: ${this.lvl}`
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
           clearInterval(enemy.missilesInterval)
           this.enemyMissiles.forEach(missile => clearInterval(missile.interval))
       })
     /*  this.hearts.forEach((heart)=>{
        clearInterval(heart.interval);
       })*/
       
    }
      stopGame = () => {
          if(this.statistics.element.classList.contains('hide')===false ||this.modal.element.classList.contains('hide')===false) return 
         else if(this.htmlElements.pauseMenu.classList.contains('hide')) 
         {
         this.htmlElements.pauseMenu.classList.remove('hide')
        this.clearIntervals()
        this.removeEventListeners()
        this.toggleAnimations()
        this.spaceship.toggleSpaceshipAnimation()
        this.gameState = !this.gameState
         }
        
     }
     resumeGame(){
         this.statistics.hide()
        this.htmlElements.pauseMenu.classList.add('hide')
        this.addIntervals()
        this.addOldIntervals()
        window.addEventListener('mousemove', this.spaceshipMove)
        this.toggleAnimations()
        this.spaceship.toggleSpaceshipAnimation()
        this.gameState = !this.gameState
     }
     endGame(){
        this.clearIntervals()
        this.removeEventListeners()
        this.toggleAnimations()
        this.spaceship.toggleSpaceshipAnimation()
        this.gameState = !this.gameState
        this.modal.show()
        this.modal.elements.button.addEventListener('click',()=>{
            console.log('dziala')
            this.modal.hide()

            game.showMenu()
        })
        this.missiles.forEach(missile => missile.missile.remove())
        this.enemies.forEach(enemy => enemy.content.remove())
        this.gameState = 'end'
     }
     addOldIntervals()
    {
        this.missiles.forEach(missile => {
            
            missile.interval = setInterval(()=> {
             missile.class === 'missile' ? missile.updatePosition() : missile.updatePositionForEnemyMissile()
                
            },3)
        })
        this.enemies.forEach(enemy => {
            enemy.enemyInterval = setInterval(()=>{
                enemy.updatePosition()
            },10)
        })

        this.hearts.forEach(heart=>{
            heart.interval = setInterval(()=>{
            heart.moveHeart()
        },10)})
    }
     toggleAnimations(){
         this.enemies.forEach(element => {
            element.toggleAnimation()
         })
         
     }
     quitGame(){
         this.htmlElements.container.textContent=''
         this.score = 0;
         this.lives = 0;
         this.toggleAnimations()
         this.removeEventListeners()
         this.clearIntervals()
         this.endGame()
     }
}

let game = new Game()
window.onload = game.showMenu()
