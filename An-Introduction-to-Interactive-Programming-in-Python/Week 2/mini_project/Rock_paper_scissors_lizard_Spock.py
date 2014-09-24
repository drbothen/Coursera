import random as r

'''
0 beats 4 3
0 looses 1 2
1 beats 0 4
1 looses 2 3
2 beats 1 0
2 looses 3 4
3 beats 2 1
3 looses 4 0
4 beats 3 2
4 looses 0 1
'''


# Rock-paper-scissors-lizard-Spock template


# The key idea of this program is to equate the strings
# "rock", "paper", "scissors", "lizard", "Spock" to numbers
# as follows:
#
# 0 - rock
# 1 - Spock
# 2 - paper
# 3 - lizard
# 4 - scissors

# helper functions
'''
Title: Rock-paper-scissors-lizard-Spock Program
Description: This simulates a game named after the title of the program
'''

'''Converts a name to a number for calulation'''
def name_to_number(name):

    # delete the following pass statement and fill in your code below
    if name.lower() == 'rock':
        nreturn = 0
        return nreturn
    elif name.lower() == 'spock':
        nreturn = 1
        return nreturn
    elif name.lower() == 'paper':
        nreturn = 2
        return nreturn
    elif name.lower() == 'lizard':
        nreturn = 3
        return nreturn
    elif name.lower() == 'scissors':
        nreturn = 4
        return nreturn
    else:
        print "Try again this choice is out of bounds"
        return

'''converts a number to a name'''
def number_to_name(number):
    # delete the following pass statement and fill in your code below
    if number > 4 or number < 0:
        print "Try again this choice is out of bounds"
        return
    elif number == 0:
        nreturn = 'rock'
        return nreturn
    elif number == 1:
        nreturn = 'Spock'
        return nreturn
    elif number == 2:
        nreturn = 'paper'
        return nreturn
    elif number == 3:
        nreturn = 'lizard'
        return nreturn
    else:
        nreturn = 'scissors'
        return nreturn

'''plays the actual game'''
def rpsls(player_choice):
    # delete the following pass statement and fill in your code below
    print ''
    print 'you have chosen', player_choice

    p_number = name_to_number(player_choice)
    c_number = r.randrange(0, 5)
    comp_choice = number_to_name(c_number)
    print 'The computer has chosen', comp_choice

    winnernumber = (c_number - p_number) % 5

    if winnernumber == 1 or winnernumber == 2:
        print "Computer wins!"
    elif winnernumber == 3 or winnernumber == 4:
        print "Player wins!"
    else:
        print "Player and computer tie!"

    return

rpsls("rock")
rpsls("Spock")
rpsls("paper")
rpsls("lizard")
rpsls("scissors")


