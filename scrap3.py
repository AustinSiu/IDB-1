import json
import re

data = None
# Reading data back
with open('data.json', 'r') as f:
    data = json.load(f)

result = []
for t in data['tours']:
    s = data['tours'][t]['locations'].strip('.')
    s = re.split(',', s)
    s = ''.join(s)
    s = s.replace('and ', '')
    s = re.split(' ', s)
    # for a in s:
    #     b = a.replace('and ', '')
    #     b = a.replace('and', '')
    #     s.remove(a)
    #     s += [b]
    # if 'ect' in s:
    #    s.remove('ect')
    data['tours'][t]['locations'] = s

    print('%s' % (s))

# Writing JSON data
with open('data.json', 'w') as f:
    json.dump(data, f)
