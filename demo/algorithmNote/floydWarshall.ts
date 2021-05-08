
/* 
  动态规划计算途中所有最短路径
*/
const floydsalll = (graph) => {
  const length = graph.length;
  const dist = [];
  graph.forEach((element, idx) => {
    dist[idx] = element.map((ele) => (isFinite(ele) ? ele : Infinity));
  });
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph.length; j++) {
      for (let k = 0; k < graph.length; k++) {
        if (dist[i][j] + dist[j][k] < dist[i][k]) {
          dist[i][k] = dist[i][j] + dist[j][k];
        }
      }
    }
  }
  return dist;
};
