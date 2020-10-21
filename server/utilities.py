import math


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
# formats bars to solver's input format


def map_nodes(data, id_table):
    output = []
    for node in data:
        item = []
        id = node['_id']
        item.append(id_table[id])
        item.append(node['coordinates']['x'])
        item.append(node['coordinates']['y'])
        item.append(node['support']['x'])
        item.append(node['support']['y'])
        item.append(node['force']['x'])
        item.append(node['force']['y'])
        output.append(item)
    return output


# formats bars to solver's input format
def map_bars(data, id_table):
    output = []
    for idx, bar in enumerate(data):
        item = []
        nodeI_id = bar['nodeI']['_id']
        nodeJ_id = bar['nodeJ']['_id']
        item.append(idx)
        item.append(id_table[nodeI_id])
        item.append(id_table[nodeJ_id])
        item.append(get_material_idx(bar['material']['_type']))
        item.append(bar['section']['area'])
        output.append(item)
    return output


def get_material_idx(type):
    indices = {"Steel": 1, "Wood": 3}
    return indices[type]


# generates a lookup table for each id to an index
def generate_index_table(nodes):
    output = {}
    for idx, item in enumerate(nodes):
        output[item['_id']] = idx+1
    return output


def generate_id_list(d):
    return list(d.keys())


def map_node_ids(source, ids):
    output = {}
    for idx, value in enumerate(dict_converter(source)):
        id = ids[idx]
        output[id] = value
    return output


def map_bar_ids(source, ids):
    output = {}
    for idx, value in enumerate(source):
        id = ids[idx]
        output[id] = value
    return output
