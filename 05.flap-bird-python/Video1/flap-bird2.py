# Jogo do Fllappy Bird
from tkinter import *
import random

gravidade = 10
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
        self.pon = 1

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
        self.b = bird(10, 10)
        self.c = cano(30, 150, largura)
        self.init = 0

        self.window.bind('<Up>', self.comandoUp)


    def comandoUp(self, event):
        self.b.up = 6
        self.init = 1


    def run(self):
        while(True):
            self.canvas.delete('all')

            #desenhar os objetos
            self.canvas.create_oval(self.b.x-self.b.size, self.b.y-self.b.size, self.b.x+self.b.size, self.b.y+self.b.size, fill='yellow', tags='bird')
            self.canvas.create_polygon(self.c.getCanoSup(), fill='green', tags='canoS')
            self.canvas.create_polygon(self.c.getCanoInf(), fill='green', tags='canoI')
            self.canvas.create_polygon(self.c.getCanoMeio(), fill='', tags='meio')

            #mover os objetos
            if(self.init==1):
                self.b.moveUp()
                self.b.moveDown()
                self.c.move(self.b.vHor)

            #atualizar o side-scroller
            if(self.c.x<-self.c.L):
                self.c = cano(30, 150, largura)

            self.canvas.after(50)
            self.window.update_idletasks()
            self.window.update()



g = game()
g.run()




