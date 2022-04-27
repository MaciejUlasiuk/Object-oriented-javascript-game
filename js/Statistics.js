export class Statistics{
    constructor()
    {
        this.element = document.querySelector('[data-statistics]')
        this.elements = {
            timeSpent: document.querySelector('.time-spent'),
            shotsFired: document.querySelector('.shots-fired'),
            enemiesDestroyed: document.querySelector('.enemies-destroyed'),
            bossesDestroyed: document.querySelector('.bosses-destroyed')
        }
        
    }
    show(){
        this.element.classList.remove('hide')
    }
    hide()
    {
        this.element.classList.add('hide')
    }
    updateElements(score, shotsFired, enemiesDestroyed, bossesDestroyed)
    {
        this.elements.timeSpent.textContent = score;
        this.elements.shotsFired.textContent = shotsFired;
        this.elements.enemiesDestroyed.textContent = enemiesDestroyed;
        this.elements.bossesDestroyed.textContent = bossesDestroyed
    }
}