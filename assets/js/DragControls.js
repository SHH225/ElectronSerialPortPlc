/**
 * @author zz85 / https://github.com/zz85
 * @author mrdoob / http://mrdoob.com
 * Running this will allow you to drag three.js objects around the screen.
 */
var dragob,tmpx,tmpz;
var movconstrain=0;
var realy,lock=1;
THREE.DragControls = function ( _objects, _camera, _domElement ) {

	var _plane = new THREE.Plane();
	var _raycaster = new THREE.Raycaster();

	var _mouse = new THREE.Vector2();
	var _offset = new THREE.Vector3();
	var _intersection = new THREE.Vector3();
	var _worldPosition = new THREE.Vector3();
	var _inverseMatrix = new THREE.Matrix4();

	var _selected = null, _hovered = null;

	//

	var scope = this;

	function activate() {

		_domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		_domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		_domElement.addEventListener( 'mouseup', onDocumentMouseCancel, false );
		_domElement.addEventListener( 'mouseleave', onDocumentMouseCancel, false );
		_domElement.addEventListener( 'touchmove', onDocumentTouchMove, false );
		_domElement.addEventListener( 'touchstart', onDocumentTouchStart, false );
		_domElement.addEventListener( 'touchend', onDocumentTouchEnd, false );

	}

	function deactivate() {

		_domElement.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		_domElement.removeEventListener( 'mousedown', onDocumentMouseDown, false );
		_domElement.removeEventListener( 'mouseup', onDocumentMouseCancel, false );
		_domElement.removeEventListener( 'mouseleave', onDocumentMouseCancel, false );
		_domElement.removeEventListener( 'touchmove', onDocumentTouchMove, false );
		_domElement.removeEventListener( 'touchstart', onDocumentTouchStart, false );
		_domElement.removeEventListener( 'touchend', onDocumentTouchEnd, false );

	}

	function dispose() {

		deactivate();

	}

	function onDocumentMouseMove( event ) {

		event.preventDefault();

		var rect = _domElement.getBoundingClientRect();

		_mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
		_mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

		_raycaster.setFromCamera( _mouse, _camera );

		if ( _selected && scope.enabled ) {

			if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {

				_selected.position.copy( _intersection.sub( _offset ).applyMatrix4( _inverseMatrix ) );
				//拖拽限制
				if(!movconstrain){
					// const  tmpy=_selected.position.y;
					var ty=getrealy(_selected.position.y);
					_selected.position.y=ty;

				}else{
					_selected.position.x=tmpx;
					_selected.position.z=tmpz;

					if(_selected.position.y<=25)
						_selected.position.y=25;
				}
			}

			scope.dispatchEvent( { type: 'drag', object: _selected } );

			return;

		}

		_raycaster.setFromCamera( _mouse, _camera );

		var intersects = _raycaster.intersectObjects( _objects, true );

		if ( intersects.length > 0 ) {

			var object = intersects[ 0 ].object;

			_plane.setFromNormalAndCoplanarPoint( _camera.getWorldDirection( _plane.normal ), _worldPosition.setFromMatrixPosition( object.matrixWorld ) );

			if ( _hovered !== object ) {

				scope.dispatchEvent( { type: 'hoveron', object: object } );

				_domElement.style.cursor = 'pointer';
				_hovered = object;

			}

		} else {

			if ( _hovered !== null ) {

				scope.dispatchEvent( { type: 'hoveroff', object: _hovered } );

				_domElement.style.cursor = 'auto';
				_hovered = null;

			}

		}

	}

	function onDocumentMouseDown( event ) {

		event.preventDefault();

		_raycaster.setFromCamera( _mouse, _camera );

		var intersects = _raycaster.intersectObjects( _objects, true );


		if ( intersects.length > 0 ) {

			//_selected = intersects[ 0 ].object.parent;
			//防止选中scene @zl
			if(intersects[ 0 ].object.parent instanceof Physijs.Scene){ //防止选中scene @zl
				_selected = intersects[ 0 ].object;
			}
			else {
				_selected =getFather(intersects[ 0 ].object.parent);
			}



			if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {

				_inverseMatrix.getInverse( _selected.parent.matrixWorld );
				_offset.copy( _intersection ).sub( _worldPosition.setFromMatrixPosition( _selected.matrixWorld ) );

			}

			_domElement.style.cursor = 'move';

			scope.dispatchEvent( { type: 'dragstart', object: _selected } );
			//右键旋转


			if(event.buttons==2){
				//console.log('right');
				var res = document.getElementById('rightbox');
				var posy=event.offsetY+30;
				var posx=event.offsetX+5;
				res.style.top = posy+'px';     //鼠标点击时给div定位Y轴
				res.style.left = posx+'px';    //鼠标点击时给div定位X轴
				res.style.display = 'block';
				dragob=_selected;
			}

		}


	}

	function onDocumentMouseCancel( event ) {

		event.preventDefault();

		if ( _selected ) {

			scope.dispatchEvent( { type: 'dragend', object: _selected } );

			_selected = null;

		}
		lock=1;
		_domElement.style.cursor = _hovered ? 'pointer' : 'auto';

	}

	function onDocumentTouchMove( event ) {

		event.preventDefault();
		event = event.changedTouches[ 0 ];

		var rect = _domElement.getBoundingClientRect();

		_mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
		_mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

		_raycaster.setFromCamera( _mouse, _camera );

		if ( _selected && scope.enabled ) {

			if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {

				_selected.position.copy( _intersection.sub( _offset ).applyMatrix4( _inverseMatrix ) );

			}

			scope.dispatchEvent( { type: 'drag', object: _selected } );

			return;

		}

	}

	function onDocumentTouchStart( event ) {

		event.preventDefault();
		event = event.changedTouches[ 0 ];

		var rect = _domElement.getBoundingClientRect();

		_mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
		_mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

		_raycaster.setFromCamera( _mouse, _camera );

		var intersects = _raycaster.intersectObjects( _objects, true );

		if ( intersects.length > 0 ) {

			_selected = intersects[ 0 ].object;

			_plane.setFromNormalAndCoplanarPoint( _camera.getWorldDirection( _plane.normal ), _worldPosition.setFromMatrixPosition( _selected.matrixWorld ) );

			if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {

				_inverseMatrix.getInverse( _selected.parent.matrixWorld );
				_offset.copy( _intersection ).sub( _worldPosition.setFromMatrixPosition( _selected.matrixWorld ) );

			}

			_domElement.style.cursor = 'move';

			scope.dispatchEvent( { type: 'dragstart', object: _selected } );

		}


	}

	function onDocumentTouchEnd( event ) {

		event.preventDefault();

		if ( _selected ) {

			scope.dispatchEvent( { type: 'dragend', object: _selected } );

			_selected = null;

		}

		_domElement.style.cursor = 'auto';

	}

	activate();

	// API

	this.enabled = true;

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;

};
function getFather(obj) {  //获取对象的顶层父对象 @zl

	if(!(obj.parent instanceof Physijs.Scene)){
		obj=obj.parent;
	}
	return obj;
}
function  getrealy(y) {
	if(lock){
		realy=y;
	}
	lock=0;
	return realy;
}
function rotate_mv(){

	if(dragob.signal == 1){
		dragob.rotateZ(Math.PI/2);
	}
	else {
		dragob.rotateY(Math.PI / 2);
	}
	dragob.__dirtyPosition = true;
	dragob.__dirtyRotation = true;//改变对象位置的标志
}
function vertical_mv(){
	movconstrain=1;
	tmpx=dragob.position.x;
	tmpz=dragob.position.z;

}
//delete and clone model @zl
function deleteModel() {
	if (!dragob) return;
	scene.remove(dragob);
	clearCache(dragob);

	for(let i=0, len = splineHelperObjects.length; i < len; i++){
		if(splineHelperObjects[i].name==dragob.name){
			splineHelperObjects.splice(i, 1);
			break;
		}
	}

	//rightbox隐藏
	var res = document.getElementById('rightbox');
	res.style.display="none";
}
function cloneModel(){
	//复制指示灯
	if(dragob.signal == 1){
		var c_light = addLight();
		c_light.position.x = dragob.position.x + 50;
	}
	//复制模型
	else {
		var obj = dragob.clone();
		obj.position.x = dragob.position.x + 150;
		obj.position.z = dragob.position.z + 150;
		var timestamp = new Date().getTime();
		obj.name=dragob.name.split("_")[0]+timestamp;
		splineHelperObjects.push(obj);
		scene.add(obj);
	}

	var res = document.getElementById('rightbox');
	res.style.display="none";
}

function remove_constrain(){
	movconstrain=0;
}
//指示灯变色
function change_color(){
	for(let i = 0, len = splineHelperObjects.length; i < len; i++) {
		if( dragob.signal == 1){
			if (dragob.material.color == red) {
				dragob.material.color = green;
			} else {
				dragob.material.color = red;
			}
			break;
		}
	}
}
THREE.DragControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.DragControls.prototype.constructor = THREE.DragControls;


