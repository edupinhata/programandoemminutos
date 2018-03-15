# Jogo do Fllappy Bird
from tkinter import *
import random

gravidade = 15
altura = 600
largura = 400

class bird:

    def __init__(self, vHor, vVer):
        self.y = altura/2
        self.x = largura/2
        self.vHor = vHor
        self.vVer = vVer
        self.up = 0
        self.size = 10

    def moveUp(self):
        if(self.up > 0):
            self.up -= 1
            self.y -= self.vVer


    def moveDown(self):
        if(self.up == 0):
            self.y += gravidade

class cano:

    def __init__(self, L, E, x):
        self.x  = x
        self.L  = L
        self.A  = random.randint(50, 300)
        self.E  = E
        self.pontuacao = 1

    def move(self, vHor):
        self.x -= vHor

    def getCanoSup(self):
        return [self.x,0, self.x+self.L,0, self.x+self.L,self.A, self.x,self.A]

    def getCanoInf(self):
        return [self.x,self.A+self.E, self.x+self.L,self.A+self.E, self.x+self.L,altura, self.x, altura]

    def getCanoMeio(self):
        return [self.x,self.A, self.x+self.L,self.A, self.x+self.L,self.A+self.E, self.x,self.A+self.E]



class game:

    def __init__(self):
        self.window = Tk()
        self.canvas = Canvas(self.window, width=largura, height=altura,bg='cyan')
        self.canvas.pack()
        self.b = bird(7, 15)
        self.c = [cano(30, 150, largura), cano(30, 150, largura+(largura/2))]
        self.init = 0
        self.pontuacao = 0
    
        self.window.bind('<Up>', self.comandoUp)


    def comandoUp(self, event):
        self.b.up = 6
        self.init = 1


    def run(self):
        while(True):
            self.canvas.delete('all')

            #desenhar os objetos
            b = self.canvas.create_oval(self.b.x-self.b.size, self.b.y-self.b.size, self.b.x+self.b.size, self.b.y+self.b.size, fill='yellow', tags='bird')
            for i in range(len(self.c)):
                cs = self.canvas.create_polygon(self.c[i].getCanoSup(), fill='green', tags='canoS')
                ci = self.canvas.create_polygon(self.c[i].getCanoInf(), fill='green', tags='canoI')
                cm = self.canvas.create_polygon(self.c[i].getCanoMeio(), fill='', tags='meio{}'.format(i))


            self.canvas.create_text((largura-50, 30), text='Pontuação: {}'.format(self.pontuacao))

            #mover os objetos
            if(self.init==1):
                self.b.moveUp()
                self.b.moveDown()
                for i in range(len(self.c)):
                    self.c[i].move(self.b.vHor)

            #atualizar o side-scroller
            for i in range(len(self.c)):
                if(self.c[i].x<-self.c[i].L):
                    self.c[i] = cano(30, 150, largura)

            # verificar colisões
            posB = self.canvas.bbox(b)
            collision = self.canvas.find_overlapping(posB[0], posB[1], posB[2], posB[3])
            for x in collision:
                tagx = self.canvas.gettags(x)[0]
                if(tagx == 'canoS' or tagx == 'canoI'):
                    print("PASSARO DEU DE CARA COM O CANO! D=")
                    quit()
                for i in range(len(self.c)):
                    if(tagx == 'meio{}'.format(i)):
                        self.pontuacao += self.c[i].pontuacao
                        self.c[i].pontuacao = 0

            # verifica quando o passa cai no chao
            if(self.b.y > altura):
                print("PASSARO CAIU NO CHAO! =[")
                quit()

            self.canvas.after(30)
            self.window.update_idletasks()
            self.window.update()



g = game()
g.run()




