# template for "Guess the number" mini-project
# input will come from buttons and an input field
# all output for the game will be printed in the console
import simplegui as s
import random as r

rang_sel = 0
secret_number = 0
guesses = 0
# helper function to start and restart the game
def new_game():
    # initialize global variables used in your code here
    global secret_number, rang_sel, guesses

    if rang_sel == 0:
        print "New game. Range is from 0 to 100"
        secret_number = r.randint(0, 100)
        guesses = 7
        print "Number of remaining guesses", guesses

    elif rang_sel == 1:
        print "New game. Range is from 0 to 1000"
        secret_number = r.randint(0, 1000)
        guesses = 10
        print "Number of remaining guesses", guesses

    else:
        print "rang_sel has been set to a number not recognized", rang_sel # error captureing




# define event handlers for control panel
def range100():
    # button that changes the range to [0,100) and starts a new game
    global rang_sel
    rang_sel = 0
    print""
    new_game()


def range1000():
    # button that changes the range to [0,1000) and starts a new game
    global rang_sel
    rang_sel = 1
    print""
    new_game()


def input_guess(guess):
    global guesses
    # main game logic goes here
    guesses -= 1


    print ""
    print "Guess was", guess
    print "Number of remaining guesses is", guesses

    if guesses == 0:
      print "You ran out of guesses.  The number was", secret_number
      print ""
      new_game()
    elif int(guess) > secret_number:
        print "Lower!"
    elif int(guess) < secret_number:
        print "Higher!"
    elif int(guess) == secret_number:
        print "Correct!"
        print ""
        new_game()
    else:
        print "Something weird has happen"







# create frame
f = s.create_frame("Guess The Number", 100, 200)


# register event handlers for control elements and start frame
f.add_button("Restart Game", new_game)
f.add_button("Range: 0 - 100",range100)
f.add_button("Range: 0 - 1000",range1000)
f.add_input("What is your Guess?", input_guess, 100)
f.start()

# call new_game
new_game()


# always remember to check your completed program against the grading rubric

