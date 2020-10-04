from flask import Flask, jsonify, request, make_response
from solver import enclose

app = Flask(__name__)


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


@app.route('/', methods=['GET'])
def sample_get():
    res = make_response(jsonify({'displacement': [{'x': 0.0, 'y': 0.0}, {'x': 0.05122216075562928, 'y': -0.1788966891460134}, {'x': 0.09951734089665117, 'y': -0.1456239931361879}, {'x': 0.11854271489159918, 'y': 0.0}, {'x': 0.11262318622418048, 'y': -0.12367163852663254}, {'x': 0.08042639946349922, 'y': -0.17835873452144127}, {'x': 0.055547064239336426, 'y': -0.07915378789974326}], 'forces': [{'x': -19.99999999999997, 'y': 28.333333333333343}, {'x': 0.0, 'y': -19.999999999999996}, {'x': -7.105427357601002e-15, 'y': -9.999999999999982}, {'x': 0.0, 'y': 21.66666666666665}, {
                        'x': -1.4210854715202004e-14, 'y': -20.0}, {'x': 10.0, 'y': -3.552713678800501e-15}, {'x': 9.999999999999986, 'y': 0.0}], 'internal': [38.88888888888886, 36.666666666666636, 14.444444444444427, -24.44444444444442, -18.888888888888875, -34.05242871271546, 14.021588293471082, 26.04009254501771, 10.015420209622206, -14.021588293471094, -26.040092545017675], 'stress': [12.378688849277076, 11.671335200746956, 4.597798715445769, -7.780890133831304, -6.012506012506009, -10.839199361062981, 4.463199736908289, 8.288799511401105, 3.1879998120773516, -4.463199736908294, -8.288799511401093]}), 200)
    return res


@app.route('/', methods=['POST'])
def truss_input():
    nodes = request.json['nodes']
    bars = request.json['bars']

    displacements, forces, internal, stress = enclose(nodes, bars)

    output = {'displacement': dict_converter(displacements),
              'forces': dict_converter(forces[0]),
              'internal': internal,
              'stress': stress
              }

    print("\ndisplacement")
    print(map_ids(nodes, dict_converter(displacements)))
    print("\nforces")
    print(map_ids(nodes, dict_converter(forces[0])))

    res = make_response(jsonify(output), 200)
    return res


if __name__ == '__main__':
    app.run(debug=True)
