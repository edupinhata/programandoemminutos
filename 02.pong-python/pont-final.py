#!/usr/bin/env python3
from tkinter import *

largura = 600
altura = 400
barLar = 20
barAlt = 80


class square:

    def __init__(self, x, y, largura, altura):
        self.x = x
        self.y = y
        self.largura = largura
        self.altura = altura
        self.dim = [0,0, barLar,0, barLar,barAlt, 0,barAlt]

    def pos(self):
        return [x + y for x, y in zip([self.x, self.y, self.x, self.y,self.x, self.y,self.x, self.y], self.dim)]


class bola:

    def __init__(self, x, y, raio, velx, vely):
        self.x= x
        self.y = y
        self.raio = raio
        self.velx = velx
        self.vely = vely


    def update(self):
        self.y += self.vely
        self.x += self.velx
        
        if(self.y < 0):
            self.vely = -self.vely
        if(self.y > altura-self.raio):
            self.vely = -self.vely




class Game:

    def __init__(self):
        self.window = Tk()
        self.canvas = Canvas(self.window, width=largura, height=altura,  bg='black')
        self.canvas.pack()

        self.player = square(0, altura/2, barLar, barAlt)
        self.comp   = square(largura-barLar, altura/2, barLar, barAlt)
        self.bola = bola(largura/2, altura/2, 5, -5, 5)

        self.window.bind("<Up>", self.moveUp)
        self.window.bind("<Down>", self.moveDown)
                    
   
    def moveUp(self, event):
        if(self.player.y>0):
            self.player.y -= 10

    def moveDown(self,event):
        if(self.player.y< altura-barAlt):
            self.player.y+= 10


    def run(self):
        while(True):
            self.canvas.delete('all')

            self.canvas.create_polygon(self.player.pos(), fill='white')
            self.canvas.create_polygon(self.comp.pos(), fill='white')
            x = self.bola.x
            y = self.bola.y
            r = self.bola.raio

            self.canvas.create_oval(x-r, y-r, x+r, y+r, fill='yellow')


            # rebater a bola
            if((x>=0 and x<=barLar) and (y>=self.player.pos()[1] and y<=self.player.pos()[5])):
                self.bola.velx *= -1
            if((x>=largura-barLar and x<=largura) and (y>=self.comp.pos()[1] and y<=self.comp.pos()[5])):
                self.bola.velx *= -1



            # jogo acaba
            if(x<0 or x>largura):
                print('Game OVER!!!')
                exit(0)

            # inteligencia artificial
            metade = self.comp.pos()[1]+barAlt/2
            if(y< metade and self.comp.pos()[1]>0):
                self.comp.y -= 5

            if(y> metade and self.comp.pos()[5]<altura):
                self.comp.y += 5
            

            self.bola.update()


            self.canvas.after(50)
            self.window.update_idletasks()
            self.window.update()


g = Game()
g.run()
    


