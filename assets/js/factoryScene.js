//工厂场景初始化 @wj
function initScene(){
    scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 60 });
    scene.setGravity(new THREE.Vector3(0, -200, 0));

    scene.addEventListener('update', () => {
        scene.simulate(undefined, 1);
    });

    // 环境光
    var ambientLight = new THREE.AmbientLight(0x404040,2);
    scene.add(ambientLight);

    //吊灯
    initSpotLight();

    //线性光
    var light = new THREE.DirectionalLight(0xffffff, 0.2);
    light.position.set(100, 400, 100);
    light.castShadow = true;
    var d = 2000;
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.near = -2000;
    light.shadow.camera.far = 2000;
    light.shadow.mapSize.x = 1500;
    light.shadow.mapSize.y = 1500;
    scene.add(light);

    initObjects();
}

//吊灯
function initSpotLight(){

    var ball = new THREE.SphereBufferGeometry(15,32,32);
    var ball_material = new THREE.MeshBasicMaterial( {color: 0xffffee} );

    //灯罩
    var points = [];
    for ( var i = 0; i < 10; i ++ ) {
        points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
    }
    var geometry_1 = new THREE.LatheBufferGeometry( points );
    var material_1 = new THREE.MeshPhongMaterial( { color: 0xc0c0c0 , side: THREE.DoubleSide} );

    var geometry_2 = new THREE.RingBufferGeometry( 1, 8, 12 );
    var material_2 = new THREE.MeshPhongMaterial( { color: 0xc0c0c0, side: THREE.DoubleSide } );

    for(let i = -1300; i <= 1300; i += 1300 ) {
        for(let j = -900; j <= 900; j += 900 ) {
            var pointLight = new THREE.PointLight(0xffffee, 0.5, 1500, 0.75);
            var sphere = new THREE.Mesh(ball, ball_material);
            var sphere_l = new THREE.Mesh(ball, ball_material);
            var sphere_r = new THREE.Mesh(ball, ball_material);
            pointLight.visible = true;
            pointLight.position.set(i, 670, j);
            pointLight.add(sphere);
            sphere_l.position.set(i-200, 670, j);
            sphere_r.position.set(i+200, 670, j);
            scene.add(pointLight);
            scene.add(sphere_l);
            scene.add(sphere_r);

            var lathe = Column(material_1, geometry_1, i, 680, j);
            lathe.rotateX(Math.PI);
            lathe.scale.set(2, 2, 2);
            var lathe_l = Column(material_1, geometry_1, i-200, 680, j);
            lathe_l.rotateX(Math.PI);
            lathe_l.scale.set(2, 2, 2);
            var lathe_r = Column(material_1, geometry_1, i+200, 680, j);
            lathe_r.rotateX(Math.PI);
            lathe_r.scale.set(2, 2, 2);

            var ring = Column(material_2, geometry_2, i, 700, j);
            ring.rotateX(Math.PI / 2);
            var ring_l = Column(material_2, geometry_2, i-200, 700, j);
            ring_l.rotateX(Math.PI / 2);
            var ring_r = Column(material_2, geometry_2, i+200, 700, j);
            ring_r.rotateX(Math.PI / 2);
        }
    }

    //灯绳
    var loader = new THREE.TextureLoader;
    loader.load('./assets/img/column/column2.jpg',function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1,1);

        var material = new THREE.MeshPhongMaterial({map : texture});

        var geometry_1 = new THREE.CylinderBufferGeometry(0.6,0.6,20,32);
        var geometry_2 = new THREE.CylinderBufferGeometry(0.6,0.6,60,32);
        var geometry_3 = new THREE.CylinderBufferGeometry(0.6,0.6,180,32);

        for(let i = -1300; i <= 1300; i += 1300 ) {
            for(let j = -900; j <= 900; j += 900 ) {
                Column(material, geometry_1, i, 709, j);
                Column(material, geometry_1, i-200, 709, j);
                Column(material, geometry_1, i+200, 709, j);
                if(j==0){
                    Column(material, geometry_3, i-220, 809, j);
                    Column(material, geometry_3, i+220, 809, j);
                }
                else{
                    Column(material, geometry_2, i-220, 749, j);
                    Column(material, geometry_2, i+220, 749, j);
                }
            }
        }
    });
}

//建立场景
function initObjects(){
    //地板
    initFloor();
    //墙壁
    initWalls(0,20);
    initWalls(1,15);
    initFalls(0,20);
    initFalls(1,15);
    initTas();
    //支撑柱
    initColumn_1();
    initColumn_2();
    initColumn_3();
    //四面墙石梁
    initStone();
    //天花板
    initceiling();
}

