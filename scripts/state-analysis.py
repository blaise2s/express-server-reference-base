import json
import sys

import pandas as pd

# Arg 1: Location Master File
# Arg 2: Point of Sale File
# Arg 3: Ecomm Sale File

pos = pd.read_csv(sys.argv[2], sep = '\t')
ecomm = pd.read_csv(sys.argv[3], sep = '\t')

posTotals = pos[['QTY','STATE']].groupby('STATE').sum()
ecommTotals = ecomm[['QTY','STATE']].groupby('STATE').sum()

posJSON = posTotals.to_json()
ecommJSON = ecommTotals.to_json()

combined = ecommTotals.merge(posTotals, left_index=True, right_index=True, suffixes=["_ecomm","_pos"])
combined['total'] = combined.QTY_ecomm + combined.QTY_pos
combined.columns = ["ecomm", "pos", "total"]

locationMaster = pd.read_csv(sys.argv[1], sep = '\t')
locsPerState = locationMaster[["City","State"]].groupby("State").count()
locsPerState.columns = ["numStores"]
combined = combined.merge(locsPerState,left_index=True,right_index=True, how="outer").fillna(0)

rollupJSON = combined.T.to_json()
print(json.dumps({ "pos": json.loads(posJSON)['QTY'], "ecomm": json.loads(ecommJSON)['QTY'], "rollup": json.loads(rollupJSON) }))
