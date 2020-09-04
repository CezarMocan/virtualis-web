export default `
#define GLSLIFY 1

void main() {
    // Vertex shader output
    gl_Position = vec4(position, 1.0);
}
`