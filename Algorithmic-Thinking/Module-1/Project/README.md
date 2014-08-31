Project Description

Overview

For your first project, you will write Python code that creates dictionaries corresponding to some simple examples of graphs. You will also implement two short functions that compute information about the distribution of the in-degrees for nodes in these graphs. You will then use these functions in the Application component of Module 1 where you will analyze the degree distribution of a citation graph for a collection of physics papers. This final portion of module will be peer assessed. 

We will use Python 2 in this class since OwlTest (the machine grader) supports Python 2. For more information on recommended Python IDEs, please consult this class page. Note that this portion of the module should be simple for experienced Python programmers. If you find it challenging, your Python skills may not be sufficient to be successful in this class. 

Representing directed graphs
To gain a more tangible feel for how directed graphs are represented as dictionaries in Python, you will create three specific graphs (defined as constants) and implement a function that returns dictionaries corresponding to a simple type of directed graphs. If you are unclear on how to represent a directed graph as a dictionary, we suggest that you review the class notes on graph basics. 

EX_GRAPH0, EX_GRAPH1, EX_GRAPH2 - Define three constants whose values are dictionaries corresponding to the three directed graphs shown below. The graphs are numbered 0, 1, and 2, respectively, from left to right. (Sorry I Cant post the graphs per User aggreement)

make_complete_graph(num_nodes) - Takes the number of nodes num_nodes and returns a dictionary corresponding to a complete directed graph with the specified number of nodes. A complete graph contains all possible edges subject to the restriction that self-loops are not allowed. The nodes of the graph should be numbered 0 to num_nodes - 1 when num_nodes is positive. Otherwise, the function returns a dictionary corresponding to the empty graph.

Computing degree distributions

For the second part of this project, you will implement two functions that compute the distribution of the in-degrees of the nodes of a directed graph. 

compute_in_degrees(digraph) - Takes a directed graph digraph (represented as a dictionary) and computes the in-degrees for the nodes in the graph. The function should return a dictionary with the same set of keys (nodes) as digraph whose corresponding values are the number of edges whose head matches a particular node. 

in_degree_distribution(digraph) - Takes a directed graph digraph (represented as a dictionary) and computes the unnormalized distribution of the in-degrees of the graph. The function should return a dictionary whose keys correspond to in-degrees of nodes in the graph. The value associated with each particular in-degree is the number of nodes with that in-degree. In-degrees with no corresponding nodes in the graph are not included in the dictionary. 

Note that the values in the unnormalized distribution returned by this function are integers, not fractions. This unnormalized distribution is easier to compute and can later be normalized to sum to one by simply dividing each value by the total number of nodes. 




Score: 100/100


