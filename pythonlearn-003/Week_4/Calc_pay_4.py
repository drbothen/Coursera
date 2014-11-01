def computepay(h,r):
    hrs = float(h)
    rate = float(r)

    if h > 40:
        remainder = hrs - 40.00
        overtimepay = rate * 1.5 * remainder
        pay = 40.00 * rate
        return pay + overtimepay
    else:
        return rate * hrs


    #return rate * 40 + (rate * 1.5 * ( hrs - 40) )

hrs = raw_input("Enter Hours:")
rte = raw_input("Enter Rate:")
p = computepay(hrs,rte)
print p