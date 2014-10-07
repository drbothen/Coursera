# "Stopwatch: The Game"
import simplegui as s

# define global variables
t_value = 0
g_won = 0
g_played = 0

# define helper function format that converts time
# in tenths of seconds into formatted string A:BC.D
def format(t):
    # format the time as M:SS:s
    # Minutes:Seconds:Tenths
    min = t / 600
    tens_sec = (t / 100) % 6
    ones_sec = (t / 10) % 10
    frac_sec = t % 10



    return str(min) + ":" + str(tens_sec) + str(ones_sec) + "." + str(frac_sec)

# define event handlers for buttons; "Start", "Stop", "Reset"
def start_button_handler():
    # start the stopwatch and mark the state that it
    # is running
    timer.start()

def stop_button_handler():
    global g_played, g_won
    if timer.is_running() == False:
        return
    else:
        timer.stop()

    # make sure stopwatch was actually running to register a game
   # if timer.is_running():
        # increment g_played
        g_played += 1

        # check if the player won
        # win is tenths of a seconds = 0
        if t_value % 10 == 0:
            g_won += 1

    # mark the state as not running
    #isStopwatchRunning = False

def reset_button_handler():
    # stop the times and reset the stopwatch
    # and game counters
    global t_value, g_played, g_won
    timer.stop()
    #isStopwatchRunning = False
    t_value = 0
    g_won = 0
    g_played = 0

# define event handler for timer with 0.1 sec interval
def timer_handler():
    global t_value
    t_value += 1

timer = s.create_timer(100, timer_handler)

# define draw handler
def draw_handler(canv):
    # draw the timer
    canv.draw_text(format(t_value), [40, 200], 65, "Green", "monospace")

    # draw the scores
    canv.draw_text(str(g_won) + " / " + str(g_played), [150, 50], 35, "Red", "monospace")

# create frame
f = s.create_frame("Stopwatch Game", 300, 300)

# register event handlers
f.add_button("Start", start_button_handler, 100)
f.add_button("Stop", stop_button_handler, 100)
f.add_button("Reset", reset_button_handler, 100)
f.set_draw_handler(draw_handler)

# start frame
f.start()
