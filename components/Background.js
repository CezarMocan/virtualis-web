import React from 'react'
import { withMainContext } from '../context/MainContext'
import * as THREE from 'three'
import fragmentShader from '../shaders/bg.frag'
import vertexShader from '../shaders/bg.vert'
import { gradients } from '../modules/gradients'

class Main extends React.Component {
  init = () => {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		// Add the renderer to the sketch container
		var container = document.getElementById("sketch-container");
		container.appendChild(this.renderer.domElement);

		// Initialize the scene
		this.scene = new THREE.Scene();

		// Initialize the camera
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		// Initialize the clock
		this.clock = new THREE.Clock(true);

		// Create the plane geometry
		this.geometry = new THREE.PlaneBufferGeometry(2, 2);

    this.gradient = this.getGradientFromUrl(this.props.url)
		// Define the shader uniforms
		this.uniforms = {
			u_time : { type : "f", value : 0.0 },
			u_frame : { type : "f", value : 0.0 },
      u_resolution : { type : "v2", value : new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio) },
      ...this.gradient
		};

		// Create the shader material
		this.material = new THREE.ShaderMaterial({
			uniforms : this.uniforms,
			vertexShader : vertexShader,
			fragmentShader : fragmentShader
		});

		// Create the mesh and add it to the scene
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);

    // Add the event listeners
    window.addEventListener("resize", this.onWindowResize, false);
  }
  onWindowResize = () => {
	// Update the renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);

  // Update the resolution uniform
    this.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio);
    this.renderThree()
  }
  animate = () => {
    requestAnimationFrame(this.animate);
		this.renderThree();
  }
  renderThree = () => {
    this.uniforms.u_time.value = this.clock.getElapsedTime();
		this.uniforms.u_frame.value += 1.0;
		this.renderer.render(this.scene, this.camera);
  }
  componentDidMount() {
    this.init()
    // this.animate()
    this.renderThree()
  }
  getGradientFromUrl = (url) => {
    switch (url) {
      case 'tours':
        return gradients.tours
        break
      case 'book':
        return gradients.book
        break
      case 'watch':
        return gradients.watch
      case 'about':
        return gradients.about
      case 'faq':
        return gradients.faq
      default:
        return gradients.faq
    }

  }
  updateShaderUniforms = (o) => {
    Object.keys(o).forEach(k => {
      if (o[k].type == 'f') this.uniforms[k].value = o[k].value
      if (o[k].type == 'v2') this.uniforms[k].value.set(o[k].value.x, o[k].value.y)
      if (o[k].type == 'v3') this.uniforms[k].value.set(o[k].value.x, o[k].value.y, o[k].value.z)
    })
    this.renderThree()
  }
  componentWillUpdate(nextProps) {
    if (nextProps.url != this.props.url) {
      this.updateShaderUniforms(this.getGradientFromUrl(nextProps.url))
    }
  }
  render() {
    const { url } = this.props
    return (
      <div className="background-container" id="sketch-container">
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  url: context.url,
  router: context.router
}))(Main)