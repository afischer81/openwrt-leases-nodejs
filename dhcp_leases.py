#!/usr/bin/python

import csv
import datetime

def get_leases():    
    result = []
    now = datetime.datetime.now()
    with open('/tmp/dhcp.leases') as f:
        for line in f.readlines():
            tmp = line.strip().split(' ')
            t = int(tmp[0])
            if t > 0:
                t = round((datetime.datetime.fromtimestamp(t) - now).total_seconds())
            t = datetime.timedelta(seconds=t)
            mac = tmp[1].upper()
            ip = tmp[2]
            name = tmp[3]
            if len(tmp) > 4 and tmp[4] != '*':
                mac += ',' + tmp[4].upper()
            result.append((name, ip, mac, t))
    return result

leases = get_leases()

with open('/media/data/leases.csv', 'w') as f: 
    csvwriter = csv.writer(f, delimiter=';')
    csvwriter.writerow([ 'Name', 'IP', 'MAC', 'Age'])
    csvwriter.writerows(leases)
