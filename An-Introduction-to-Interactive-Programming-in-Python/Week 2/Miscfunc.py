from __future__ import division

#question 6, week 2 quiz
'''
When investing money, an important concept to know is compound interest. The equation FV = PV (1+rate)periods relates the following four quantities.

The present value (PV) of your money is how much money you have now.
The future value (FV) of your money is how much money you will have in the future.
The nominal interest rate per period (rate) is how much interest you earn during a particular length of time, before accounting for compounding. This is typically expressed as a percentage.
The number of periods (periods) is how many periods in the future this calculation is for.
Finish the following code, run it, and submit the printed number. Provide at least four digits of precision after the decimal point.
'''


import math

def future_value(present_value, annual_rate, periods_per_year, years):
    rate_per_period = annual_rate / periods_per_year
    periods = periods_per_year * years

    '''Calculation'''
    fut_val = present_value * (1+rate_per_period)**periods


    return float(fut_val)

'''Test call to function'''
#print future_value(500, .04, 10, 10)
'''Question call'''
#print "$1000 at 2% compounded daily for 3 years yields $", future_value(1000, .02, 365, 3)


def aregpoly(sides, lsides):
    area = 1/4 * sides * lsides ** 2 / math.tan(math.pi / sides)

    return area

'''Answer Question 7'''
#print aregpoly(7, 3)

def project_to_distance(point_x, point_y, distance):
        dist_to_origin = math.sqrt(point_x ** 2 + point_y ** 2)
        scale = distance / dist_to_origin
        print point_x * scale, point_y * scale

#project_to_distance(2, 7, 4)


def quest5(number):
    val = -5*number**5+69*number**2-47
    return val
