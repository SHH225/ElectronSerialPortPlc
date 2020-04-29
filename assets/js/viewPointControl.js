function initControl() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    //controls.maxDistance = 1300;//限定缩放距离
    controls.minDistance = 400;
    controls.enableDamping = true;//阻尼 使控件重量感
    controls.damping = 0.2;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minPolarAngle = Math.PI / 5;
    controls.addEventListener('change', render);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(55, cwidth / cheight, 1, 10000);
    camera.position.set(0, 0, 400);
    camera.lookAt(scene.position);
    scene.add(camera);
}

function render() {
    renderer.render(scene, camera);
}

//==========辅助坐标控件
function initTransform() {
    transformControl = new THREE.TransformControls(camera, renderer.domElement);
    transformControl.addEventListener('change', render);
    transformControl.addEventListener('dragging-changed', function (event) {
        controls.enabled = !event.value;
    });
    scene.add(transformControl);
}
