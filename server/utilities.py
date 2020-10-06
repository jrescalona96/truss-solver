def dict_converter(input_list):
    output_list = []

    for index, value in enumerate(input_list):
        if index % 2 == 0:
            temp = {}
            temp['x'] = value[0]
        else:
            temp['y'] = value[0]
            output_list.append(temp)
    return output_list


def map_ids(source, data):
    sample = [
        {"_id": "test1",   "xCoord": -180,    "yCoord": 0,  "xSupport": 1,
            "ySupport": 1,        "xForce": 0,         "yForce": 0},
        {"_id": "test2",   "xCoord": -60,     "yCoord": 0,  "xSupport": 0,
            "ySupport": 0,        "xForce": 0,        "yForce": -20},
        {"_id": "test3",    "xCoord": 60,     "yCoord": 0,  "xSupport": 0,
            "ySupport": 0,        "xForce": 0,        "yForce": -10},
        {"_id": "test4",    "xCoord": 180,    "yCoord": 0,  "xSupport": 0,
            "ySupport": 1,        "xForce": 0,         "yForce": 0},
        {"_id": "test5",   "xCoord": -120,   "yCoord": 90,  "xSupport": 0,
            "ySupport": 0,        "xForce": 0,        "yForce": -20},
        {"_id": "test6",     "xCoord": 0,    "yCoord": 90,  "xSupport": 0,
            "ySupport": 0,        "xForce": 10,        "yForce": 0},
        {"_id": "test7",    "xCoord": 120,   "yCoord": 90,  "xSupport": 0,
            "ySupport": 0,        "xForce": 10,        "yForce": 0}
    ]

    output_list = []

    for index, value in enumerate(sample):
        output_list.append({value["_id"]: data[index]})
    return output_list


# formats bars to solver's input format
def map_nodes(data, id_table):
    output = []
    for value in data:
        item = []
        id = value['_id']
        item.append(id_table[id])
        item.append(value['xCoord'])
        item.append(value['yCoord'])
        item.append(value['xSupport'])
        item.append(value['ySupport'])
        item.append(value['xForce'])
        item.append(value['yForce'])
        output.append(item)
    return output


# formats bars to solver's input format
def map_bars(data, id_table):
    output = []
    for index, value in enumerate(data):
        item = []
        nodeI_id = value['nodeI']['_id']
        nodeJ_id = value['nodeJ']['_id']
        item.append(index)
        item.append(id_table[nodeI_id])
        item.append(id_table[nodeJ_id])
        item.append(value['material'])
        item.append(value['area'])
        output.append(item)
    return output


# generates a lookup table for each id to an index
def generate_id_table(nodes):
    output = {}
    for index, value in enumerate(nodes):
        id = value['_id']
        output[id] = index
    return output
