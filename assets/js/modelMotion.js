
function initdragControl(){
    dragcontrols = new THREE.DragControls(splineHelperObjects, camera, renderer.domElement);

    //  renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );

    dragcontrols.addEventListener( 'dragstart', function ( event ) {
        //  event.preventDefault();
        controls.enabled = false;

    } );
    dragcontrols.addEventListener('drag',function( event ){

        event.object.__dirtyPosition=true;  //改变对象位置的标志 @zl
        event.object.__dirtyRotation=true;
    });
    dragcontrols.addEventListener( 'dragend', function ( event ) {

        controls.enabled = true;

    } );
}

// function collision(collisionArray,Movingcube,camera,orbitControls) {
//     //获取到底部cube的中心点坐标
//
//     var originPoint = Movingcube.position.clone();
//
//     for(var vertexIndex = 0; vertexIndex < Movingcube.geometry.vertices.length; vertexIndex++){
//         //顶点原始坐标
//         var localVertex = Movingcube.geometry.vertices[vertexIndex].clone();
//         //顶点经过变换后的坐标
//         var globaVertex = localVertex.applyMatrix4(Movingcube.matrix);
//         //获得由中心指向顶点的向量
//         var directionVector = globaVertex.sub(Movingcube.position);
//
//         //将方向向量初始化
//         var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
//         //检测射线与多个物体相交的情况
//         var collisionResults = ray.intersectObjects(collisionArray, true);
//
//         //如果返回结果不为空，且交点与射线起点的距离小于物体中心至顶点的距离，则发生碰撞
//         if(collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() + 1.2 ){
//
//         }
//     }
// }