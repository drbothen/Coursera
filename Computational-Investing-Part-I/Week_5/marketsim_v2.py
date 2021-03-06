import sys, string, os


# QSTK Imports
import QSTK.qstkutil.qsdateutil as du
import QSTK.qstkutil.tsutil as tsu
import QSTK.qstkutil.DataAccess as da
import QSTK.qstkstudy.EventProfiler as ep


import pandas
import numpy as np
import math
import copy
import datetime as dt




## read in parameters, numpy 2D array used to store 'orders' and portfolio 'values'
cash= int(sys.argv[1])
orders= np.loadtxt(sys.argv[2], delimiter=',', dtype='int,int,int,S10,S10,int')
values=None

symbols=[]
trades={}
for x in orders:
    time= dt.datetime(x[0], x[1], x[2])+dt.timedelta(hours=16)
    symb= x[3]
    op= x[4]
    qty= x[5]
    if symb not in symbols:
        symbols.append(symb)

    if time in trades:
        trades[time].append([symb,op,qty])
    else:
        trades[time]=[[symb,op,qty]]



## get the data
startday = min(trades.keys())
endday = max(trades.keys()) +dt.timedelta(days=1)

timeofday=dt.timedelta(hours=16)
timestamps = du.getNYSEdays(startday,endday,timeofday)
dataobj = da.DataAccess('Yahoo')
close = dataobj.get_data(timestamps, symbols, 'close')
close = (close.fillna(method='ffill')).fillna(method='backfill')




## process trades
equities={}
for s in symbols:
    equities[s]=0


for d in timestamps:

    if d in trades:  # if there are trades on this day
        for t in trades[d]:
            symb= t[0]
            op=t[1]
            qty=t[2]
            if op=='Buy' or op=='BUY':
                cash=cash- int(qty)*float(close[symb][d])
                equities[symb]=equities[symb]+int(qty)
            elif op=='Sell' or op=='SELL':
                cash=cash+ int(qty)*float(close[symb][d])
                equities[symb]=equities[symb]-int(qty)
        # computation goes here
        equity_total=0
        for s in symbols:
            equity_total+= close[s][d]* equities[s]
        total= equity_total+cash

        # record that day
        t= d.timetuple()
        if values==None:
            values=np.array([t[0],t[1],t[2],total])
        else:
            values= np.vstack((values, np.array([t[0],t[1],t[2],total]) ) )


    else: # if there are no trades on this day

        # computation goes here
        equity_total=0
        for s in symbols:
            equity_total+= close[s][d]* equities[s]
        total= equity_total+cash

        # record the result of that day
        t= d.timetuple()
        if values==None:
            values=np.array([t[0],t[1],t[2],total])
        else:
            values= np.vstack((values, np.array([t[0],t[1],t[2],total]) ) )



## finish, store values as csv file
np.savetxt(sys.argv[3], values, delimiter=",",fmt='%i')
