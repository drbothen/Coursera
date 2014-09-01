"""
Created on Sep 1, 2014
@author: Joshua Magady
Language: Python 2.x
Script: ER Algorithm
"""
import random
import matplotlib.pyplot as plt
from Citation_Graphs import normalize_in_degree_distribution

"""
def er(num_of_nodes, probability):
    graph = {}
    i = 0
    for node in range(num_of_nodes):
        edge_node_set = set([])
        print i
        i+=1
        for edge_node in range(num_of_nodes):
            if node != edge_node:
                a = random.uniform(0,1)
                if a < probability:
                    edge_node_set.add(edge_node)
                graph[node] = edge_node_set

    return graph
"""
random.seed(5)
def er(num_nodes,p) :
    """
    Takes the number of nodes num_nodes and returns a dictionary corresponding to a complete directed graph with the specified number of nodes

    """
    complete_graph = {}
    if (num_nodes <= 0):
        return complete_graph
    for node_index in range(num_nodes) :
        # Loop through all possible nodes and edges, adding edges to set
        complete_graph[node_index] = set([])
        for edge_index in range(num_nodes) :
            if (node_index != edge_index) :
                val = random.random()
                if (val < p):
                    complete_graph[node_index].add(edge_index)
    return complete_graph

graph = er(10000, 0.01)
distribution = normalize_in_degree_distribution(graph)

plt.title('Normalized in-degree distribution (Point graph)')
plt.xlabel('In-degrees (log)')
plt.ylabel('Normalized Values (log)')
plt.loglog(distribution.keys(), distribution.values(), 'ro')
plt.show()