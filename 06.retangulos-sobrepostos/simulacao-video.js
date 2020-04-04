//
// Esta função é executada antes da função
// draw.
//
function setup() {
  createCanvas(400, 400);
  A1 = 100;
  L1 = 100;
  pos = point_in_canvas(A1, L1)
  x1 = pos[0];
  y1 = pos[1];
  
  A2 = 100;
  L2 = 120;
  pos = point_in_canvas(A2, L2)
  x2 = pos[0];
  y2 = pos[1];
}

//
// Loop principal. Ele é repetido diversas vezes
// enquanto a página estiver aberta.
//
function draw() {
  background(220);
  if (sao_sobrepostos( x1, y1, L1, A1, x2, y2, L2, A2))
    fill('red');
  else
    fill('green');
  rect(x1, y1, L1, A1);
  rect(x2, y2, L2, A2);
}

//
// Retorna um ponto aleatório dentro do canvas.
//
function point_in_canvas(A, L) {
   my_x = Math.random()*(400-L);
   my_y = Math.random()*(400-A);
  
   return [my_x, my_y];
}

//
// Verifica se dois retangulos estão sobrepostos.
// Retorna true se forem sobrepostos, retorna false
// se NÃO forem sobrepostos.
//
function sao_sobrepostos(x1, y1, L1, A1, x2, y2, L2, A2){
    // Calcula a diferença entre a posição 
    // x e y dos dois retangulos
   delta_x = Math.abs(x1-x2);
   delta_y = Math.abs(y1-y2);
   let L, A; 
 
    // verifica qual a largura e altura
    // de qual retangulo devem ser comparadas.
   if (x1 < x2 )
     L = L1;
   else
     L = L2;
   if ( y1 < y2)
     A = A1;
   else
     A = A2;
 
    // a diferenca entre x'ses e y'ons deve
    // ser maior ou igual que a largura e 
    // altura do quadrado quee stiver mais
    // a esquerda e acima, respectivamente.
   if ( delta_x >= L || delta_y >= A )
     return false;
   return true;
}      
