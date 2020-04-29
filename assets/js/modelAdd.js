//=========origin物理盒子添加

function addBox(flag){
     var timestamp=new Date().getTime();
    let box;
    //添加三种快递盒子
    switch (flag) {
        case 0:
            box = new Physijs.BoxMesh(
                newBox,
                materials,
                1
            );
            box.position.set(-200,100,0);
            break;
        case 1:
            box = new Physijs.BoxMesh(
                newFBox,
                materials,
                1
            );
            box.position.set(200,100,0);
            break;
        case 2:
            box = new Physijs.BoxMesh(
                newLBox,
                materials,
                1
            );
            box.position.set(0,100,0);
            break;
    }

    box.castShadow = true;
    box.receiveShadow = true;
    box.name='box'+"_"+flag+"_"+timestamp;
    box.isBoxMove=0;//box是否移动 @zl
    box.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
        // this是当前监听的模型，other_object是与之碰撞的对象，relative_velocity是两个模型之间的速度力差，relative_rotation是两个模型旋转之间的差
        // if(other_object)
        // {
        //     if(other_object.name.indexOf("convery")!=-1)
        //         box.isBoxMove=1;
        // }

    });
    modelName.add("box"+"_"+flag);
    scene.add(box);
    boxObjects.push(box);//用专门的数组存储box @zl
    splineHelperObjects.push(box);
    modelName.add(box.name);
}

//展示墙添加 @wj
function addWall(){
    var timestamp=new Date().getTime();
    if(modelName.contains("wall")){
        for(var i=0;i<splineHelperObjects.length;i++){
            if (splineHelperObjects[i].name.split("_")[0]=="wall"){
                var obj=splineHelperObjects[i].clone();
                obj.name="wall"+"_"+timestamp;
                obj.position.z+=50;
                scene.add(obj);
                splineHelperObjects.push(obj);
                break;
            }
        }

        return;
    }
    else{
        timestamp=0;
    }

    var loader = new THREE.TextureLoader;
    loader.load('./assets/img/wall/f_wall.jpg',function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2,1);
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({map : texture, side: THREE.DoubleSide }),
            .8,
            .0
        )
        var BoxGeometry = new THREE.BoxBufferGeometry(300, 150, 10);

        var wall = new Physijs.BoxMesh(BoxGeometry, material, 0);
        wall.position.y = 75;
        wall.position.z = -200;
        wall.castShadow = true;
        wall.receiveShadow = true;
        wall.name="wall"+"_"+timestamp;
        scene.add(wall);
        splineHelperObjects.push(wall);
        modelName.add("wall");
    });

}

//添加指示灯
function addLight(){
    var timestamp = new Date().getTime();
    var torus = Column(to_material,torusGeometry,0,0,0);//圆框
    torus.rotateX(Math.PI / 2);
    var cy_material = new THREE.MeshBasicMaterial({color: 0xff0000});//指示灯纹理与图形
    var cylinderGeometry = new THREE.CylinderBufferGeometry(10,10,4,32);
    var light = Column(cy_material,cylinderGeometry, 0,100,-10);
    light.rotateX(Math.PI / 2);

    light.material.color = red;
    light.add(torus);
    light.signal = 1;
    light.name="light"+"_"+timestamp;
    splineHelperObjects.push(light);
    return light;

}


//original——modeladd without physimesh
// function addimportmodel(name){
//     var timestamp=new Date().getTime();
//     new THREE.ColladaLoader().load( './model/formalmodel/'+name+'.dae', function ( collada ) {
//         var target=collada.scene.clone();
//         target.traverse(function(obj){
//             obj.castShadow=true;
//         });
//
//         target.position.set(0,0,0);
//         target.scale.set(2,2,2);
//         target.__dirtyRotation=true;
//         target.__dirtyPosition=true;
//         target.name=name+timestamp;
//         scene.add(target);
//         splineHelperObjects.push(target);
//     } );
// }

function addimportmodel(name){
    var timestamp=new Date().getTime();
    if(modelName.contains(name)){
        for(var i=0;i<splineHelperObjects.length;i++){
            if (splineHelperObjects[i].name.split("_")[0]==name){
                var obj=splineHelperObjects[i].clone();
                obj.name=name+"_"+timestamp;
                obj.position.x+=150;
                scene.add(obj);
                splineHelperObjects.push(obj);
                break;
            }
        }
        return;
    }
    else{
        timestamp=0;
    }



    new THREE.ColladaLoader().load( './assets/model/formalmodel/'+name+'.dae', function ( collada ) {

        var target=collada.scene;

        target.traverse(function(obj){
            obj.castShadow=true;
            if(obj instanceof THREE.Mesh){
                obj.material.flatShading = true;
            }
        });

        if(name == 'Roboticarm'){
            target.scale.set(100,100,100);
        }
        else {
            target.scale.set(2, 2, 2);
        }


        var box3 = new THREE.Box3().setFromObject(target);
        var v3 = new THREE.Vector3();
        //获得包围盒长宽高尺寸，结果保存在参数三维向量对象v3中
        box3.getSize(v3);
        console.log("v3:",v3);
        var center = new THREE.Vector3();
        box3.getCenter(center);

        //重新设置模型的位置，使之居中。
        target.position.x = target.position.x - center.x;
        target.position.y = target.position.y - center.y;
        target.position.z = target.position.z - center.z;

        var boxmaterial = new Physijs.createMaterial(
            new THREE.MeshPhongMaterial({
                color: Math.random() * 0xffffff}),
            .1,
            .0
        );
        boxmaterial.transparent=true;
        boxmaterial.depthWrite = false;
        boxmaterial.opacity=0;
        var box = new Physijs.BoxMesh(
            new THREE.BoxBufferGeometry(v3.x, v3.y, v3.z),
            //target.children[0].geometry,
            boxmaterial,
            0
        );
        box.position.set(20,v3.y/2,0);
        box.castShadow=true;

        box.addEventListener('collision',function(){

        });

        box.add(target);
       // box.__dirtyRotation=true;
       // box._dirtyPosition=true;
        box.name=name+"_"+timestamp;
        scene.add(box);
        modelName.add(name);
        splineHelperObjects.push(box);
    } );
}
