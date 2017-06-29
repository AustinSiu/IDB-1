"""
A Json Parser for insertions
"""

from dbModels import *

# connect database

# read json file

# parsing

# insertions

# close databases


# ***********
# playground
# ***********

import json
from pprint import pprint

with open('data.json') as data_file:
    data = json.load(data_file)

pprint(data)
