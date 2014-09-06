from __future__ import division
__author__ = 'Luis Ovalle'

"""
Provided code for application portion of module 1

Helper class for implementing efficient version
of DPA algorithm
"""

# general imports
import random
import matplotlib.pyplot as plt

class DPATrial:
    """
    Simple class to encapsulate optimized trials for DPA algorithm

    Maintains a list of node numbers with multiple instances of each number.
    The number of instances of each node number are
    in the same proportion as the desired probabilities

    Uses random.choice() to select a node number from this list for each trial.
    """

    def __init__(self, num_nodes):
        """
        Initialize a DPATrial object corresponding to a
        complete graph with num_nodes nodes

        Note the initial list of node numbers has num_nodes copies of
        each node number
        """
        self._num_nodes = num_nodes
        self._node_numbers = [node for node in range(num_nodes) for dummy_idx in range(num_nodes)]


    def run_trial(self, num_nodes):
        """
        Conduct num_node trials using by applying random.choice()
        to the list of node numbers

        Updates the list of node numbers so that the number of instances of
        each node number is in the same ratio as the desired probabilities

        Returns:
        Set of nodes
        """

        # compute the neighbors for the newly-created node
        new_node_neighbors = set()
        for dummy_idx in range(num_nodes):
            new_node_neighbors.add(random.choice(self._node_numbers))

        # update the list of node numbers so that each node number
        # appears in the correct ratio
        self._node_numbers.append(self._num_nodes)
        self._node_numbers.extend(list(new_node_neighbors))

        #update the number of nodes
        self._num_nodes += 1
        return new_node_neighbors

    def printDPA(self):
        print "Node number: ", self._num_nodes
        print self._node_numbers

def in_degree_distribution(digraph):
    """
    Given a directional graph, this function will compute the in degree distribution
    """
    print "Processing In-Degree Distribution" # Status indicator for long processing times
    xgraph = {} #create a blank dict
    x_in_degrees = compute_in_degrees(digraph) # This function has already been written. Reusing function
    for degrees in iter(x_in_degrees.viewvalues()): # we are counting how many nodes have what degrees so we are in a since doing an inverse of the above function. Converting the degrees to the keys of the dict
        if not xgraph.has_key(degrees): # since the same degrees show up multiple times we only want it to show up once (dict keys need to be unique anyways) this keeps errors from being thrown
            xgraph[degrees] = 0 # this creates the key and sets an initial value of 0
        xgraph[degrees]+= 1 # every time the degree comes up during the the loop it increase the value by 1

    return xgraph # returns the final dict
#end in_degree_distribution function

def compute_in_degrees(digraph):
    """
    given a directional Graph, this function will compute the total in degrees for each node
    """
    print "processing In-Degrees" # Status indicator for long processing times
    xgraph = {} # create a blank dict
    for node in iter(digraph.viewkeys()): # creates an iter of just the keys in the dict. increase performance for larger data sets maybe? IE only shows the keys
        xgraph[node] = 0 # from the list of keys (nodes) creates a new keys for a new dict
        for edges in iter(digraph.viewvalues()): # creates an iter of just the values in the dict. increase performance for larger data sets maybe? IE only shows the values
            if node in edges: # looks for the nodes in the edges (from dict values)
                xgraph[node] += 1 # if node found increase by 1
        #print digraph.itervalues()

    return xgraph # returns a new dict with nodes as keys and the value is how many in degrees
#end compute_in_degrees function

def normalize_in_degree_distribution(digraph):
    """
    Takes a directed graph, computes its unnormalized
    in-degree distribution using function in_degree_distribution

    Returns normalized distribution
    """
    print "Start Normalizing In-Degree Distribution" # Status indicator for long processing times
    normalize_dist = {} # Create blank dict
    node_count = len(digraph) # get node count
    unnormized_dist = in_degree_distribution(digraph) # compute unnormalized dist and save to var
    for in_degree in iter(unnormized_dist.viewkeys()): # create and iter view and loop through each value
        normalize_dist[in_degree] = unnormized_dist[in_degree] / node_count
    print "End Normalizing In-Degree Distribution" # Status indicator for long processing times

    return normalize_dist
#end normize_in_degree_distribution function
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
#end make_complete_graph function


def make_DPA_graph(n,m):
    dpa = DPATrial(m)
    dpa_graph = make_complete_graph(m)
    for new_node in range(m,n):
        new_node_neighbors = dpa.run_trial(m)
        dpa_graph[new_node] = new_node_neighbors
    return dpa_graph


#custom graphs
#print make_DPA_graph(27770,12)

#print in_degree_distribution(make_DPA_graph(27770,12))
#print xnDPA
#graph1 = normalize_in_degree_distribution(xnDPA)
#print graph1
graph1 = normalize_in_degree_distribution(make_DPA_graph(27770,12))

#print graph1

plt.loglog( graph1.keys(), graph1.values(), 'bo')
plt.xlabel('Papers ID (log)')
plt.ylabel('Citation Frequency (log)')
plt.title('DPA - Citation Model Data (Point Graph)')
plt.show()

