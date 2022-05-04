export class Missiles {


    normalMissiles = [];
    enemyMissiles = [];


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
 }