import Vue from 'vue';
Vue.directive('dialogDrag',{
  //绑定指令就加载自定义的拖拽事件
  bind(el){
    const head = el.getElementsByClassName('el-dialog__header')[0];
    const dragDom = el.getElementsByClassName('el-dialog')[0];
    const {max, min} = Math;
    head.style.cursor = 'move';
    dragDom.style.marginBottom = `0`;
    let isDown = false;
    let downX,downY;
    let styL, styT;
    let boundaryTop,boundaryLeft;
    let sty = dragDom.currentStyle || getComputedStyle(dragDom);

    head.addEventListener('mousedown', e => {
      e = e || window.event;
      isDown = true;
      downX = e.clientX;
      downY = e.clientY;
      if(sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100);
      }else if(sty.left.includes('px')){
        styL = +sty.left.replace(/px/g, '');
        styT = +sty.top.replace(/px/g, '');
      }else {
        styL = 0;
        styT = 0;
      }
      //边界值
      boundaryLeft = (el.offsetWidth - dragDom.offsetWidth) / 2;
      boundaryTop = dragDom.offsetTop - styT;
    });
    document.addEventListener('mousemove', e => {
      if(!isDown) return;
      e = e || window.event;
      let left = e.clientX - downX + styL;
      let top = e.clientY - downY + styT;
      left = min(max(-boundaryLeft, left), boundaryLeft);
      top = min(max(-boundaryTop, top) ,el.offsetHeight - dragDom.offsetHeight - boundaryTop - 1);
      dragDom.style.top = `${top}px`;
      dragDom.style.left = `${left}px`;
    });
    document.addEventListener('mouseup', ()=> {
      isDown = false;
    });
  },
  //监听状态重置样式
  update(el, binding){
    if(!binding.value)return;
    const dragDom = el.getElementsByClassName('el-dialog')[0];
    dragDom.style.cssText = `margin-top:${dragDom.style.marginTop};margin-bottom:${dragDom.style.marginBottom};width:${dragDom.style.width};`;
  }
});
