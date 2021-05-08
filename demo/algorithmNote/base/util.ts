export const INF = Number.MAX_SAFE_INTEGER;

export const initDistAndVisited = (graph,dist,visited) => {
  //到每个顶点的距离序列
  let newDist = [...dist],
      //对应顶点是否访问过
      newVisite = [...visited];
  //初始化顶点距离为INF，每个顶点都未访问过
  for (let index = 0; index < graph.length; index++) {
    newDist[index] = INF;
    newVisite[index] = false;
  }
  return {
    dist: newDist,
    visited: newVisite
  }
}
export const minDistance = (dist, visited) => {
  let min = INF,
      minKey = -1;
  dist.forEach((ele, idx) => {
    if (visited[idx] === false && ele < min) {
      min = ele;
      minKey = idx;
    }
  });
  return minKey;
};
