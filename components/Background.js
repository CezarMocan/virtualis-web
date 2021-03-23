import React from 'react'
import { withMainContext } from '../context/MainContext'
import * as THREE from 'three'
import fragmentShader from '../shaders/bg.frag'
import vertexShader from '../shaders/bg.vert'
import { gradients } from '../modules/gradients'

const COLOR_TRANSITION_TIME_S = 1

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

    const minSpeed = 15 / 60
    const maxSpeed = 30 / 60
    const getSpeed = () => {
      const t = {
        x: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * ((Math.random() < 0.5) ? 1 : -1) / window.innerWidth,
        y: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * ((Math.random() < 0.5) ? 1 : -1) / window.innerHeight,
      }
      // console.log(t)
      return t
    }
    // Setup moving gradient
    this.movement = {
      p1: { pos: { x: this.uniforms.u_point1.value.x, y: this.uniforms.u_point1.value.y }, speed: getSpeed() },
      p2: { pos: { x: this.uniforms.u_point2.value.x, y: this.uniforms.u_point2.value.y }, speed: getSpeed() },
      p3: { pos: { x: this.uniforms.u_point3.value.x, y: this.uniforms.u_point3.value.y }, speed: getSpeed() },
      p4: { pos: { x: this.uniforms.u_point4.value.x, y: this.uniforms.u_point4.value.y }, speed: getSpeed() },
      p5: { pos: { x: this.uniforms.u_point5.value.x, y: this.uniforms.u_point5.value.y }, speed: getSpeed() },
    }

    this.colorTransition = {
      timeStart: -10000,
      from: null,
      to: null
    }
  }
  destroy() {
    delete this.scene
    delete this.mesh
    delete this.material
    delete this.clock
    delete this.camera
    delete this.geometry
    window.removeEventListener("resize", this.onWindowResize);
    cancelAnimationFrame(this._raf)
  }
  onWindowResize = () => {
	// Update the renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);

  // Update the resolution uniform
    this.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio);
    this.renderThree()
  }
  interp = (a, b, t) => {
    return (b - a) * t + a
  }
  interpolateColor = (from, to, param, t) => {
    const r = this.interp(from[param].value.x, to[param].value.x, t)
    const g = this.interp(from[param].value.y, to[param].value.y, t)
    const b = this.interp(from[param].value.z, to[param].value.z, t)
    this.uniforms[param].value.set(r, g, b)
  }
  animate = () => {
    this._raf = requestAnimationFrame(this.animate);
    this.uniforms.u_time.value = this.clock.getElapsedTime();
    this.uniforms.u_frame.value += 1.0;
    
    Object.values(this.movement).forEach(v => {
      v.pos.x += v.speed.x
      v.pos.y += v.speed.y
      if (v.pos.x < 0 || v.pos.x > 1) v.speed.x = -v.speed.x
      if (v.pos.y < 0 || v.pos.y > 1) v.speed.y = -v.speed.y
    })

    this.uniforms.u_point1.value.set(this.movement.p1.pos.x, this.movement.p1.pos.y)
    this.uniforms.u_point2.value.set(this.movement.p2.pos.x, this.movement.p2.pos.y)
    this.uniforms.u_point3.value.set(this.movement.p3.pos.x, this.movement.p3.pos.y)
    this.uniforms.u_point4.value.set(this.movement.p4.pos.x, this.movement.p4.pos.y)
    this.uniforms.u_point5.value.set(this.movement.p5.pos.x, this.movement.p5.pos.y)

    // Gradient smooth transition when navigating between different pages on the site
    if (performance.now() - this.colorTransition.timeStart < 1000 * COLOR_TRANSITION_TIME_S) {
      const t = (performance.now() - this.colorTransition.timeStart) / (1000 * COLOR_TRANSITION_TIME_S)
      this.interpolateColor(this.colorTransition.from, this.colorTransition.to, 'u_color1', t)
      this.interpolateColor(this.colorTransition.from, this.colorTransition.to, 'u_color2', t)
      this.interpolateColor(this.colorTransition.from, this.colorTransition.to, 'u_color3', t)
      this.interpolateColor(this.colorTransition.from, this.colorTransition.to, 'u_color4', t)
      this.interpolateColor(this.colorTransition.from, this.colorTransition.to, 'u_color5', t)
    }

		this.renderThree();
  }
  renderThree = () => {
		this.renderer.render(this.scene, this.camera);
  }
  getGradientFromUrl = (url) => {
    switch (url) {
      case 'tours':
        return gradients.tours()
      case 'book':
        return gradients.book()
      case 'watch':
        return gradients.watch()
      case 'about':
        return gradients.about()
      case 'faq':
        return gradients.faq()
      default:
        return gradients.home()
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
    if (nextProps.url != this.props.url && nextProps.url) {
      // this.updateShaderUniforms(this.getGradientFromUrl(nextProps.url))
      this.colorTransition.from = this.getGradientFromUrl(this.props.url)
      this.colorTransition.to = this.getGradientFromUrl(nextProps.url)
      this.colorTransition.timeStart = performance.now()
    }
  }
  componentDidMount() {
    this.init()
    this.animate()
    // this.renderThree()
  }
  componentWillUnmount() {
    this.destroy()
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