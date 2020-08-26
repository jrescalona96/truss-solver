import numpy as np
import math
from matplotlib import pyplot as plt
#          number E
materials1 =[1,    29000]
materials2 =[2,    30000]
materials3 =[3,    4200]
materials = [materials1,    # establish materials matrix
           materials2,
           materials3,
           ]
#print(materials)
#     number   x      y   bound_x   bound_y   force_x   force_y
nodes1=[ 1,   -180,    0,  1,        1,        0,         0]
nodes2=[ 2,   -60,     0,  0,        0,        0,        -20]
nodes3=[ 3,    60,     0,  0,        0,        0,        -10]
nodes4=[ 4,    180,    0,  0,        1,        0,         0]
nodes5=[ 5,   -120,   90,  0,        0,        0,        -20]
nodes6=[ 6,     0,    90,  0,        0,        10,        0]
nodes7=[ 7,    120,   90,  0,        0,        10,        0]
#establish nodes matrix

nodes=[nodes1,
       nodes2,
       nodes3,
       nodes4,
       nodes5,
       nodes6,
       nodes7]

# truss element data
#     number  node_i   node_j   material   Area
bars1=[  1,   1,       2,       1,         math.pi]
bars2=[  2,   2,       3,       1,         math.pi]
bars3=[  3,   3,       4,       1,         math.pi]
bars4=[  4,   5,       6,       1,         math.pi]
bars5=[  5,   6,       7,       1,         math.pi]
bars6=[  6,   1,       5,       1,         math.pi]
bars7=[  7,   2,       6,       1,         math.pi]
bars8=[  8,   3,       7,       1,         math.pi]
bars9=[  9,   2,       5,       1,         math.pi]
bars10=[ 10,  3,       6,       1,         math.pi]
bars11=[ 11,  4,       7,       1,         math.pi]
#establish bars matrix
bars=[bars1,
      bars2,
      bars3,
      bars4,
      bars5,
      bars6,
      bars7,
      bars8,
      bars9,
      bars10,
      bars11]

node=len(nodes) # number of nodes
bar=len(bars)   #number of bars




def truss(ix, iy, jx, jy): #locate i and j
    return[ix, jx,None],[iy, jy, None]
xij=[]
yij=[]
for ii in range(1,bar+1):
    nodes = np.array(nodes)
    plt.scatter(nodes[:, 1], nodes[:, 2], color='red') #this plots the nodes
    lx, ly=truss( nodes[bars[ii-1][1]-1][1], nodes[bars[ii - 1][1] - 1][2], nodes[bars[ii-1][2]-1][1], nodes[bars[ii - 1][2] - 1][2] ) #locates ix iy ij iy
    xij += lx
    yij += ly
    plt.plot(xij,yij,'k') #plots ix iy ij iy
#plt.show()

coord_x=np.array([xij])
coord_x=coord_x.reshape(bar,3)
coord_x=np.delete(coord_x,2,1)
coord_y=np.array([yij])
coord_y=coord_y.reshape(bar,3)
coord_y=np.delete(coord_y,2,1)
coord_mat=np.concatenate((coord_x,coord_y),axis=1)  #[ix jx iy jy] this holds coordinates of i and j of bars
#print(coord_mat)

def angle(ix, jx, iy, jy):  #this is a function to solve for angles
    b=math.degrees( math.atan( (jy-iy)/(jx-ix)  ))
    if (jy-iy> 0 and jx-ix > 0):
        b=b
    if (jy-iy> 0 and jx-ix == 0):
        b=90
    if (jy-iy> 0 and jx-ix< 0):
         b=b+180
    if (jy-iy< 0 and jx-ix < 0):
        b = b +180
    if (jy-iy<= 0 and jx-ix == 0):
        b = 270
    if (jy-iy< 0 and jx-ix > 0):
        b =b+360

    return[b]
theta=[]
for ii in range(1,bar+1): #solves for angles of bars
    theta1=angle(coord_mat[ii-1][0],coord_mat[ii-1][1],coord_mat[ii-1][2],coord_mat[ii-1][3])
    theta=np.concatenate((theta,theta1),axis=0) #collects output of the for loop
theta=theta.reshape(bar,1)
#print(theta[5])

def dist(ix, jx, iy, jy):   #function for calculation distance between 2 points
    d=math.sqrt( (jx-ix)**2 + (jy-iy)**2     )
    return[d]
Length=[]
for ii in range(1,bar+1):
    length1=dist(coord_mat[ii-1][0],coord_mat[ii-1][1],coord_mat[ii-1][2],coord_mat[ii-1][3])
    Length=np.concatenate((Length,length1),axis=0)