//地板 具有物理属性
function initFloor(){
    var loader = new THREE.TextureLoader;
    loader.load('./assets/img/floor/floor1.jpg',function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(12,9);
        var material = Physijs.createMaterial(
            new THREE.MeshPhongMaterial({map : texture, side: THREE.DoubleSide }),
            .8,
            .0
        )
        var planeGeometry = new THREE.PlaneBufferGeometry(4000, 3000);
        planeGeometry.rotateX(-Math.PI / 2);
        var plane = new Physijs.BoxMesh(planeGeometry, material, 0);
        plane.position.y = 0;
        plane.castShadow = true;
        plane.receiveShadow = true;
        scene.add(plane);
    });
}

//下墙壁
function initWalls(flag,t){
    var loader = new THREE.TextureLoader;

    loader.load('./assets/img/wall/wall1.jpg',function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(t,1);

        var material = new THREE.MeshPhongMaterial({map : texture, side : THREE.DoubleSide });

        if(flag==1) {
            var wallGeometry = new THREE.PlaneBufferGeometry( 3000,300 );
            wallGeometry.rotateY(Math.PI / 2);

            var wall_1 = Column(material,wallGeometry,2000,150,0);
            wall_1.receiveShadow = true;

            var wall_2 = Column(material,wallGeometry,-2000,150,0);
            wall_2.receiveShadow = true;
        }
        else if(flag==0){
            var wallGeometry = new THREE.PlaneBufferGeometry( 4000,300 );

            var wall_1 = Column(material,wallGeometry,0,150,1500);
            wall_1.receiveShadow = true;

            var wall_2 = Column(material,wallGeometry,0,150,-1500);
            wall_2.receiveShadow = true;
        }
    });
}

//墙梁
function initStone(){
    var loader = new THREE.TextureLoader;
    loader.load('./assets/img/wall/wall.jpg',function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(100,1);

        var material = new THREE.MeshPhongMaterial({map : texture});

        var geometry_1 = new THREE.BoxGeometry(3998,40,40);
        Column(material,geometry_1,0,279,1479);
        Column(material,geometry_1,0,279,-1479);

        var geometry_2 = new THREE.BoxGeometry(40,40,2998);
        Column(material,geometry_2,1979,279,0);
        Column(material,geometry_2,-1979,279,0);
    });
}

//上砖墙
function initFalls(flag, t){
    var loader = new THREE.TextureLoader;
    loader.load('./assets/img/wall/f_wall.jpg',function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(t,2);

        var material = new THREE.MeshPhongMaterial({map : texture, side : THREE.DoubleSide });

        if(flag==1){
            var fallGeometry = new THREE.PlaneBufferGeometry( 3000,400 );
            fallGeometry.rotateY( Math.PI / 2);

            var fall_1 = Column(material,fallGeometry,2000,500,0);
            fall_1.receiveShadow = true;

            var fall_2 = Column(material,fallGeometry,-2000,500,0);
            fall_2.receiveShadow = true;
        }
        else if(flag==0){
            var fallGeometry = new THREE.PlaneBufferGeometry( 4000,400 );

            var fall_1 = Column(material,fallGeometry,0,500,1500);
            fall_1.receiveShadow = true;

            var fall_2 = Column(material,fallGeometry,0,500,-1500);
            fall_2.receiveShadow = true;
        }

    });
}

//三角
function initTas() {
    var x = 1500, y = 700;
    var TShape = new THREE.Shape();

    TShape.moveTo(x, y);
    TShape.lineTo(x - 3000, y);
    TShape.lineTo(x - 1500, y + 200);
    TShape.lineTo(x, y);

    var geometry = new THREE.ShapeBufferGeometry(TShape);
    geometry.rotateY(Math.PI / 2);

    var loader = new THREE.TextureLoader;
    loader.load('./assets/img/wall/f_wall.jpg',function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.005, 0.005);

        var material = new THREE.MeshPhongMaterial({map : texture, side : THREE.DoubleSide });

        Column(material,geometry,2000,0,0);
        Column(material,geometry,-2000,0,0);
    });

}

//墙柱
function initColumn_1() {
    var loader = new THREE.TextureLoader;
    loader.load('./assets/img/wall/wall.jpg',function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1,10);

        var material = new THREE.MeshPhongMaterial({map : texture});

        //左右墙柱子
        var geometry_1 = new THREE.BoxBufferGeometry(40,300,32);
        for(var i = -1600; i <= 1600; i += 800 ){
            Column(material,geometry_1,i,150,1481);
            Column(material,geometry_1,i,150,-1481);
        }

        //前后墙柱子
        var geometry_2 = new THREE.BoxBufferGeometry(32,300,40);
        for(var i = -900; i <= 900; i+=900){
            Column(material,geometry_2,1981,150,i);
            Column(material,geometry_2,-1981,150,i);
        }
    });
}

