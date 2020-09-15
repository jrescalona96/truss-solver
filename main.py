from flask import Flask, jsonify, request, make_response
from solver import enclose

app = Flask(__name__)


def dict_converter(input_list):
    output_list = []
    counter = 0

    for index, value in enumerate(input_list):
        if index % 2 == 0:
            temp = {}
            temp['x'] = value[0]
        else:
            temp['y'] = value[0]
            output_list.append(temp)

    return output_list


@app.route('/', methods=['POST'])
def truss_input():
    json_input = request.get_json()
    materials = request.json['materials']
    nodes = request.json['nodes']
    bars = request.json['bars']

    displacements, forces, internal, stress = enclose(materials, nodes, bars)

    output = {'displacement': dict_converter(displacements),
              'forces': dict_converter(forces[0]),
              'internal': internal,
              'stress': stress
              }
    res = make_response(jsonify(output), 200)
    return res


if __name__ == '__main__':
    app.run(debug=True)
