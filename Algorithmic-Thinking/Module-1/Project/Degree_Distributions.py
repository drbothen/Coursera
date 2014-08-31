"""
Created on Aug 26, 2014
@author: Joshua Magady
Language: Python 2.x
Script: Degree_Distributions
"""

# below is the programming equivalent to the graphs used for module 1

EX_GRAPH0 = { 0 : set([1,2]),
              1 : set([]),
              2 : set([])}

EX_GRAPH1 = {0 : set([1,4,5]),
             1 : set([2,6]),
             2 : set([3]),
             3 : set([0]),
             4 : set([1]),
             5 : set([2]),
             6: set([])}

EX_GRAPH2 = {0 : set([1,4,5]),
             1 : set([2,6]),
             2 : set([3, 7]),
             3 : set([7]),
             4 : set([1]),
             5 : set([2]),
             6 : set([]),
             7 : set([3]),
             8 : set([1, 2]),
             9 : set([0, 3, 4, 5, 6, 7])}

def make_complete_graph(num_nodes):
    """
    Given the number of nodes, this returns a dictionary
    for all possible edges in the graph (No self loops are
    allowed for this example
    """
    xgraph = {}  #Create a Blank Dict
    if num_nodes - 1 < 0: # checks to see if the num_nodes is less then 0 (negative number) if it is return empty graph (dict). Could probably combine the If statments for negative nodes and 1 node together
        return xgraph
    if num_nodes - 1 == 0: # If the number of nodes is 1 or returns a one node dict because there are no edges to compute
        xgraph[0] = set([]) # creates a dict that represents a single node graph as per the requirement
        return xgraph # the empty Graph
    else:
        for base_node in range(num_nodes): # This portion starts the build phase. for each node it will compute the theretical maximum amount of edges
            xlist = set([]) # defines an empty list. We first build a list for each node and the append to a dict. This list is erased with each iteration
            #print base_node # testing - REMOVE
            for edge_node in range(num_nodes):
                #print edge_node # testing - REMOVE
                if edge_node != base_node: #No Looping is allowed for this project. Therefor we check to insure the we are not counting a self node connection (edge_node NOT equal base_node)
                    xlist.add(edge_node) # Populating list that will be added to dict

            xgraph[base_node] = xlist # Appending created list to the dict

        return xgraph # returning populated dict


def make_complete_graph_effecent(num_nodes):
    """
    Given the number of nodes, this returns a dictionary
    for all possible edges in the graph (No self loops are
    allowed for this example - Better implemented
    """
    xgraph = {}  #Create a Blank Dict
    if num_nodes - 1 < 0: # checks to see if the num_nodes is less then 0 (negative number) if it is return empty graph (dict). Could probably combine the If statments for negative nodes and 1 node together
        return xgraph
    if num_nodes - 1 == 0: # If the number of nodes is 1 or returns a one node dict because there are no edges to compute
        xgraph[0] = set([]) # creates a dict that represents a single node graph as per the requirement
        return xgraph # the empty Graph
    else:
        for base_node in range(num_nodes): # This portion starts the build phase. for each node it will compute the theretical maximum amount of edges
            xlist = set([]) # defines an empty list. We first build a list for each node and the append to a dict. This list is erased with each iteration
            #print base_node # testing - REMOVE
            for edge_node in range(num_nodes):
                #print edge_node # testing - REMOVE
                if edge_node != base_node: #No Looping is allowed for this project. Therefor we check to insure the we are not counting a self node connection (edge_node NOT equal base_node)
                    xlist.add(edge_node) # Populating list that will be added to dict

            xgraph[base_node] = xlist # Appending created list to the dict

        return xgraph # returning populated dict

def compute_in_degrees(digraph):
    """
    given a directional Graph, this function will compute the total in degrees for each node
    """
    xgraph = {} # create a blank dict
    for node in iter(digraph.viewkeys()): # creates an iter of just the keys in the dict. increase performance for larger data sets maybe? IE only shows the keys
        xgraph[node] = 0 # from the list of keys (nodes) creates a new keys for a new dict
        for edges in iter(digraph.viewvalues()): # creates an iter of just the values in the dict. increase performance for larger data sets maybe? IE only shows the values
            if node in edges: # looks for the nodes in the edges (from dict values)
                xgraph[node] += 1 # if node found increase by 1
        #print digraph.itervalues()

    return xgraph # returns a new dict with nodes as keys and the value is how many in degrees



def in_degree_distribution(digraph):
    """
    Given a directional graph, this function will compute the in degree distribution
    """
    xgraph = {} #create a blank dict
    x_in_degrees = compute_in_degrees(digraph) # This function has already been written. Reusing function
    for degrees in iter(x_in_degrees.viewvalues()): # we are counting how many nodes have what degrees so we are in a since doing an inverse of the above function. Converting the degrees to the keys of the dict
        if not xgraph.has_key(degrees): # since the same degrees show up multiple times we only want it to show up once (dict keys need to be unique anyways) this keeps errors from being thrown
            xgraph[degrees] = 0 # this creates the key and sets an initial value of 0
        xgraph[degrees]+= 1 # every time the degree comes up during the the loop it increase the value by 1

    return xgraph # returns the final dict



# example usages
print in_degree_distribution(EX_GRAPH1)
print compute_in_degrees(EX_GRAPH2)
print make_complete_graph(10)
