// 打开全屏弹窗
export function openFullModel(target) {
    let $model = $(target);
    if (!$model.hasClass('full_open')) {
        $model.addClass('full_open');
    }
}

// 关闭全屏弹窗
export function closeFullModel(target) {
    let $model = target.parents('.full_model');
    if ($model.hasClass('full_open')) {
        $model.removeClass('full_open');
    }
}

// 打开首页弹窗
export function openHomeModel() {
   	openFullModel('#homeModel');

   	// TODO: 加载首页相关信息
}

// 打开PLC弹窗
export function openPLCModel() {
   	openFullModel('#plcModel');
}

// 打开场景弹窗
export function openSceneModel(target){
	let key = target.data('key');

	$('.scene_type').removeClass('nav_act');
	$(`#${key}`).addClass('nav_act');

	$('.scene_container').removeClass('show');

	openFullModel('#sceneModel');

	let $container = $(`#${key}Container`);

	if(!$container) return;

	$container.addClass('show');

	// 数据仅初始打开时加载一次
	if($container.data('loaded')){
		return;
	}

	if(key === 'myScenes'){
		loadMyScenes();

	}else{
		loadPreScenes();
	}

}


// 获取我的场景资源
export function loadMyScenes(){
	// TODO: 场景资源获取
}


// 获取预设场景资源
export function loadPreScenes(){
	// TODO: 场景资源获取
}


// 切换模块参数弹窗显隐
export function paramModelToggle() {
    let $paramModel = $('#paramModel');
    let $checkParamModel = $('#checkParamModel');
    let $toolBtn = $('.tool_param');

    $paramModel.fadeToggle()

    if ($paramModel.hasClass('model_open')) {
        $toolBtn.removeClass('tool_act');
        $paramModel.removeClass('model_open');
        $checkParamModel.removeClass('tool_checked');

    } else {
        $toolBtn.addClass('tool_act');
        $paramModel.addClass('model_open');
        $checkParamModel.addClass('tool_checked');

    }
}

// 工具箱显隐
export function toolboxToggle() {
    let $toolBox = $('#toolbox');
    let $container = $('#toolContainer');
    let $checkToolBox = $('#checkToolBox');
    let $toolBtn = $('.tool_app');

    if ($toolBox.hasClass('tool_show')) {

        $toolBtn.removeClass('tool_act');
        $toolBox.removeClass('tool_show');
        $checkToolBox.removeClass('tool_checked');
        $container.getNiceScroll().remove();

    } else {

        $toolBtn.addClass('tool_act')
        $toolBox.addClass('tool_show');
        $checkToolBox.addClass('tool_checked');
        setTimeout(function() {
            $container.niceScroll({
                cursorcolor: '#888',
                cursorborder: ''
            });
        }, 600)

    }
}

export default {
    'home': openHomeModel, // 首页
    'new': '', // 新建
    'myScenes': openSceneModel, // 打开, 我的场景
    'scenes': openSceneModel, // 预设场景
    'save': '', // 保存
    'saveAs': '', // 另存为
    'exit': '', // 退出

    'plc': openPLCModel, // PLC

    'showToolBox': toolboxToggle, // 工具箱
    'showParam': paramModelToggle, // 模型参数
    'showProp': '', // 属性

    'simulate': WorkspaceSimulate, // 模拟
    'pausesim': pauseSimulate, // 停止
    'reset': resumeSimulate, // 重置
    'view': '', // 相机视角

    'closeModel': closeFullModel // 关闭弹窗
}