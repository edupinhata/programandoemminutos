#!/usr/bin/env python3

width = 300
height = 600
square = 60
matrix = []

class Game:

    def __init__(self):
        self.window = Tk()
        self.canvas = Canvas(self.window, bg='black', width=width, height=height)
        self.canvas.pack()
