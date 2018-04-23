import json

csv_path = "data/csv.json"
scatter_path = "data/scatter.json"
name_path = "data/names.json"

def get_scatter_dataset():
    with open(scatter_path) as f:
        return f.read()

def get_names():
    with open(name_path) as f:
        return json.loads(f.read()).keys()

def get_bids():
    with open(csv_path) as f:
        return json.loads(f.read()).keys()

def get_bid(name):
    with open(name_path) as f:
        return json.loads(f.read())[name]

def in_dataset(bid):
    return bid in get_bids()

def get_csv(bid):
    with open(csv_path) as f:
        return json.loads(f.read())[bid]

if __name__ == "__main__":
    csv_path = "../data/csv.json"
    scatter_path = "../data/scatter.json"
    name_path = "../data/names.json"
