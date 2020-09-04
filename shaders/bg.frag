export default `#define GLSLIFY 1
uniform vec2 u_resolution;

uniform vec2 u_point1;
uniform float u_radius1;
uniform vec3 u_color1;

uniform vec2 u_point2;
uniform float u_radius2;
uniform vec3 u_color2;

uniform vec2 u_point3;
uniform float u_radius3;
uniform vec3 u_color3;

uniform vec2 u_point4;
uniform float u_radius4;
uniform vec3 u_color4;

uniform vec2 u_point5;
uniform float u_radius5;
uniform vec3 u_color5;

uniform float u_time;
uniform float u_frame;

highp float dist(vec2 a, vec2 b) {
  return sqrt(pow(a.x - b.x, 2.) + pow(a.y - b.y, 2.));
}

void main() {
  vec3 color;
  
  highp float d1 = dist(gl_FragCoord.xy, u_point1 * u_resolution);
  highp float d2 = dist(gl_FragCoord.xy, u_point2 * u_resolution);
  highp float d3 = dist(gl_FragCoord.xy, u_point3 * u_resolution);
  highp float d4 = dist(gl_FragCoord.xy, u_point4 * u_resolution);
  highp float d5 = dist(gl_FragCoord.xy, u_point5 * u_resolution);
  if (d1 <= u_radius1) {
    color = u_color1;
  } else if (d2 <= u_radius2) {
    color = u_color2;
  } else if (d3 <= u_radius3) {
    color = u_color3;
  } else if (d4 <= u_radius4) {
    color = u_color4;
  } else if (d5 <= u_radius5) {
    color = u_color5;
  } else {
    highp float t1, t2, t3, t4, t5, sum;
    t1 = max(0., 1. / pow(d1 - u_radius1, 2.1));
    t2 = max(0., 1. / pow(d2 - u_radius2, 2.1));
    t3 = max(0., 1. / pow(d3 - u_radius3, 2.1));
    t4 = max(0., 1. / pow(d4 - u_radius4, 2.1));
    t5 = max(0., 1. / pow(d5 - u_radius5, 2.1));
    sum = (t1 + t2 + t3 + t4 + t5);
    color = u_color1 * (t1 / sum) + u_color2 * (t2 / sum) + u_color3 * (t3 / sum) + u_color4 * (t4 / sum) + u_color5 * (t5 / sum);
  }
    // Fragment shader output
    gl_FragColor = vec4(color, 1.0);
}`