# Dijkstra's Algorithm [![](https://img.shields.io/badge/Robert-Muraru-blue)](https://robert-muraru-portfolio.herokuapp.com/)


## Description
Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later

### [Dijkstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

*What is the shortest way to travel from Rotterdam to Groningen, in general: from given city to given city. It is the algorithm for the shortest path, which I designed in about twenty minutes. One morning I was shopping in Amsterdam with my young fiancée, and tired, we sat down on the café terrace to drink a cup of coffee and I was just thinking about whether I could do this, and I then designed the algorithm for the shortest path. As I said, it was a twenty-minute invention. In fact, it was published in '59, three years later. The publication is still readable, it is, in fact, quite nice. One of the reasons that it is so nice was that I designed it without pencil and paper. I learned later that one of the advantages of designing without pencil and paper is that you are almost forced to avoid all avoidable complexities. Eventually, that algorithm became to my great amazement, one of the cornerstones of my fame.*

— Edsger Dijkstra, in an interview with Philip L. Frana, Communications of the ACM, 2001


### Dijkstra's Pseudocode

- This function should accept a starting and ending vertex
- Create an object (__distances__) and set each key to be every vertex in the adjacency list with a value of __infinity__, except for the starting verex which should have a value of 0
- After setting a value in the __distances__ object, add each vertex with a priority of infinity to the priority queue, except the starting vertex, which should have a priority of 0 because that's where we begin.
- Create another object called __previous__ and set each key to be every vertex in the adjaceny list with a value of __null__
- Start looping as long as there is anything in the priority queue
    - Dequeue a vertex from the priority queue
    - If that vertex is the same as the ending vertex - we are done!
    - Otherwise loop through each value in the adjacency list at that vertex
        - Calculate the distance to that vertex from the starting vertex
        - If the distance is less than what is currently stored in our distances object
            - Update the distances object with the new lower distance
            - Update the previous object to contain that vertex
            - Enqueue the vertex with the total distance from the start node