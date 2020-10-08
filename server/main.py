from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin
from solver import calculate
from utilities import generate_index_table, generate_id_list, map_nodes, map_bars, dict_converter, map_node_ids, map_bar_ids

app = Flask(__name__)
cors = CORS(app)  # disable CORS TODO: remove before publishing


@app.route('/', methods=['GET'])
def sample_get():
    res = make_response(jsonify({'displacement': [{'x': 0.0, 'y': 0.0}, {'x': 0.05122216075562928, 'y': -0.1788966891460134}, {'x': 0.09951734089665117, 'y': -0.1456239931361879}, {'x': 0.11854271489159918, 'y': 0.0}, {'x': 0.11262318622418048, 'y': -0.12367163852663254}, {'x': 0.08042639946349922, 'y': -0.17835873452144127}, {'x': 0.055547064239336426, 'y': -0.07915378789974326}], 'forces': [{'x': -19.99999999999997, 'y': 28.333333333333343}, {'x': 0.0, 'y': -19.999999999999996}, {'x': -7.105427357601002e-15, 'y': -9.999999999999982}, {'x': 0.0, 'y': 21.66666666666665}, {
                        'x': -1.4210854715202004e-14, 'y': -20.0}, {'x': 10.0, 'y': -3.552713678800501e-15}, {'x': 9.999999999999986, 'y': 0.0}], 'internal': [38.88888888888886, 36.666666666666636, 14.444444444444427, -24.44444444444442, -18.888888888888875, -34.05242871271546, 14.021588293471082, 26.04009254501771, 10.015420209622206, -14.021588293471094, -26.040092545017675], 'stress': [12.378688849277076, 11.671335200746956, 4.597798715445769, -7.780890133831304, -6.012506012506009, -10.839199361062981, 4.463199736908289, 8.288799511401105, 3.1879998120773516, -4.463199736908294, -8.288799511401093]}), 200)
    return res


@app.route('/api/calculate', methods=['POST'])
@cross_origin()
def truss_input():
    req_nodes = request.json['nodes']
    req_bars = request.json['bars']

    # displacements, forces, internal, stress = enclose(req_nodes, req_bars)
    nodes_index_table = generate_index_table(req_nodes)
    bars_index_table = generate_index_table(req_bars)

    # map input to solver data input format
    nodes = map_nodes(req_nodes, nodes_index_table)
    bars = map_bars(req_bars, nodes_index_table)

    # run solver
    displacements, forces, internal, stress = calculate(nodes, bars)

    # map results for client
    nodes_id_list = generate_id_list(nodes_index_table)
    bars_id_list = generate_id_list(bars_index_table)

    mapped_displacements = map_node_ids(
        displacements, nodes_id_list)
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

    return res

if __name__ == '__main__':
    app.run(debug=True)
