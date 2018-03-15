#!/usr/bin/env python3
from tkinter import *


width = 600
height = 400
barWidth = 20
barHeight = 80


class square:

    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.dim = [0,0, width,0, width, height, 0, height] 


    def pos(self):
        return [x + y for x,y in zip([self.x,self.y,self.x,self.y,self.x,self.y,self.x,self.y], self.dim)]

       
class circle:

    def __init__(self, x, y, speedx, speedy, radius):
        self.x = x
        self.y = y
        self.speedx = speedx
        self.speedy = speedy
        self.radius = radius
       
    def update(self):
        self.x += self.speedx
        self.y += self.speedy
        if(self.y < 0 or self.y > height):
            self.speedy = -self.speedy

       

class Game:

    def __init__(self):
        self.window = Tk()
        self.canvas = Canvas(self.window, bg='black', width=width, height=height)
        self.canvas.pack()

        self.playerBar = square(0, height/2-barHeight/2, barWidth, barHeight)
        self.compBar   = square(width-barWidth, height/2-barHeight/2, barWidth, barHeight)
        self.ball      = circle(width/2, height/2, -6, 5, 5)

        self.window.bind("<Up>", self.moveUp)
        self.window.bind("<Down>", self.moveDown)

    def moveUp(self, event):
        if(self.playerBar.y > 0):
            self.playerBar.y -= 10

    def moveDown(self, event):
        if(self.playerBar.y < height -barHeight + 10):
            self.playerBar.y += 10



    def run(self):
        while(True):
            self.canvas.delete('all')

            # draw everything
            barPos = self.playerBar.pos()
            compPos = self.compBar.pos()
            r = self.ball.radius
            x = self.ball.x
            y = self.ball.y

            self.canvas.create_polygon(self.playerBar.pos(), fill='white')
            self.canvas.create_polygon(self.compBar.pos(), fill='white')
            self.canvas.create_oval(x-r, y-r, x+r, y+r, fill='blue')

            # bounce ball
            if(((x>=0 and x <= barWidth) and (y>= barPos[1] and y<= barPos[5])) or ((x<=width and x >=width-barWidth) and  (y>=compPos[1] and y<=compPos[5]))):
                self.ball.speedx *= -1
            
            # end game
            if(x<0 or x>width):
                print('GAME OVER!')
                self.window.destroy()
                break;

            # ia
            if(y > compPos[1] + barHeight/2 and self.compBar.y< height - barHeight - 5):
                self.compBar.y += 5
            if(y < compPos[1] + barHeight/2 and self.compBar.y> 0+5):
                self.compBar.y -= 5

            #update ball
            self.ball.update()

            self.canvas.after(50)
            self.window.update_idletasks()
            self.window.update()


for i in range(3):
    g = Game()
    g.run()
