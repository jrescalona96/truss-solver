from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin
from solver import calculate
from utilities import generate_index_table, generate_id_list, map_nodes, map_bars, dict_converter, map_node_ids, map_bar_ids

app = Flask(__name__)
cors = CORS(app)  # disable CORS TODO: remove before publishing


@app.route('/api/calculate', methods=['POST'])
@cross_origin()
def truss_input():
    req_nodes = request.json['nodes']
    req_bars = request.json['bars']

    # displacements, forces, internal, stress = enclose(req_nodes, req_bars)
    nodes_index_table = generate_index_table(req_nodes)
    bars_index_table = generate_index_table(req_bars)

    # map results for client
    nodes_id_list = generate_id_list(nodes_index_table)
    bars_id_list = generate_id_list(bars_index_table)

    # map input to solver data input format
    nodes = map_nodes(req_nodes, nodes_index_table)
    bars = map_bars(req_bars, nodes_index_table)

    # run solver
    try:
        displacements, forces, internal, stress = calculate(nodes, bars)
        mapped_displacements = map_node_ids(displacements, nodes_id_list)
        mapped_forces = map_node_ids(forces[0], nodes_id_list)
        mapped_internal = map_bar_ids(internal, bars_id_list)
        mapped_stresses = map_bar_ids(stress, bars_id_list)
        # format output
        output = {'displacement': mapped_displacements,
                  'forces': mapped_forces,
                  'internal': mapped_internal,
                  'stress': mapped_stresses}
        print(output)
        res = make_response(jsonify(output), 200)
    except:
        res = make_response("Something Went Wrong.", 400)
    return res


if __name__ == '__main__':
    app.run(debug=True)
