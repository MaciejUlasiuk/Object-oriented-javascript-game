export class Highscores{
    constructor()
    {
        this.element = document.querySelector('[data-highscores]');
        this.content = document.querySelector('[data-highscores-content]');
        this.backBtn = document.querySelector('[data-back-button-hs]');
    }
    show(){
        this.element.classList.remove('hide')
    }
    hide(){
        this.element.classList.add('hide')
    }
    updateHighscores(highscores){
        if(highscores.length>0)
        {
        document.querySelector('[data-highscores-content]').textContent = ''
       const sortedHighscores = highscores.sort((a,b)=>a+b).reverse()
       let num = 1
       console.log(sortedHighscores)
       sortedHighscores.forEach(score =>{
        const p = document.createElement('p')
        
        p.textContent = `${num} : ${score} points`
        
        document.querySelector('[data-highscores-content]').appendChild(p);
       // p.classList.add('help-paragraph')
        num++
       })
    }
    else{
        document.querySelector('[data-highscores-content]').textContent = ''
        const p = document.createElement('p')
        p.textContent = 'Zero scores yet!'
        document.querySelector('[data-highscores-content]').appendChild(p);
    }
    }
}