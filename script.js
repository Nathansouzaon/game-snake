const tabuleiro = document.querySelector(".board");
const scoreElemento  = document.querySelector(".score");
const highScoreElemento = document.querySelector(".high-score");
const controleElemento = document.querySelectorAll(".controles i");

let fimJogo = false;
let comidaX, comidaY;//sempre tem dimensões
let snakeX = 5, snakeY = 5;//tamanho da cobra
let velocidadeX = 0, velocidadeY = 0;
let corpoCobra = [];
let setIntervalId;
let score = 0;
 


//pegar o high score do local storage para mostrar quanto eu ganhei de pontos o jogo passado
let highScore = localStorage.getItem("high-score") || 0;
highScoreElemento.innerHTML=`High Score: ${highScore}`
//pegando a comida em lugares aleatorios
const atualizarComidaPosicao = () => {
    comidaX = Math.floor(Math.random() * 30) + 1;//pegando posições aleatorias
    comidaY = Math.floor(Math.random() * 30) + 1; 
}

const fimDeJogo = () => {
    clearInterval(setIntervalId);
    alert("Fim de Jogo! Presione OK Para Reniciar");
    location.reload();
}


//atualizar velocidade 
const atualizarDireção = (e) => {
    if(e.key === "ArrowUp" && velocidadeY != 1){
        velocidadeX = 0;
        velocidadeY = -1;

    }else if(e.key === "ArrowDown" && velocidadeY != 1){
        velocidadeX = 0;
        velocidadeY = 1;
    }else if(e.key === "ArrowLeft" && velocidadeX != 1){
        velocidadeX = -1;
        velocidadeY = 0;
    }else if(e.key === "ArrowRight" && velocidadeX != -1){
        velocidadeX = 1;
        velocidadeY = 0;
    }
}
//mudar direção com o click
controleElemento.forEach(botao => botao.addEventListener("click", () => atualizarDireção
({key:botao.dataset.key})))

 const iniciarGame = () => {
    if(fimJogo) return fimDeJogo();
    let html = `<div class="comida" style="grid-area: ${comidaY}/${comidaX}"></div>`

    //onde a cobra come
    //se a posição da cobra for igual a posição da comida
    if(snakeX === comidaX && snakeY === comidaY){
        atualizarComidaPosicao();
        corpoCobra.push([comidaY, comidaX])//adiciona comida para o corpo da cobra;
        score++;
        highScore = score >= highScore ? score : highScore;


        localStorage.setItem("high-score", highScore);
        scoreElemento.innerHTML = `Score: ${score}`;
        highScoreElemento.innerHTML = `High-Score: ${highScore}`
    }

    //atualiza a velocidade da cobra
    snakeX += velocidadeX;
    snakeY += velocidadeY;

    //pegando o tamanho todo da cobra do array
    for(let i = corpoCobra.length - 1; i > 0; i--){
        corpoCobra[i]= corpoCobra [i - 1];//passando o indice para o loop percorrer o corpo da cobra
    }
    //o corpo da cobra começa com a posição 0, e nas dimensoes iniciais x e y
    corpoCobra[0] = [snakeX, snakeY];

    //verifique se o corpo da cobra está fora da parede ou não
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        return fimJogo = true;
    }

    //adicione div para cada parte do corpo da cobra
    for(let i = 0; i < corpoCobra.length; i++){
        html += `<div class="head" style="grid-area:${corpoCobra[i][1]} / ${corpoCobra[i][0]} "></div>`
    //verificando se a cabeça da cobra tomou dano
    
     if(i !== 0 && corpoCobra[0][1] === corpoCobra[i][1] && corpoCobra[0][0] === corpoCobra[i][0]){
        fimJogo = true;
     }
}

    tabuleiro.innerHTML = html;
 }

 atualizarComidaPosicao();
 setIntervalId = setInterval(iniciarGame, 100);
 document.addEventListener("keyup", atualizarDireção);