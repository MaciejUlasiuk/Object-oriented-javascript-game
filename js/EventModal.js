export class EventModal {
    constructor()
    {
        this.element = document.querySelector('[data-eventModal]');
        this.content = document.querySelector('.eventInfo');
    }
    show(){
        this.element.classList.remove('hide')
    }
    hide(){
        this.element.classList.add('hide')
    }
    showInformation(info){
        this.show();
        this.content.textContent = info;
        setTimeout(()=>this.hide(),3000);
    }
    
}