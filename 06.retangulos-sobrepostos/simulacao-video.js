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

function draw() {
  background(220);
  if (sao_sobrepostos( x1, y1, L1, A1, x2, y2, L2, A2))
    fill('red');
  else
    fill('green');
  rect(x1, y1, L1, A1);
  rect(x2, y2, L2, A2);
}

function point_in_canvas(A, L) {
   my_x = Math.random()*(400-L);
   my_y = Math.random()*(400-A);
  
   return [my_x, my_y];
  
}

function sao_sobrepostos(x1, y1, L1, A1, x2, y2, L2, A2){
   delta_x = Math.abs(x1-x2);
   delta_y = Math.abs(y1-y2);
   let L, A; 
  
   if (x1 < x2 )
     L = L1;
   else
     L = L2;
   if ( y1 < y2)
     A = A1;
   else
     A = A2;
  
   if ( delta_x >= L || delta_y >= A )
     return false;
   return true;
}      
