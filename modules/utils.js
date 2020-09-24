import paper, { Point, Size } from 'paper'

export const random = (low, high) => (Math.random() * (high - low) + low)
export const randomSgn = () => (Math.random() < 0.5 ? 1 : -1)
export const valmap = (v, a, b, x, y) => {
  return ((v - a) / (b - a)) * (y - x) + x
}
export const clamp = (a, x, y) => (Math.min(y, Math.max(a, x)))
export const sleep = (s) => new Promise((res, rej) => setTimeout(res, s * 1000))

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

export const createAlignedText = (str, path, style, reps = 20) => {
  if (str && str.length > 0 && path) {
    // create PointText object for each glyph
    var glyphTexts = [];
    for (var i = 0; i < str.length; i+=1) {
        glyphTexts[i] = createPointText(str.substring(i, i+1), style);
        glyphTexts[i].justification = "center";
    }
    // for each glyph find center xOffset
    var xOffsets = [0];
    for (var i = 1; i < str.length; i++) {
        var pairText = createPointText(str.substring(i - 1, i + 1), style);
        pairText.remove();
        xOffsets[i] = xOffsets[i - 1] + pairText.bounds.width - 
            glyphTexts[i - 1].bounds.width / 2 - glyphTexts[i].bounds.width / 2;
    }
    
    const textPadding = 25
    reps = Math.min(reps, Math.floor(path.length / (xOffsets[xOffsets.length - 1] + textPadding)))

    for (let i = 1; i < reps; i++) {
      let reminder = Math.floor(path.length) % reps
      let currOffset = Math.floor(path.length / reps) * i + (i <= reminder)
      for (let j = 0; j < str.length; j+=1) {
        xOffsets.push(xOffsets[j] + currOffset)
        glyphTexts.push(createPointText(str.substring(j, j+1), style))
        glyphTexts[glyphTexts.length - 1].justification = "center"
      }
    }

    updateAlignedText(glyphTexts, xOffsets, path, 0)
    return { glyphTexts, xOffsets }
  }
}

const PATH_POINT_CACHE = {}
const PATH_TANGENT_CACHE = {}

export const updateAlignedText = (glyphTexts, xOffsets, path, offset, speed = -1) => {
  for (var i = 0; i < glyphTexts.length; i++) {
    var centerOffs = xOffsets[i] + offset;
    if (path.length < centerOffs) {
        if (path.closed) {
            centerOffs = centerOffs % path.length;
        }  else {
            centerOffs = undefined;
        }
    }
    if (centerOffs === undefined) {
        glyphTexts[i].remove();
    } else {
        if (!PATH_POINT_CACHE[centerOffs]) PATH_POINT_CACHE[centerOffs] = path.getPointAt(centerOffs);

        if (!PATH_TANGENT_CACHE[centerOffs]) PATH_TANGENT_CACHE[centerOffs] = path.getTangentAt(centerOffs);
        if (!PATH_TANGENT_CACHE[(centerOffs + path.length - speed) % path.length]) PATH_TANGENT_CACHE[(centerOffs + path.length - speed) % path.length] = path.getTangentAt((centerOffs + path.length - speed) % path.length);

        var pathPoint = PATH_POINT_CACHE[centerOffs]
        glyphTexts[i].point = pathPoint;
        if (speed > 0) {
          var oldTan = PATH_TANGENT_CACHE[(centerOffs + path.length - speed) % path.length]; 
          var tan = PATH_TANGENT_CACHE[centerOffs]; 
          // console.log(centerOffs, offset, tan.angle, oldTan.angle)
          if (tan.angle != oldTan.angle) glyphTexts[i].rotate(tan.angle - oldTan.angle, pathPoint);  
        } else {
          var tan = PATH_TANGENT_CACHE[centerOffs]; 
          glyphTexts[i].rotate(tan.angle, pathPoint);  
        }
    }
  }
}

// create a PointText object for a string and a style
const createPointText = (str, style) => {
  var text = new paper.PointText();
  Object.keys(style).forEach(k => {
    text[k] = style[k]
  })
  text.content = str;
  return text;
}

export const hex2rgb = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}