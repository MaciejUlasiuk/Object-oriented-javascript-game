export class LevelBar{
    constructor()
    {
        this.element = document.createElement('div')
        this.element.classList.add('levelBar')
        document.querySelector('[data-container]').appendChild(this.element)
    }
    hide(){
        this.element.classList.add('hide')
    }
    show(){
        this.element.classList.remove('hide')
    }
    updateLvl(exp, expToLevel){
        this.element.style.width = `${((exp*100)/expToLevel).toFixed(0)}%`
        this.element.textContent = `${((exp*100)/expToLevel).toFixed(0)}%`
    }
}