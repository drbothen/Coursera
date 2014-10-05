from __future__ import division

import numpy as np
import itertools as i
import QSTK.qstkutil.qsdateutil as du
import QSTK.qstkutil.tsutil as tsu
import QSTK.qstkutil.DataAccess as da
import datetime as dt
import matplotlib.pyplot as plt
import pandas as pd


def simulate(start_date, end_date, ls_symbols, ls_allo, optomize = False, time_of_day = '16', src_data = 'Yahoo'):
    '''Runs a simulation on your profile against historical data to produce portfolio statistics
       start_date $ end_date needs to be put in as month/day(no leading zeros on single digit days and months)/year(full year) ex: 1/2/2014
       src_data = google or yahoo
       returns vol, daily_ret, sharpe, cum_ret
       if optomize is set to true it will calculate the best allocations that lead to the highest sharpe ratio
    '''
    #formating/using time vars

    dt_timeofday = dt.timedelta(hours=int(time_of_day)) # sets what time of day to grab the data. Usually you want data from the end of the day (1600 or 16 for the functions case)
    dt_start = dt.datetime(int(start_date.split('/', 2)[2]), int(start_date.split('/', 2)[0]), int(start_date.split('/', 2)[1])) # take input from start_date and splits it into a format that datetime function can use to start creating timestamps
    dt_end = dt.datetime(int(end_date.split('/', 2)[2]), int(end_date.split('/', 2)[0]), int(end_date.split('/', 2)[1])) # take input from end_date and splits it into a format that datetime function can use to start creating timestamps
    ldt_timestamps = du.getNYSEdays(dt_start, dt_end, dt_timeofday) #from start and stop dates & time of day create a list of actual trading days
    trading_days = len(ldt_timestamps) # count number of trading days

    #Getting and reading data,
    if src_data == 'Yahoo':
        ls_keys = ['open', 'high', 'low', 'close', 'volume', 'actual_close']
        c_dataobj = da.DataAccess(src_data, cachestalltime=0)
        ldf_data = c_dataobj.get_data(ldt_timestamps, ls_symbols, ls_keys)
        d_data = dict(zip(ls_keys, ldf_data))

    #Calculate Portfolio value (normalized)
    port_hold = d_data['close'].values.copy() # copying all closeing values from the d_data dict
    port_norm = port_hold / port_hold[0,:] # normalizing prices
    alloc_array = np.array(ls_allo).reshape(len(ls_allo), 1)
    port_val = np.dot(port_norm, alloc_array)

    #calculate daily returns (normalized)
    daily_val = port_val.copy()
    tsu.returnize0(daily_val)

    #Calculate dail_ret, vol, sharpe, cum_ret
    daily_ret = np.mean(daily_val)
    vol = np.std(daily_val)
    sharpe = np.sqrt(trading_days) * daily_ret / vol
    cum_ret = cum_ret = port_val[port_val.shape[0] -1][0]


    #print dt_timeofday
    #print dt_start
    #print dt_end
    #print ldt_timestamps
    #print trading_days

    return vol, daily_ret, sharpe, cum_ret


def optimal_allocation(start_date, end_date, ls_symbols, p_increase = 0.1):
    '''Calcualtes best allocations for a given set of symbols for a given time period'''

    # intialize local varibles
    best_sharpe = -100
    best_allo = 0

    #generate all possible combos (including illegal ones (we will filter those out later
    allo_increments = np.arange(0.0,1.0,p_increase) # creates a list of increments (weighted percentages) based on increment (default is 10%)
    all_combo_allo = i.product(allo_increments, repeat=len(ls_symbols)) # based on how many symbols creates all possible combos

    #begin testing combos
    count = 0
    for combo in all_combo_allo: # loops through all the combo
        count += 1
        print count
        if np.sum(combo) == 1.0: # max percentage is 100% (or 1.0) if it is over 100% it is dumped
            vol, daily_ret, sharpe, cum_ret = simulate(start_date = start_date, end_date = end_date, ls_symbols = ls_symbols, ls_allo = combo) # runs the simulate function to return the sharpe ratio
            if sharpe > best_sharpe:# if first run through checks to see if sharpe greater then an impossible sharp. after that it checks to see if the next sharpe is better then the previous
                best_sharpe = sharpe # loads the vars
                best_allo = combo # loads the vars

    return best_allo, best_sharpe

ls_symbolsx = ['BRCM', 'TXN', 'IBM', 'HNZ']
ls_allocation = [0.4, 0.4, 0.0, 0.2]
start = '1/1/2011'
end = '12/31/2011'

#vol, daily_ret, sharpe, cum_ret = simulate(start_date = start, end_date = end, ls_symbols =ls_symbolsx, ls_allo = ls_allocation)

allo, sharpe = optimal_allocation(start, end, ls_symbolsx)

print allo
print sharpe

#print vol
#print daily_ret
#print sharpe
#print cum_ret



#x = np.arange(0.0,1.0,0.1)
#x = np.linspace(0.0,1.0, num=11)
#y = x.copy()
#print y
#g = i.combinations(y, 5)
#print len(list(g))
#x = 'ABCDEFGHIJK'
#g = i.product(y, repeat=4)
#for item in g:
#    if np.sum(item) == 1.0:
#        print item







