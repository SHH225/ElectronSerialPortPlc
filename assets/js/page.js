function doNothing(){
    window.event.returnValue=false;
    return false;
}

window.addEventListener('resize',function () {
    cwidth = window.innerWidth , cheight = window.innerHeight;
    camera.aspect = cwidth / cheight;

    camera.updateProjectionMatrix();
    controls.update();
    renderer.setSize(cwidth, cheight);
});