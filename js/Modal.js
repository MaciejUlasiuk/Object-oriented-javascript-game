export class Modal{
    constructor()
    {
        this.element = document.querySelector('[data-modal]')
        this.elements = {

        }
    }
    show(){
        this.element.classList.remove('hide')
    }
    hide()
    {
        this.element.classList.add('hide')
    }
}