let defaultValue = {
	container: {},
	stats: {}, 
	controls: {} , 
	hiding: '',
	camera: {}, 
	scene: {}, 
	renderer: {},
	cwidth: 0, 
	cheight: 0,
	splineHelperObjects: [],
	positions: [],
	transformControl: {},
	dragcontrols: {},
	isPaused: 1
}

export function setGlobalVar(obj) {
	defaultValue = {
		...defaultValue,
		...obj
	}
} 

export default defaultValue;