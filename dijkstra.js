class WeightedGraph {
	constructor() {
		this.adjacencyList = {};
	}
	addVertex(vertex) {
		if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
	}
	addEdge(vertex1, vertex2, weight) {
		this.adjacencyList[vertex1].push({ node: vertex2, weight });
		this.adjacencyList[vertex2].push({ node: vertex1, weight });
	}
	dijkstra(start, finish) {
		const nodes = new PriorityQueue();
		const distances = {};
		const previous = {};
		let path = []; // this will be returned at the end
		let smallest;
		//build up initial state
		for (let vertex in this.adjacencyList) {
			if (vertex === start) {
				distances[vertex] = 0;
				nodes.enqueue(vertex, 0);
			} else {
				distances[vertex] = Infinity;
				nodes.enqueue(vertex, Infinity);
			}
			previous[vertex] = null;
		}
		// as long as there is a node to visit
		while (nodes.values.length) {
			smallest = nodes.dequeue().val;
			if (smallest === finish) {
				// Done
				// Build path to return
				while (previous[smallest]) {
					path.push(smallest);
					smallest = previous[smallest];
				}
				break;
			}
			if (smallest || distances[smallest] !== Infinity) {
				for (let neighbor in this.adjacencyList[smallest]) {
					// find neighboring node
					let nextNode = this.adjacencyList[smallest][neighbor];
					// calculate new distance to neighboring node (the current distance to our node -> distances[smallest] + the distance to the neighbor nextNode.weight)
					let candidate = distances[smallest] + nextNode.weight;
					let nextNeighbor = nextNode.node;
					if (candidate < distances[nextNeighbor]) {
						// updating new smallest distance to the neighbor
						distances[nextNeighbor] = candidate;
						// updating previous - how we got to next neighbor
						previous[nextNeighbor] = smallest;
						// enqueue in priority queue with new priority
						nodes.enqueue(nextNeighbor, candidate);
					}
				}
			}
		}
		// smallest holds the starting vertex which is not added to path in the while loop
		// used concat here to also add that
		return path.concat(smallest).reverse();
	}
}

class Node {
	constructor(val, priority) {
		this.val = val;
		this.priority = priority;
	}
}
class PriorityQueue {
	constructor() {
		this.values = [];
	}
	// Insert a value into the heap
	enqueue(val, prio) {
		const newNode = new Node(val, prio);
		this.values.push(newNode);
		let index = this.values.length - 1;
		const element = this.values[index];
		while (index > 0) {
			let parentIndex = Math.floor((index - 1) / 2);
			let parent = this.values[parentIndex];
			if (element.priority >= parent.priority) break;
			this.values[parentIndex] = element;
			this.values[index] = parent;
			index = parentIndex;
		}
	}
	// Remove the highest value (the root) from the heap
	dequeue() {
		const max = this.values[0];
		const end = this.values.pop();
		if (this.values.length > 0) {
			this.values[0] = end;
		}
		const length = this.values.length;
		let parentIdx = 0;
		let parent = this.values[0];
		while (true) {
			let leftChild, rightChild;
			let swap = null;
			let leftChildIdx = 2 * parentIdx + 1;
			let rightChildIdx = 2 * parentIdx + 2;
			if (leftChildIdx < length) {
				leftChild = this.values[leftChildIdx];
				if (leftChild.priority < parent.priority) {
					swap = leftChildIdx;
				}
			}
			if (rightChildIdx < length) {
				rightChild = this.values[rightChildIdx];
				if (
					(swap === null && rightChild.priority < parent.priority) ||
					(swap !== null && rightChild.priority < leftChild.priority)
				) {
					swap = rightChildIdx;
				}
			}
			if (swap === null) break;
			[ this.values[parentIdx], this.values[swap] ] = [
				this.values[swap],
				this.values[parentIdx]
			];
			parentIdx = swap;
		}
		return max;
	}
}

const graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);
console.log(graph.dijkstra('A', 'E'));