//钢柱
function initColumn_2() {
    var loader = new THREE.TextureLoader;
    loader.load('./assets/img/column/column2.jpg',function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1,1);

        var material = new THREE.MeshPhongMaterial({map : texture});

        var geometry_1 = new THREE.BoxBufferGeometry(20,400,20);
        for(var i = -1600; i <= 1600; i += 800 ){
            Column(material,geometry_1,i,500,1489);
            Column(material,geometry_1,i,500,-1489);
        }

        var geometry_2 = new THREE.BoxBufferGeometry(20,480,20);
        var geometry_3 = new THREE.BoxBufferGeometry(20,600,20);
        for(var i = -900; i <= 900 ; i += 900 ){
            if(i == 0){
                Column(material,geometry_3,1989,600,i);
                Column(material,geometry_3,-1989,600,i);
            }
            else{
                Column(material,geometry_2,1989,540,i);
                Column(material,geometry_2,-1989,540,i);
            }
        }

    });
}

//天花板吊顶
function initColumn_3(){
    var loader = new THREE.TextureLoader;
    loader.load('./assets/img/column/column2.jpg',function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1,1);

        var material = new THREE.MeshPhongMaterial({map : texture});

        var geometry_1 = new THREE.BoxBufferGeometry(20,20,1513);
        for(var i = -1600; i <= 1600; i += 800 ){
            var column_1 = Column(material,geometry_1,i,789,749);
            var column_2 = Column(material,geometry_1,i,789,-749);
            column_1.rotateX(Math.PI / (180 / 7.6));
            column_2.rotateX(-Math.PI / (180 / 7.6));
        }

        var geometry_2 = new THREE.BoxBufferGeometry(3998,22,20);
        Column(material,geometry_2,0,888,0);
        var column_3 = Column(material,geometry_2,0,769,900);
        var column_4 = Column(material,geometry_2,0,769,-900);
        column_3.rotateX(Math.PI / (180 / 7.6));
        column_4.rotateX(-Math.PI / (180 / 7.6));

        var geometry_3 = new THREE.BoxBufferGeometry(500,5,20);

        for(let i = -1300; i <= 1300; i += 1300 ) {
            for (let j = -900; j <= 900; j += 900) {
                Column(material, geometry_3, i, 718, j);
            }
        }
    });
}

//天花板
function initceiling(){
    var loader = new THREE.TextureLoader;
    loader.load('./assets/img/ceiling/ceiling2.jpg',function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(27,9);
        var material = new THREE.MeshPhongMaterial({map : texture, side: THREE.BackSide });
        var planeGeometry = new THREE.PlaneBufferGeometry(4000, 1513);

        var plane_1 = Column(material,planeGeometry,0,800,750);
        plane_1.rotateX(-Math.PI / 2);
        plane_1.rotateX(Math.PI / (180 / 7.6));

        var plane_2 = Column(material,planeGeometry,0,800,-750);
        plane_2.rotateX(-Math.PI / 2);
        plane_2.rotateX(-Math.PI / (180 / 7.6));
    });
}

//加载图形模板
function Column(material,geometry,x,y,z){
    var column = new THREE.Mesh(geometry, material);
    column.position.set(x,y,z);
    column.receiveShadow = true;
    scene.add(column);
    return column;
}

function initRender(){

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        precision: 'highp',
        alpha: true
    });

    renderer.setClearColor(new THREE.Color("#F2F2F2"));
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(cwidth, cheight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    container.appendChild(renderer.domElement);
}

//模拟开始 @wj
function WorkspaceSimulate(){
    is_Paused = false;
    scene.simulate();
}

//暂停 @wj
function pauseSimulate(){
    is_Paused = true;
}

//重置场景 @wj
function resumeSimulate(){
    //如果正在模拟 先暂停
    if(!is_Paused)pauseSimulate();

    for(let i = 0, len = splineHelperObjects.length; i < len; i++){
        scene.remove(splineHelperObjects[i]);
        clearCache(splineHelperObjects[i]);
    }
    for(let i = 0, len = boxObjects.length; i < len; i++){
        scene.remove(boxObjects[i]);
    }

    splineHelperObjects.splice(0,splineHelperObjects.length);
    boxObjects.splice(0,boxObjects.length);
}

//清空当前对象的缓存
function clearCache(object){
    let mesh = object;
    mesh.traverse(function (item) {
        if(item instanceof THREE.Mesh){
            item.geometry.dispose();
            item.material.dispose();
        }
    });
}

function initStats() {

    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.bottom = '0px';

    document.getElementById("Stats-output").appendChild(stats.domElement);

    return stats;
}