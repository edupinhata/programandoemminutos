/*  
 *  Programa de detecção de retângulos sobrepostos
 *
 * Este programa cria diversos retângulos na tela
 * e faz com que eles se movimentem de modo aleatório 
 * em um canvas.
 *
 * Programa feito para o canal PinhataDev, no quadro 
 * Programando em Minutos 06
 *
 * Autor: Eduardo Pinhata
 * Data: 03/04/2020
 *
 */

// Inicializa as constantes e variáveis.
const X = 0;
const Y = 1;
var r1;
var r2;
var num_retangulos=100;
var retangulos;
var HEIGHT=500;
var WIDTH=500;

// Inicializa as variáveis
function setup() { 
    createCanvas(WIDTH, HEIGHT);
    
    let altura = 30;
    let largura = 30;
    retangulos = [];
    
    for ( let i=0; i<num_retangulos; i++){
       retangulos.push(new retangulo(i, largura, altura)); 
    }
}

// Loop principal. Fica executando diversas vezes.
function draw() {
    // Recebe o valor do slider na página HTML para controlar a quantidade de 
    // retângulos na página. 
    new_num_retangulos = parseInt(document.getElementById("slider").value);
    // Se houve mudanca na quantidade de retângulos:
    // detecta quando o slide foi movido e inicia uma
    // nova simulação.
    if ( num_retangulos != new_num_retangulos ){
          num_retangulos = new_num_retangulos;
          setup();
          document.getElementById("num_ret").innerHTML = num_retangulos;
    }
    // Se não houve mudaças, continua a execução normal
    else{
        background(220);
        for (const ret of retangulos){
           ret.move()
        }
        for (const ret of retangulos){
           ret.detect_colision(retangulos);
           ret.draw();
        }
    }
}

// verifica se dois retangulos são sobrepostos
// @param pos1|pos2: posição dos retãngulos 1|2. Formato: [x, y]
function sobreposto(pos1, lar1, alt1, pos2, lar2, alt2) {
    let alt, lar;

    // Verifica que altura e largura deve comparar.
    // Sempre compara a largura do retângulo mais a esquerda
    // Sempre compara a altura do retângulo mais acima.
    if (pos1[X] > pos2[X])
      lar = lar2;
    else
      lar = lar1;
    if (pos1[Y] > pos2[Y])
      alt = alt2;
    else
      alt = alt1;
    
    delta_x = Math.abs(pos1[X] - pos2[X]);
    delta_y = Math.abs(pos1[Y] - pos2[Y]);
   
    // A altura OU a largura ser maior que a diferença
    // entre y e x, respectivamente é o suficiente.
    if (delta_x >= lar || delta_y >= alt)
      return false;
    return true;
}

// Classe para instanciar os retângulos que serão 
// desenhados.
class retangulo { 
  
     constructor(id, largura, altura) { 
         this.id = id;
         this.largura = largura;
         this.altura = altura;
         this.pos = this.random_pos(); 
         this.speed = this.random_speed();
         this.color = 'green';
     }
    
    // Muda a posição do retângulo de acordo com a
    // velocidade. 
    move() {
        let next_x = this.pos[X] + this.speed[X];
        let next_y = this.pos[Y] + this.speed[Y];
       
        // Condições para que o retângulo não saia 
        // do canvas.
        if ( next_x > (WIDTH-this.largura) ){
            this.speed[X] *= -1;
            next_x = WIDTH-this.largura;
        }
        else if (next_x < 0){
            this.speed[X] *= -1;
            next_x = 0;
        }
        if ( next_y > (HEIGHT-this.altura) ){
           this.speed[Y] *= -1;
           next_y = HEIGHT-this.altura;
        }
        else if( next_y < 0 ) {
            this.speed[Y] *= -1;
            next_y = 0; 
        }
        
        this.pos[X]=next_x;
        this.pos[Y]=next_y;
    }
   
    // Retorna uma posição aleatória no canvas.
    random_pos() {
      let x = Math.random()*(WIDTH-this.largura);
      let y = Math.random()*(HEIGHT-this.altura);
      return [x, y];
    }
   
    // Retorna uma velocidade aleatória.
    random_speed() {
       let sx = Math.random()*3 + 1;
       let sy = Math.random()*3 + 1;
       return [sx, sy];
    }

    // Detecta quando o retângulo colide com um dos 
    // retângulos na lista de @param retangulos.
    detect_colision(retangulos) {
        this.color = 'green';
        for (const ret of retangulos) {
           if (ret.id != this.id){
               if (sobreposto(this.pos, this.largura, this.altura,
                              ret.pos, ret.largura, ret.altura)){
                 this.color = 'red';
                 break;
               }
           }
        }
    }
   
    // Desenha o retângulo no canvas.
    draw() {
      fill(this.color);
      rect(this.pos[X], this.pos[Y], this.largura, this.altura);
    }
}

