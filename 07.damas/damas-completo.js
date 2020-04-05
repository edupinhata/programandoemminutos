
const HEIGHT = 400;
const WIDTH  = 400;
const color = ['black', 'white', 'orange', 'purple']
const peca_color = ['azure', 'darkblue']

class Peca{

    constructor(x, y, width, height, player){
        this.x = x+(width/2);
        this.y = y+(height/2);
        this.width = width-6;
        this.height = height-6;
        this.player = player // may be 0 or 1
    }

    draw() {
       fill(peca_color[this.player]);
       ellipse(this.x, this.y, this.width, this.height); 
    }

}

class TabuleiroSquare{
    constructor(x, y, width, height, cor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.peca = 0;
        this.cor = cor;
        this.active = false;
        this.neighbor = false;
    }
    
    // Verifica se o ponto x, y está dentro 
    // do quadrado.
    is_inside(x, y) {
        if (this.x <= x && x <= this.x+this.width &&
            this.y <= y && y <= this.y+this.height)
            return true;
        return false;
    }

    toggle() {
        if (this.active)
            this.deactivate();
        else
            this.activate();
    }
    
    activate(){
        if (! this.active) 
            this.active = true;
    }

    deactivate(){
        if (this.active)
            this.active = false;
    }

    toggle_neighbor() {
        if (this.neighbor)
            hide_neighbor();
        else
            show_neighbor();
    }

    show_neighbor() {
        this.neighbor = true;
    }

    hide_neighbor() {
        this.neighbor = false;
    }

    draw(){
        if (this.active)
            fill(color[2]);
        else if (this.neighbor)
            fill(color[3]);
        else
            fill(color[this.cor]);

        rect(this.x, this.y, this.width, this.height);
    }
}


class Tabuleiro{

    constructor(){
        this.casas_x = 8;
        this.casas_y = 8;
        this.casa_x_size = (WIDTH/this.casas_x);
        this.casa_y_size = (HEIGHT/this.casas_y);

        this.quadrados = [];
        this.matrix = [];
        this.init_quadrados();
        this.init_matrix();

    }

    init_quadrados(){
        let cor_atual_idx = 0;
        for ( let x=0; x<this.casas_x; x++ ) {
            cor_atual_idx = x%2;
            this.quadrados.push([]);
            for ( let y=0; y<this.casas_y; y++) {
                let ts = new TabuleiroSquare(x*this.casa_x_size, y*this.casa_y_size, 
                                  this.casa_x_size, this.casa_y_size, cor_atual_idx);
                this.quadrados[x].push(ts);
                cor_atual_idx = (cor_atual_idx + 1)%2;
            }
        }
    }

    init_matrix(){
        // Fill all the matrix with -1
        for (let x=0; x<this.casas_x; x++) {
            let line = []
            for (let y=0; y<this.casas_y; y++)
                line.push(-1);
            this.matrix.push(line);
        }

        // Adicionar peças dp Player 1
        for (let x=0; x<this.casas_x; x++)
            for (let y=0; y<3; y++) {
                if ( this.quadrados[x][y].cor == 0 )
                    this.matrix[x][y] = 1;
            }

         // Adicionar peças dp Player 2
        for (let x=0; x<this.casas_x; x++)
            for (let y=this.casas_y-3; y<this.casas_y; y++) {
                if ( this.quadrados[x][y].cor == 0 )
                    this.matrix[x][y] = 0;
            }
   }

    draw_quadrados(){
        for ( let row of this.quadrados ) {
            for ( let quadrado of row )
                quadrado.draw();
        }
    }

    deactivate_quadrados(){
        for ( let row of this.quadrados ) {
            for ( let quadrado of row )
                quadrado.deactivate();
        }
    }

    get_activated(){
        for ( let row of this.quadrados ) {
            for ( let quadrado of row ){
                if (quadrado.active)
                    return quadrado;
            }
        }
        return null;
    }

    limpa_selecao() {
        for ( let row of this.quadrados ) {
            for ( let quadrado of row ) {
                // Limpa todas as seleções
                quadrado.deactivate()
                quadrado.hide_neighbor()
            }
        }
    }

    draw_pecas(){
        for ( let row_idx=0; row_idx<this.casas_x; row_idx++) {
            for ( let col_idx=0; col_idx<this.casas_y; col_idx++ ) {
                let peca = this.matrix[row_idx][col_idx];
                if ( peca != -1 ) {
                    let p = new Peca(row_idx * this.casa_x_size, col_idx * this.casa_y_size,
                        this.casa_x_size, this.casa_y_size, peca)
                    p.draw()
                }
            }
        }
    }

