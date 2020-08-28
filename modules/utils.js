export const random = (low, high) => (Math.random() * (high - low) + low)
export const valmap = (v, a, b, x, y) => {
  return ((v - a) / (b - a)) * (y - x) + x
}
export const clamp = (a, x, y) => (Math.min(y, Math.max(a, x)))

export const easeOutElastic = (x) => {
  const c4 = (2 * Math.PI) / 3;  
  return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;  
}

export const sqDist = (x1, y1, x2, y2) => {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
}

export const easeInCubic = (x) => (x * x * x)
export const easeOutCubic = (x) => (1 - Math.pow(1 - x, 3))

export const bfs = (e, graph) => {
  let p, u
  p = u = 0
  let viz = {}
  let q = [e]
  viz[e] = true
  while (p <= u) {
    graph[q[p]].forEach(n => {
      if (!viz[n]) {
        viz[n] = true
        q[++u] = n
      }
    })
    p++
  }

  return q
}

export const computeConnectedComponents = (graph) => {
  const n = graph.length
  let assignment = {}
  let components = []
  for (let i = 0; i < graph.length; i++) {
    if (assignment[i]) continue
    let q = bfs(i, graph)
    let cId = components.length
    components.push(q)
    q.forEach(n => assignment[n] = cId)
  }
  return { assignment, components }
}
