# implementation of card game - Memory

import simplegui as s
import random as r

WIDTH = 50
HEIGHT = 100

moves = 0
state = 0
number_list = []
discovered_list = []
attemps_list = [-1, -1]

# helper function to initialize globals
def new_game():
    global number_list, discovered_list, moves, state, attemps_list

    moves = 0
    state = 0
    number_list = range(0, 8)
    number_list.extend(range(0, 8))
    r.shuffle(number_list)
    r.shuffle(number_list)
    r.shuffle(number_list)

    discovered_list = [0] * 16
    attemps_list = [-1, -1]
    label.set_text("Moves = "+str(moves))


# define event handlers
def mouseclick(pos):
    global attemps_list, state, moves

    #get index click
    index = int(pos[0] / WIDTH)

    # First click
    if state == 0:
        if discovered_list[index] == 0:
            if number_list[attemps_list[0]] != number_list[attemps_list[1]]:
                discovered_list[attemps_list[0]] = 0
                discovered_list[attemps_list[1]] = 0

            discovered_list[index] = 1
            state = 1
            attemps_list[0] = index
    # Second click
    elif state  ==  1:
        if(discovered_list[index] == 0):
            state = 0
            discovered_list[index] = 1
            attemps_list[1] = index
            moves = moves + 1
            label.set_text("Moves = "+str(moves))
            if not(0 in discovered_list):
                print "The game ended in "+str(moves)+" moves"

# cards size: 50x100 pixels
def draw(canvas):
    for index in range(0, len(number_list)):
        if(discovered_list[index] == 0):
            canvas.draw_polygon([(WIDTH * index, 0), (WIDTH * (index + 1), 0), (WIDTH * (index + 1), 100),(WIDTH * index, 100)], 3, "Yellow","Green")
        else:
            canvas.draw_text(str(number_list[index]),[WIDTH * index + 10, HEIGHT - 25], 60, "White")


# create frame and add a button and labels
f = s.create_frame("Memory", 800, 100)
f.add_button("Reset", new_game)
label = f.add_label("Turns = 0")

# register event handlers
f.set_mouseclick_handler(mouseclick)
f.set_draw_handler(draw)

# get things rolling
new_game()
f.start()
