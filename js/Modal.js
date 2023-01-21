export class Modal{
    constructor()
    {
        this.element = document.querySelector('[data-modal]')
        this.elements = {
            button: document.querySelector('[data-modal-button]'),
            information: document.querySelector('[data-modal-info]')
        }
        
    }
    show(){
        this.element.classList.remove('hide')
    }
    hide()
    {
        this.element.classList.add('hide')
    }
    changeInfo(score){
        this.elements.information.textContent = `Your score: ${score}`
    }
}