import { initDistAndVisited, minDistance, INF } from "./base/util";

/* 
  输出src点到图内每个顶点的最小路径
*/
function dijkstra(graph, src) {
  const {
    dist,
    visited
  } = initDistAndVisited(graph,[],[])
  //初始化源点到源点位置为0
  dist[src] = 0;
  for (let i = 0; i < graph.length; i++) {
    //获取当前未访问过的最近顶点（init时是自身）
    const minKey = minDistance(dist, visited);
    //设置已访问
    visited[minKey] = true;
    //遍历图内未访问列顶点，若最小点到列对应顶点的位置，若小于顶点序列(dist)到对应顶点的距离，设置为最小点到列对应顶点的位置
    for (let j = 0; j < graph.length; j++) {
      if (
        !visited[j] &&
        dist[minKey] !== INF &&
        dist[minKey] + graph[minKey][j] < dist[j]
      ) {
        dist[j] = dist[minKey] + graph[minKey][j];
      }
    }
  }
  return dist;
}

/* prim算法，计算MST问题，其实就是狄更斯算法加了个parent路径数组，根据路径数组算出最小生成树*/
function prim(graph) {
  const parent = [];
  //到每个顶点的距离序列
  const {
    dist,
    visited
  } = initDistAndVisited(graph,[],[])
  //初始化源点到源点位置为0
  dist[0] = 0;
  parent[0] = -1;
  for (let i = 0; i < graph.length; i++) {
    //获取当前未访问过的最近顶点（init时是自身）
    const minKey = minDistance(dist, visited);
    //设置已访问
    visited[minKey] = true;
    //遍历图内未访问列顶点，若最小点到列对应顶点的位置，若小于顶点序列(dist)到对应顶点的距离，设置为最小点到列对应顶点的位置
    for (let j = 0; j < graph.length; j++) {
      if (
        !visited[j] &&
        dist[minKey] !== INF &&
        dist[minKey] + graph[minKey][j] < dist[j]
      ) {
        parent[j] = minKey;
        dist[j] = dist[minKey] + graph[minKey][j];
      }
    }
  }
  return parent;
}
