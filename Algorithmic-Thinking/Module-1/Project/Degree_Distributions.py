#Created on Aug 26, 2014
#@author: Joshua Magady
#Language: Python 2.x


# below is the programming equivalent to the graphs used for module 1

EX_GRAPH0 = { 0 : [1,2]}

EX_GRAPH1 = {0 : [1,4,5], 
             1 : [2,6], 
             2 : [3], 
             3 : [0], 
             4 : [1], 
             5 : [2], 
             6: []} 

EX_GRAPH2 = {0 : [1,4,5], 
             1 : [2,6], 
             2 : [3], 
             3 : [0], 
             4 : [1], 
             5 : [2], 
             6 : [],
             7 : [3],
             8 : [1, 2],
             9 : [0, 4, 5, 6, 7, 3]} 

def make_complete_graph(num_nodes):
    #Given the number of nodes, this returns a dictionary
    #for all possible edges in the graph (No self loops are
    #allowed for this example
    xgraph = {}  #Create a Blank Dict
    if num_nodes - 1 < 0: # checks to see if the num_nodes is less then 0 (negative number) if it is return empty graph (dict). Could probably combine the If statments for negative nodes and 1 node together
        return xgraph
    if num_nodes - 1 == 0: # If the number of nodes is 1 or returns a one node dict because there are no edges to compute
        xgraph[0] = [] # creates a dict that represents a single node graph as per the requirement
        return xgraph # the empty Graph
    else:
        for base_node in range(num_nodes): # This portion starts the build phase. for each node it will compute the theretical maximum amount of edges
            xlist = [] # defines an empty list. We first build a list for each node and the append to a dict. This list is erased with each iteration
            #print base_node # testing - REMOVE
            for edge_node in range(num_nodes):
                #print edge_node # testing - REMOVE
                if edge_node != base_node: #No Looping is allowed for this project. Therefor we check to insure the we are not counting a self node connection (edge_node NOT equal base_node)
                    xlist.append(edge_node) # Populating list that will be added to dict
                    
            xgraph[base_node] = xlist # Appending created list to the dict
            
        return xgraph # returning populated dict


def compute_in_degress(digraph):
    for node in digraph:
        return 0 #dummy return. Using as a Place Holder
        

def in_degree_distribution(digraph):
    return 0 #dummy return. Using as a Place Holder



