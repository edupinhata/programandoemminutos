const X = 0;
const Y = 1;
var r1;
var r2;
var num_retangulos=100;
var retangulos;
var HEIGHT=800;
var WIDTH=600;

function setup() { 
  createCanvas(WIDTH, HEIGHT);
  
  let altura = 10;
  let largura = 10;
  retangulos = [];
  
  for ( let i=0; i<num_retangulos; i++){
     retangulos.push(new retangulo(i, largura, altura)); 
  }
}

function draw() {
  background(220);
  for (const ret of retangulos){
     ret.move()
  }
  for (const ret of retangulos){
     ret.detect_colision(retangulos);
     ret.draw();
  }
}


function sobreposto(pos1, lar1, alt1, pos2, lar2, alt2) {
  let alt, lar;
  
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
  
  if (delta_x >= lar || delta_y >= alt)
    return false;
  return true;
}




class retangulo { 
  
   constructor(id, largura, altura) { 
     this.id = id;
     this.largura = largura;
     this.altura = altura;
     this.pos = this.random_pos(); 
     this.speed = this.random_speed();
     this.color = 'green';
   }
  
   move() {
      
      let next_x = this.pos[X] + this.speed[X];
      let next_y = this.pos[Y] + this.speed[Y];
     
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
  
   random_pos() {
     let x = Math.random()*(WIDTH-this.largura);
     let y = Math.random()*(HEIGHT-this.altura);
     return [x, y];
  }
  
  random_speed() {
     let sx = Math.random()*3 + 1;
     let sy = Math.random()*3 + 1;
     return [sx, sy];
  }

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
  
   draw() {
     fill(this.color);
     rect(this.pos[X], this.pos[Y], this.largura, this.altura);
   }
}