    // Return true if the point x, y is inside
    // the matrix size.
    is_inside(x,y){
        if ( 0 <= x && x < this.casas_x 
            && 0 <= y && y < this.casas_y)
            return true;
        return false;
    }

    is_empty(x, y){
        if (this.matrix[x][y] == -1)
            return true;
        return false;
    }

    // Returns the neighbors that can be movable.
    get_movable_neighbors(x,y) {
        let neigh = [ [x+1,y+1], [x+1,y-1],
                      [x-1, y+1], [x-1, y-1] ];
        let movable = []
        for ( let idx=0; idx<neigh.length; idx++ ) {
            let n_x = neigh[idx][0];
            let n_y = neigh[idx][1];
            if ( this.is_inside(n_x, n_y) && this.is_empty(n_x, n_y) )
                movable.push(neigh[idx]); 
        }
        return movable;
    }

    get_eatable_neighbors(x,y,player) {
        let neigh = [ [x+1, y+1], [x+1, y-1],
                    [x-1,y+1], [x-1, y-1] ];
        let before_eat = [ [x+2, y+2], [x+2, y-2],
                    [x-2,y+2], [x-2, y-2] ];
        let after_eat = [];
        let other_player = (player + 1) % 2;
        // Start by the set of neighbors
        for ( let idx=0; idx<neigh.length; idx++ ) {
            let n_x = neigh[idx][0];
            let n_y = neigh[idx][1];
            let be_x = before_eat[idx][0];
            let be_y = before_eat[idx][1];

            if ( this.is_inside(n_x, n_y) &&
                 this.is_inside(be_x, be_y) &&
                 this.matrix[n_x][n_y] == other_player &&
                 this.is_empty(be_x, be_y) ) {
                after_eat.push( before_eat[idx] );
            }
        }
        return after_eat;
    }

    get_matrix_position(x, y){
        let m_x = Math.floor(x/width*this.casas_x);
        let m_y = Math.floor(y/height*this.casas_y);
        return [ m_x, m_y ];
    }

    show_possible_moves(x, y, player){
        let movable = this.get_movable_neighbors(x, y);
        let eatable = this.get_eatable_neighbors(x, y, player);
        for ( let n of movable.concat(eatable) ) {
            let n_x = n[0];
            let n_y = n[1];
            this.quadrados[n_x][n_y].show_neighbor();
        }
    }
    
    draw(){
        this.draw_quadrados();     
        this.draw_pecas();
    }
}

var tabuleiro;
var current_player = 0;
var selecionado = false;
var ultima_peca_pos;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    tabuleiro = new Tabuleiro();
}


function draw() {
    background(220); 
    tabuleiro.draw();
}


function seleciona_peca() {
    tabuleiro.limpa_selecao();

    for ( let row of tabuleiro.quadrados ) {
        for ( let quadrado of row ) {
            // seleciona o quadrado que foi clicado.
            if (quadrado.is_inside(mouseX, mouseY) ) {
                let x = quadrado.x;
                let y = quadrado.y;
                let pos = tabuleiro.get_matrix_position(x, y);
                if ( tabuleiro.matrix[pos[0]][pos[1]] == current_player ) {
                    quadrado.toggle();
                    tabuleiro.show_possible_moves(pos[0], pos[1], current_player);
                    return [pos[0], pos[1]];
                }
            }
        }
    }
    return [null, null];
}

// Move peça localizada na posição x, y
function move_peca(x, y) {
    for ( let row of tabuleiro.quadrados ) {
        for ( let quadrado of row ) {
            // seleciona o quadrado que foi clicado.
            if (quadrado.is_inside(mouseX, mouseY) &&
                quadrado.neighbor){
                //Move peca na matrix
                let pos = tabuleiro.get_matrix_position(quadrado.x, quadrado.y);
                tabuleiro.matrix[x][y] = -1;             
                tabuleiro.matrix[pos[0]][pos[1]] = current_player;
                current_player = (current_player + 1) % 2;
                console.log("Vez do jogador", current_player);
            }
        }
    }
    
    tabuleiro.limpa_selecao();
}


function mouseClicked() {
    if ( ! selecionado ) {
        ultima_peca_pos = seleciona_peca();
        if (ultima_peca_pos[0] != null)
            selecionado = true;
    }
    else {
        let x = ultima_peca_pos[0];
        let y = ultima_peca_pos[1];
        if ( x != null && y != null ) {
            move_peca(x, y);
            selecionado = false;
        }
    }
}
