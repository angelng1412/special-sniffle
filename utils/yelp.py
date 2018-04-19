import json

csv_path = "data/csv.json"
scatter_path = "data/scatter.json"

def get_bids():
    src = open(csv_path)
    return json.loads(src.read()).keys()

def in_dataset(bid):
    return bid in get_bids()

def get_csv(bid):
    src = open(csv_path)
    return json.loads(src.read())[bid]

if __name__ == "__main__":
    csv_path = "../data/csv.json"
    scatter_path = "../data/scatter.json"
