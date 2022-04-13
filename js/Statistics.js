export class Statistics{
    constructor()
    {
        this.element = document.querySelector('[data-statistics]')
        this.elements = {
            timeSpent: document.querySelector('.time-spent'),
            shotsFired: document.querySelector('.shots-fired'),
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
        
    }
}