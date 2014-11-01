hrs = raw_input("Enter Hours:")
try:
    h = float(hrs)
except:
    print "Error, please enter numeric input"
    quit()
    
rte = raw_input("Enter Hourly Rate:")
try:
    r = float(rte)
except:
    print "Error, please enter numeric input"
    quit()
    
if h > 40:
    remainder = h - 40.00
    overtimepay = r * 1.5 * remainder
    pay = 40.00 * r
    print pay + overtimepay
else:
    print r * h
    
# rate * 40 + (rate * 1.5 * ( hours - 40) )