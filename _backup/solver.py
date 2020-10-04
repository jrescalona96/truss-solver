import numpy as np
import math
from numpy.linalg import inv  # free displacement vector


def enclose(materials, nodes, bars):
    node = len(nodes)  # number of nodes
    bar = len(bars)  # number of bars

    def truss(ix, iy, jx, jy):  # locate i and j
        return[ix, jx, None], [iy, jy, None]
    xij = []
    yij = []

    for ii in range(1, bar+1):
        nodes = np.array(nodes)
        lx, ly = truss(nodes[bars[ii-1][1]-1][1], nodes[bars[ii - 1][1] - 1][2],
                       nodes[bars[ii-1][2]-1][1], nodes[bars[ii - 1][2] - 1][2])  # locates ix iy ij iy
        xij += lx
        yij += ly

    coord_x = np.array([xij])
    coord_x = coord_x.reshape(bar, 3)
    coord_x = np.delete(coord_x, 2, 1)
    coord_y = np.array([yij])
    coord_y = coord_y.reshape(bar, 3)
    coord_y = np.delete(coord_y, 2, 1)
    # [ix jx iy jy] this holds coordinates of i and j of bars
    coord_mat = np.concatenate((coord_x, coord_y), axis=1)

    def angle(ix, jx, iy, jy):  # this is a function to solve for angles
        b = math.degrees(math.atan((jy-iy)/(jx-ix)))
        if (jy-iy > 0 and jx-ix > 0):
            b = b
        if (jy-iy > 0 and jx-ix == 0):
            b = 90
        if (jy-iy > 0 and jx-ix < 0):
            b = b+180
        if (jy-iy < 0 and jx-ix < 0):
            b = b + 180
        if (jy-iy <= 0 and jx-ix == 0):
            b = 270
        if (jy-iy < 0 and jx-ix > 0):
            b = b+360

        return[b]
    theta = []
    for ii in range(1, bar+1):  # solves for angles of bars
        theta1 = angle(coord_mat[ii-1][0], coord_mat[ii-1]
                       [1], coord_mat[ii-1][2], coord_mat[ii-1][3])
        # collects output of the for loop
        theta = np.concatenate((theta, theta1), axis=0)
    theta = theta.reshape(bar, 1)

    def dist(ix, jx, iy, jy):  # function for calculation distance between 2 points
        d = math.sqrt((jx-ix)**2 + (jy-iy)**2)
        return[d]
    Length = []
    for ii in range(1, bar+1):
        length1 = dist(coord_mat[ii-1][0], coord_mat[ii-1]
                       [1], coord_mat[ii-1][2], coord_mat[ii-1][3])
        Length = np.concatenate((Length, length1), axis=0)
    # this is the array for the lengths of bars
    Length = Length.reshape(bar, 1)

    def t_matrix(theta):  # this function solves for the Transformation matrix of a bar
        d = [[math.cos(math.radians(theta)), math.sin(math.radians(theta)), 0, 0],
             [-math.sin(math.radians(theta)),
              math.cos(math.radians(theta)), 0, 0],
             [0, 0, math.cos(math.radians(theta)),
              math.sin(math.radians(theta))],
             [0, 0, -math.sin(math.radians(theta)), math.cos(math.radians(theta))]]
        return[d]

    transf_m = []
    for ii in range(1, bar+1):
        transf_m1 = t_matrix(theta[ii-1])
        transf_m = transf_m+transf_m1  # this stores all transformation matrices of the bars
    transf_m = np.array([transf_m])

    def k_local(A, mat, L):
        stiffness_matrix = [[1, 0, -1, 0],  # stiffness matrix
                            [0, 0, 0, 0],
                            [-1, 0, 1, 0],
                            [0, 0, 0, 0]]
        x = np.array(stiffness_matrix)
        y = x * A*mat/L
        return[y]

    k = []
    for ii in range(1, bar+1):
        k1 = k_local(bars[ii-1][4], materials[bars[ii-1][3]-1]
                     [1], Length[ii-1])
        k = k+k1  # this is local stiffness matrix
    k = np.array([k])

    def k_global(Tmat, stiffmat):  # 4X4 element global stiffness matrix
        t_transpose = Tmat
        t_transpose = t_transpose.transpose()
        y = np.matmul(np.matmul(t_transpose, stiffmat), Tmat)
        return[y]

    k_g = []
    for ii in range(1, bar + 1):
        k_g1 = k_global(transf_m[0][ii-1], k[0][ii-1])
        k_g = k_g+k_g1

    # this holds individual global stiffness matrix (2*nodes x 2*nodes)
    def K_matrix(nodes, node_i, node_j, k_glob):
        y = np.zeros((2*nodes, 2*nodes))
        y[node_i*2-2:node_i*2, node_i*2-2:node_i *
            2] = k_glob[0][0:2], k_glob[1][0:2]
        y[node_i*2-2:node_i*2, node_j*2-2:node_j *
            2] = k_glob[0][2:4], k_glob[1][2:4]
        y[node_j*2-2:node_j*2, node_i*2-2:node_i *
            2] = k_glob[2][0:2], k_glob[3][0:2]
        y[node_j*2-2:node_j*2, node_j*2-2:node_j *
            2] = k_glob[2][2:4], k_glob[3][2:4]

        return[y]
    K_mat = []
    for ii in range(1, bar+1):
        K_mat1 = K_matrix(node, bars[ii-1][1], bars[ii-1][2], k_g[ii-1])
        K_mat = K_mat+K_mat1

    # this sums all individual global stiffness matrix into (1) GLOBAL STIFFNESS MATRIX
    K_global = np.zeros((2*node, 2*node))
    for ii in range(1, bar+1):
        K_global1 = np.array([K_mat[ii-1]])
        K_global = K_global+K_global1

    f_x = nodes[0:node+1, 5]  # takes all x-forces
    f_y = nodes[0:node+1, 6]  # takes all y-forces
    f_nodes = np.concatenate([f_x, f_y])  # x-force row + y-force row one line
    # 1st line x-force 2nd line y-force
    f_nodes = np.reshape(f_nodes, (2, node))
    f_nodes = f_nodes.transpose()  # x-force col y-force col
    # reshape into 1 col, alternating (x1 y1 x2 y2...
    f_nodes = np.reshape(f_nodes, (2*node, 1))

    restr = nodes[0:node+1, 3:5]  # extracts restraints from nodes matrix
    c = np.reshape(restr, (2*node, 1))
    node_f = np.argwhere(c)
    node_f = node_f[0:, 0]  # all nodes with restraints
    node_fi = node_f[::-1]  # reverses order of node_f

    def reducerow(x, y):
        xi = np.delete(x, y, 0)
        return(xi)

    # this reduces rows of global stiffness matrix ie restraints
    K_frow = reducerow(K_global[0], node_f)

    def reducecol(x, y):
        xi = np.delete(x, y, 1)
        return(xi)

    # this reduces cols of global stiffness matrix ie restraints
    K_f = reducecol(K_frow, node_f)

    # this reduces the rows of the forces applied ie restraints
    f_f = reducerow(f_nodes, node_f)

    d_f = np.matmul(inv(K_f), f_f)

    d = np.zeros((2*node, 1))
    d_c = np.where(c == 0)[0]

    d[d_c] = d_f  # vector of displacements <<<<<<----------------------------- deflections

    FORCES = np.matmul(K_global, d)  # vector of forces
    REACTIONS = FORCES[0, [node_f]]

    # this transforms global nodal displacements into local nodal displacements

    def glob2local(x, angle, bars, d):
        T = np.array([[math.cos(math.radians(angle[x])), math.sin(math.radians(angle[x])), 0, 0],
                      [0, 0, math.cos(math.radians(angle[x])), math.sin(math.radians(angle[x]))]])
        y = np.array([d[bars[x][1]*2-2], d[bars[x][1]*2-1],
                      d[bars[x][2]*2-2], d[bars[x][2]*2-1]])
        dxy = np.matmul(T, y)
        return(dxy)

    f_int = []  # this solves for internal forces
    for ii in range(1, bar+1):
        f_int1 = bars[ii-1][4] * materials[bars[ii-1][3]-1][1] / \
            Length[ii-1] * np.matmul([-1, 1], glob2local(ii-1, theta, bars, d))
        f_int = np.concatenate((f_int, f_int1), 0)

    stress = []  # this solves for stresses
    for ii in range(1, bar+1):
        stress1 = materials[bars[ii-1][3]-1][1] / Length[ii-1] * \
            np.matmul([-1, 1], glob2local(ii-1, theta, bars, d))
        stress = np.concatenate((stress, stress1), 0)

    d_list = d.tolist()
    FORCES_list = FORCES.tolist()
    f_int_list = f_int.tolist()
    stress_list = stress.tolist()

    return d_list, FORCES_list, f_int_list, stress_list
