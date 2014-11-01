hrs = raw_input("Enter Hours:")
h = float(hrs)
rte = raw_input("Enter Hourly Rate:")
r = float(rte)
if h > 40:
    remainder = h - 40.00
    overtimepay = r * 1.5 * remainder
    pay = 40.00 * r
    print pay + overtimepay
else:
    print r * h