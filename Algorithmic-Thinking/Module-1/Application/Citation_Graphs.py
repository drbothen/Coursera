from __future__ import division
"""
Created on Aug 26, 2014
@author: Joshua Magady
Language: Python 2.x
Script: Citation Graphing
"""

# general imports
import urllib2
#import dateutil
import matplotlib.pyplot as plot

#end general imports

CITATION_URL = "http://storage.googleapis.com/codeskulptor-alg/alg_phys-cite.txt" # URL for Data Set

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
# end of graphs

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

def load_graph(graph_url): # Function Provided By instructor - Grabs a specific graph from the internet and converts it to a form we can use
    """
    Function that loads a graph given the URL
    for a text representation of the graph

    Returns a dictionary that models a graph
    """
    graph_file = urllib2.urlopen(graph_url) # sets graph_file var to the file downloaded by urlopen
    graph_text = graph_file.read() # invokes read on the file downloaded
    graph_lines = graph_text.split('\n')
    graph_lines = graph_lines[ : -1]

    print "Loaded graph with", len(graph_lines), "nodes"

    answer_graph = {}
    for line in graph_lines:
        neighbors = line.split(' ')
        node = int(neighbors[0])
        answer_graph[node] = set([])
        for neighbor in neighbors[1 : -1]:
            answer_graph[node].add(int(neighbor))

    return answer_graph
#end load_graph function

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

def plot_normalized_in_degrees(ndigraph):
    """
    Creates a log/log plot of the points from a normalized distribution
    """
    print "Creating Plot" # Status indicator for long processing times
    plot.title('Normalized in-degree distribution (Point graph)') # Sets the name of the graph window
    plot.xlabel('In-degrees (log)') # Labels the X cords
    plot.ylabel('Normalized Values (log)') # Labels the Y Cords
    plot.xscale("log") # Sets the Scale of the graph on x cords to log
    plot.yscale("log") # Sets the Scale of the graph on y cords to log
    plot.plot(ndigraph.keys(), ndigraph.values(), "go") # creates the graph using the cords. (This case uses the degree distribution as X and the percentage of times it appears as Y. **kwargs as "g" for the color green. "o" for marker type: Circle
    plot.show() # Displays the Graph

    return # returns nothing

"""
example usages:
    print in_degree_distribution(EX_GRAPH1)
    print compute_in_degrees(EX_GRAPH2)
    print make_complete_graph(10)
    citation_graph = load_graph(CITATION_URL)
    print normalize_in_degree_distribution(EX_GRAPH2)
"""

"""
Start of actual program
"""
#print in_degree_distribution(load_graph(CITATION_URL))
#print normalize_in_degree_distribution(load_graph(CITATION_URL))
#plot_normalized_in_degrees(normalize_in_degree_distribution(load_graph(CITATION_URL))) #uncomment to create citation graph




