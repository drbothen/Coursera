score = raw_input("Please enter a score between 0.0 and 1.0: ")
try:
    float_score = float(score)
except:
    print "Please enter a number"
    quit()

if float_score > 1.0 or float_score < 0.0:
    print "Score is out of range."
    quit()
elif float_score >= 0.9:
    print "A"
elif float_score >= 0.8:
    print "B"
elif float_score >= 0.7:
    print "C"
elif float_score >= 0.6:
    print "D"
else:
    print "F"