import sys, string, os

# QSTK Imports

import QSTK.qstkutil.qsdateutil as du
import QSTK.qstkutil.tsutil as tsu
import QSTK.qstkutil.DataAccess as da
import QSTK.qstkstudy.EventProfiler as ep
'''
import qstkutil.qsdateutil as du
import qstkutil.tsutil as tsu
import qstkutil.DataAccess as da
import qstkstudy.EventProfiler as ep
'''

import pandas
import numpy as np
import math
import copy
import datetime as dt



# read in..
benchmark= sys.argv[2]

df= pandas.read_csv(sys.argv[1], names=['y', 'm','d','v'], parse_dates=[[0,1,2]], header=None, converters={'v':np.float64})


#values= pandas.read_csv(sys.argv[1], parse_dates=[[0,1,2]],  header=None ,converters= {'year':np.int32, 'month':np.int32, 'day':np.int32, 'value':np.float64} )

fund_ret= df.v.copy()
fund_ret= fund_ret/fund_ret[0] #cumulative return
#print fund_ret


fund_daily_ret= [(fund_ret[i]-fund_ret[i-1])/fund_ret[i-1] for i in range(1,len(fund_ret)) ]
fund_daily_ret.insert(0,0)


print 'Total Return', fund_ret[len(fund_ret)-1]
print 'Standard Deviation of Fund :', np.std(fund_daily_ret)
print 'Average Daily Return of Fund :',  np.average(fund_daily_ret)
print 'Sharpe Ratio of Fund :', np.sqrt(252)* np.average(fund_daily_ret) / np.std(fund_daily_ret)


# exit()######################


## bench mark $SPX

startday = dt.datetime(df['y'][0], df['m'][0], df['d'][0])
endday = dt.datetime(df['y'][len(df)-1], df['m'][len(df)-1], df['d'][len(df)-1])

#startday = dt.datetime(2011, 1, 10)
#endday = dt.datetime(2011,12,20)


timeofday=dt.timedelta(hours=16)
timestamps = du.getNYSEdays(startday,endday,timeofday)
dataobj = da.DataAccess('Yahoo')
close = dataobj.get_data(timestamps, [benchmark], "close",verbose=False)

#print close

rets = close.values.copy()

rets = rets/rets[0,:] #normalize

daily_ret= [(rets[i]-rets[i-1])/rets[i-1] for i in range(1,len(rets)) ]
daily_ret.insert(0,0)

print 'Total Return', rets[-1]
print 'Standard Deviation of Benchmark :', np.std(daily_ret)
print 'Average Daily Return of Benchmark :',  np.average(daily_ret)
print 'Sharpe Ratio of Benchmark :', np.sqrt(252)* np.average(daily_ret) / np.std(daily_ret)
