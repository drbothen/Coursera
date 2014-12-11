name = raw_input("Enter file:")
time = {}
count = 0
if len(name) < 1 or name == "mbox-short.txt" :
    name = "mbox-short.txt"
    handle = open(name)
    for line in handle:
        if line.startswith("X-DSPAM-Processed:"):
            lst = line.split()
            time_splt = lst[4].split(":")
            #print time_splt
            if time.has_key(time_splt[0]) == True:
                time[time_splt[0]] += 1
            else:
                time[time_splt[0]] = 1
    time_tup = time.items()
    time_tup.sort()
    for k, v in time_tup:
    
        print k, v


