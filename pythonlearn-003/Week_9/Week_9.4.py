name = raw_input("Enter file:")
address = {}
count = 0
rem_key = ""
if len(name) < 1 :
    name = "mbox-short.txt"
    handle = open(name)
    for line in handle:
        if line.startswith("From:"):
            lst = line.split()
            if address.has_key(lst[1]) == True:
                address[lst[1]] += 1
            else:
                address[lst[1]] = 1
    for item in address.keys():
        if address[item] > count:
            count = address[item]
            rem_key = item
        else:
            continue
print rem_key, count
