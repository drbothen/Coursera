import simplegui as s
import random as ran

# load card sprite - 936x384 - source: jfitz.com
CARD_SIZE = (72, 96)
CARD_CENTER = (36, 48)
card_images = s.load_image("http://storage.googleapis.com/codeskulptor-assets/cards_jfitz.png")

CARD_BACK_SIZE = (72, 96)
CARD_BACK_CENTER = (36, 48)
card_back = s.load_image("http://storage.googleapis.com/codeskulptor-assets/card_jfitz_back.png")

# initialize some useful global variables
in_play = False
outcome = ""
score = 0

# define globals for cards
SUITS = ('C', 'S', 'H', 'D')
RANKS = ('A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K')
VALUES = {'A':1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, 'T':10, 'J':10, 'Q':10, 'K':10}

# define card class
class Card:
    def __init__(self, suit, rank):
        if (suit in SUITS) and (rank in RANKS):
            self.suit = suit
            self.rank = rank
        else:
            self.suit = None
            self.rank = None
            print "Invalid card: ", suit, rank

    def __str__(self):
        return self.suit + self.rank

    def get_suit(self):
        return self.suit

    def get_rank(self):
        return self.rank

    def draw(self, canvas, pos):
        card_loc = (CARD_CENTER[0] + CARD_SIZE[0] * RANKS.index(self.rank),
                    CARD_CENTER[1] + CARD_SIZE[1] * SUITS.index(self.suit))
        canvas.draw_image(card_images, card_loc, CARD_SIZE, [pos[0] + CARD_CENTER[0], pos[1] + CARD_CENTER[1]], CARD_SIZE)


# define hand class
class Hand:
    def __init__(self):
        self.cards = []

    def __str__(self):
        return "Hand contains " + ' '.join(str(card) for card in self.cards)

    def add_card(self, card):
        self.cards.append(card)

    def get_value(self):
        score = 0
        has_ace = False
        # sum all the values of the cards
        for card in self.cards:
            if card.rank == "A":
                has_ace = True
            score += VALUES[card.rank]

        # should I apply 11 to an Ace
        if has_ace and score + 10 <= 21:
            return score + 10
        else:
            return score

    def draw(self, canvas, pos):
        for card in self.cards:
            card.draw(canvas, pos)
            pos[0] += CARD_SIZE[0] + 15


# define deck class
class Deck:
    def __init__(self):
        # create a list of cards for the deck
        self.cards = []

        # build the deck
        for suit in SUITS:
            for rank in RANKS:
                card = Card(suit, rank)
                self.cards.append(card)

    def shuffle(self):
        # shuffle the deck
        ran.shuffle(self.cards)

    def deal_card(self):
        return self.cards.pop()

    def __str__(self):
        return "Deck contains " + ' '.join(str(card) for card in self.cards)


# define event handlers for buttons
def deal():
    global score, the_deck, outcome, in_play, dealer_hand, player_hand

    # if a game was in progress then the player loses
    if in_play:
        score -= 1

    # create the deck and shuffle it
    the_deck = Deck()
    the_deck.shuffle()

    # create a Hand for the dealer and for the player
    dealer_hand = Hand()
    player_hand = Hand()

    # give two cards to the dealer and player
    player_hand.add_card(the_deck.deal_card())
    dealer_hand.add_card(the_deck.deal_card())
    player_hand.add_card(the_deck.deal_card())
    dealer_hand.add_card(the_deck.deal_card())

    in_play = True
    outcome = "Hit or Stand?"


def hit():
    global in_play, outcome

    # if the hand is in play, hit the player
    if in_play:
        player_hand.add_card(the_deck.deal_card())

        # check if the player busted
        if player_hand.get_value() > 21:
            in_play = False
            game_over()
    else:
        outcome = "Game is over. Click Deal to play again."


def stand():
    global in_play, outcome

    # if hand is in play, repeatedly hit dealer until his hand has value 17 or more
    if in_play:
        while dealer_hand.get_value() < 17:
            dealer_hand.add_card(the_deck.deal_card())

        # everyone is done, check who won
        in_play = False
        game_over()
    else:
        outcome = "Game is over. Click Deal to play again."


# everyone is done getting cards
def game_over():
    global score, outcome

    # player busted - Dealer always wins
    if player_hand.get_value() > 21:
        outcome = "BUSTED! Dealer wins."
        score -= 1
    # tie - dealer wins
    elif dealer_hand.get_value() == player_hand.get_value():
        outcome = "TIE! Dealer wins."
        score -= 1
    # did dealer bust - if so, player wins
    elif dealer_hand.get_value() > 21:
        outcome = "DEALER BUST! Player wins."
        score += 1
    # does dealer beat player
    elif dealer_hand.get_value() > player_hand.get_value():
        outcome = "Dealer wins."
        score -= 1
    # if none of the above then the player won
    else:
        outcome = "Player wins."
        score += 1


# draw handler
def draw(canvas):
    # draw the labels
    canvas.draw_text("Blackjack", [15, 50], 50, "White", "sans-serif")

    canvas.draw_text(outcome, [25, 100], 24, "White", "monospace")
    canvas.draw_text("Score: " + str(score), [400, 50], 24, "White", "monospace")

    canvas.draw_text("Dealer Hand", [25, 180], 24, "White", "monospace")
    canvas.draw_text("Player Hand", [25, 380], 24, "White", "monospace")

    # draw the Hands
    dealer_card_pos = [25, 200]
    dealer_hand.draw(canvas, list(dealer_card_pos))
    player_hand.draw(canvas, [25, 400])

    # if still in play (in_play = True) then show
    # the back of the first dealer card
    if in_play:
        canvas.draw_image(card_back, CARD_BACK_CENTER, CARD_BACK_SIZE, [dealer_card_pos[0] + CARD_BACK_CENTER[0], dealer_card_pos[1] + CARD_BACK_CENTER[1]], CARD_BACK_SIZE)


# create the Deck, a dealer Hand, and a player Hand
the_deck = None
dealer_hand = None
player_hand = None

# initialization frame
f = s.create_frame("Blackjack", 600, 600)
f.set_canvas_background("Green")

# create buttons and canvas callback
f.add_button("Deal", deal, 200)
f.add_button("Hit",  hit, 200)
f.add_button("Stand", stand, 200)
f.set_draw_handler(draw)

# get things rolling
deal()
f.start()