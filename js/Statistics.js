export class Statistics{
    constructor()
    {
        this.element = document.querySelector('[data-statistics]')
        this.elements = {
            timeSpent: document.querySelector('.time-spent'),
            shotsFired: document.querySelector('.shots-fired'),
            enemiesDestroyed: document.querySelector('.enemies-destroyed')
        }
        
    }
    show(){
        this.element.classList.remove('hide')
    }
    hide()
    {
        this.element.classList.add('hide')
    }
    updateElements()
    {
        this.elements.timeSpent.textContent = score;
        this.elements.shotsFired.textContent = shotsFired;
        this.elements.enemiesDestroyed.textContent = enemiesDestroyed;
    }
}