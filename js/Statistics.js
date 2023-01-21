export class Statistics{
    constructor()
    {
        this.element = document.querySelector('[data-statistics]')
        this.elements = {
            timeSpent: document.querySelector('.time-spent'),
            shotsFired: document.querySelector('.shots-fired'),
            enemiesDestroyed: document.querySelector('.enemies-destroyed'),
            bossesDestroyed: document.querySelector('.bosses-destroyed'),
            backButton: document.querySelector('[data-back-buttton]')
        }
        
    }
    show(){
        this.element.classList.remove('hide')
        console.log(this.element)
    }
    hide()
    {
        this.element.classList.add('hide')
    }
    updateElements(time, shotsFired, enemiesDestroyed, bossesDestroyed)
    {
        const thisTime = new Date()
        const spentTime = ((thisTime - time)/1000)
        const typeTime = () => {
            if(spentTime/60<1) return `${spentTime} seconds`;
            else if(spentTime/60>=1) return `${(spentTime/60).toFixed(2)} minutes`;

        }
        this.elements.timeSpent.textContent = `Time spent: ${typeTime()}`;
        this.elements.shotsFired.textContent = `Shots fired: ${shotsFired}`;
        this.elements.enemiesDestroyed.textContent = `Enemies destroyed: ${enemiesDestroyed}`;
        this.elements.bossesDestroyed.textContent = `Bosses destroyed: ${bossesDestroyed}`
    }
}