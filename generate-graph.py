import networkx as nx
from networkx.readwrite import json_graph
import json

#large
#print json.dumps(json_graph.node_link_data(nx.fast_gnp_random_graph(80,0.03)))
#small
#print json.dumps(json_graph.node_link_data(nx.fast_gnp_random_graph(20,0.10)))
#medium
print json.dumps(json_graph.node_link_data(nx.fast_gnp_random_graph(40,0.05)))