import networkx as nx
from networkx.readwrite import json_graph
import json

print json.dumps(json_graph.node_link_data(nx.barbell_graph(25, 25)))
