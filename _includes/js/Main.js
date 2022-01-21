var APP = APP || {};

APP.Main = class Main {
	constructor(domElement){
		this._container = domElement;
		// Renderer
		this._renderer  = new THREE.WebGLRenderer({
			antialias  : true,
			alpha    : true,
		});
		this._renderer.setClearColor( 0x222222, 1 );
		this._container.appendChild( this._renderer.domElement );
		// Camera + scene
		this._camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
		this._camera.position.set(5,2,5);
		this._camera.lookAt(new THREE.Vector3(0,0,0));
	        this.scene = new THREE.Scene();

		// Engine
		this._engine = new APP.Engine();

		// render scene
		this._engine.onUpdateFcts.push((delta,now)=>{
			this._renderer.render( this.scene, this._camera );
		})

		// Move camera around center
		this._engine.onUpdateFcts.push((delta,now)=>{
			let posX=5*Math.cos(now);
			let posZ=5*Math.sin(now);
			this._camera.position.set(posX,3,posZ);
			this._camera.lookAt(new THREE.Vector3(0,0,0));
		})


		// resize
		this.onWindowResize();
		window.addEventListener('resize', ()=>{
	                this.onWindowResize();
	        }, false)


		this._addObject();
		this._addLights();
	}
	start(){
		this._engine.start();
	}
	stop(){
		this._engine.stop();
	}
	_addObject(){
		
		let directionalLight	= new THREE.DirectionalLight('white', 1);
		directionalLight.position.set(0.5, 4, 2);
		this.scene.add( directionalLight );
		
		let sphere = new TEST.Sphere();
		sphere.addLight(directionalLight);
		this.scene.add( sphere.object3d );
		// Move camera around center
		this._engine.onUpdateFcts.push((delta,now)=>{
			sphere.update(delta,now);
		})
	}
	_addLights(){
		// add ambient light
		// let ambientLight = new THREE.AmbientLight( 0x020202 );
		// this.scene.add( ambientLight );
		// add a light in front
		// let directionalLight	= new THREE.DirectionalLight('white', 1);
		// directionalLight.position.set(0.5, 0.5, 2);
		// this.scene.add( directionalLight );
		// add a light behind
		// let secondDirectionalLight	= new THREE.DirectionalLight('white', 0.75);
		// secondDirectionalLight.position.set(-0.5, -0.5, -2);
		// this.scene.add( secondDirectionalLight );
	}
	onWindowResize(){
		let width  =  window.innerWidth;
		let height =  window.innerHeight;
		this._camera.aspect = width / height;
	        this._camera.updateProjectionMatrix();
		this._renderer.setSize( width, height );
	}


}