Length=Length.reshape(bar,1) #this is the array for the lengths of bars
#print(Length)

def t_matrix(theta): #this function solves for the Transformation matrix of a bar
    d=[[math.cos(math.radians(theta)), math.sin(math.radians(theta)), 0, 0],
      [ -math.sin(math.radians(theta)), math.cos(math.radians(theta)), 0, 0],
      [0, 0, math.cos(math.radians(theta)), math.sin(math.radians(theta))],
      [0, 0, -math.sin(math.radians(theta)), math.cos(math.radians(theta))]]
    return[d]

transf_m=[]
for ii in range(1,bar+1):
    transf_m1=t_matrix(theta[ii-1])
    transf_m= transf_m+transf_m1 #this stores all transformation matrices of the bars
transf_m=np.array([transf_m])
#print(transf_m[0])
def k_local(A, mat, L):
    x = np.array([[1, 0, -1, 0], #stiffness matrix
         [0, 0, 0, 0],
         [-1, 0, 1, 0],
         [0, 0, 0, 0]])
    y= x * A*mat/L
    return[y]

k=[]
for ii in range(1,bar+1):
    k1=k_local(bars[ii-1][4], materials[bars[ii-1][3]-1][1], Length[ii-1])
    k=k+k1 #this is local stiffness matrix
k=np.array([k])
#print(len(k[0][0]))

def k_global(Tmat,stiffmat): #4X4 element global stiffness matrix
    t_transpose=Tmat
    t_transpose=t_transpose.transpose()
    y=np.matmul(np.matmul(t_transpose,stiffmat),Tmat)
    return[y]

k_g=[]
for ii in range(1, bar + 1):
    k_g1=k_global(transf_m[0][ii-1],k[0][ii-1])
    k_g=k_g+k_g1
#print(k_g[0])

def K_matrix(nodes,node_i,node_j,k_glob): #this holds individual global stiffness matrix (2*nodes x 2*nodes)
    y=np.zeros((2*nodes,2*nodes))
    y[node_i*2-2:node_i*2,node_i*2-2:node_i*2]=k_glob[0][0:2],k_glob[1][0:2]
    y[node_i*2-2:node_i*2,node_j*2-2:node_j*2]=k_glob[0][2:4],k_glob[1][2:4]
    y[node_j*2-2:node_j*2,node_i*2-2:node_i*2]=k_glob[2][0:2],k_glob[3][0:2]
    y[node_j*2-2:node_j*2,node_j*2-2:node_j*2]=k_glob[2][0:2],k_glob[3][2:4]

    return[y]
K_mat=[]
for ii in range(1,bar+1):
    K_mat1=K_matrix(node, bars[ii-1][1], bars[ii-1][2], k_g[ii-1] )
    K_mat=K_mat+K_mat1
#print(K_mat)


K_global=np.zeros((2*node,2*node)) #this sums all individual global stiffness matrix into (1) GLOBAL STIFFNESS MATRIX
for ii in range(1,bar+1):
    K_global1=np.array([K_mat[ii-1]])
    K_global=K_global+K_global1
    print(K_global)

f_x=nodes[0:node+1,5]   #takes all x-forces
f_y=nodes[0:node+1,6]   #takes all y-forces
f_nodes=np.concatenate([f_x,f_y]) #x-force row + y-force row one line
f_nodes=np.reshape(f_nodes,(2,node)) #1st line x-force 2nd line y-force
f_nodes=f_nodes.transpose() #x-force col y-force col
f_nodes=np.reshape(f_nodes,(2*node,1)) #reshape into 1 col, alternating (x1 y1 x2 y2...
#print(f_nodes)

restr=nodes[0:node+1,3:5] #extracts restraints from nodes matrix
#print(restr)
c=np.reshape(restr,(2*node,1))
#print(c)
node_f=np.argwhere(c)
#print(node_f)
node_f=node_f[0:,0] #all nodes with restraints
#print(node_f)
node_fi=node_f[::-1] #reverses order of node_f
#print(node_fi)
#print(len(node_fi+1))
#print(K_global)

def reducecol(x,y):
    xi=np.delete(x,y,axis=1)
    return(xi)

K_f=reducecol(K_global, node_fi)

#print(K_f)






























#print(transf_m1)



#(coord_mat[ii-1][3]-coord_mat[ii-1][2]) / (coord_mat[ii-1][1]-coord_mat[ii-1][0])

#print(nodes[bars[ii-1][1]-1][1])                        #node_i x-values
#print(nodes[bars[ii-1][2]-1][1])                        #node_j x-values
#print(nodes[bars[ii - 1][1] - 1][2])                    #node_i y-values
#print(nodes[bars[ii - 1][2] - 1][2])                    #node_j y-values