# Implementation of classic arcade game Pong

import simplegui
import random

# initialize globals - pos and vel encode vertical info for paddles
WIDTH = 600
HEIGHT = 400
BALL_RADIUS = 20
PAD_WIDTH = 8
PAD_HEIGHT = 80
HALF_PAD_WIDTH = PAD_WIDTH / 2
HALF_PAD_HEIGHT = PAD_HEIGHT / 2
LEFT = False
RIGHT = True

ball_pos
ball_vel
paddle1_pos
paddle2_pos
paddle1_vel
paddle2_vel
score1 = 0
score2 = 0

# initialize ball_pos and ball_vel for new bal in middle of table
# if direction is RIGHT, the ball's velocity is upper right, else upper left
def spawn_ball(direction):
    global ball_pos, ball_vel # these are vectors stored as lists


# define event handlers
def new_game():
    global paddle1_pos, paddle2_pos, paddle1_vel, paddle2_vel  # these are numbers
    global score1, score2  # these are ints

def draw(canvas):
    global score1, score2, paddle1_pos, paddle2_pos, ball_pos, ball_vel


    # draw mid line and gutters
    canvas.draw_line([WIDTH / 2, 0],[WIDTH / 2, HEIGHT], 1, "White")
    canvas.draw_line([PAD_WIDTH, 0],[PAD_WIDTH, HEIGHT], 1, "White")
    canvas.draw_line([WIDTH - PAD_WIDTH, 0],[WIDTH - PAD_WIDTH, HEIGHT], 1, "White")

    # update ball

    # draw ball
    canvas.draw_circle(ball_pos, BALL_RADIUS, 1, "White", fill_color = "White")

    # update paddle's vertical position, keep paddle on the screen

    # draw paddles
    canvas.draw_polygon([[, ], [, ], [, ], [, ]], 1, "White", fill_color = "White")
    canvas.draw_polygon([[, ], [, ], [, ], [, ]], 1, "White", fill_color = "White")

    # draw scores
    canvas.draw_text(score1, [50, 50], 12, "White",  "monospace")
    canvas.draw_text(score2, [500, 50], 12, "White",  "monospace")

def keydown(key):
    global paddle1_vel, paddle2_vel

def keyup(key):
    global paddle1_vel, paddle2_vel


# create frame
frame = simplegui.create_frame("Pong", WIDTH, HEIGHT)
frame.set_draw_handler(draw)
frame.set_keydown_handler(keydown)
frame.set_keyup_handler(keyup)


# start frame
new_game()
frame.start()