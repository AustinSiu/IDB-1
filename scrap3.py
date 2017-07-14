import json
import re

data = None
# Reading data back
with open('data.json', 'r') as f:
    data = json.load(f)

result = []
for t in data['tours']:
    s = data['tours'][t]['venue']
    # s = s.replace('Aftica', 'Africa')
    s = s.replace(', ect.', '')
    s = s.replace('.', '')
    # s = ', '.join(s)
    print(s)

    data['tours'][t]['venue'] = s

    # print('%s' % (s))

# Writing JSON data
with open('data.json', 'w') as f:
    json.dump(data, f)
