<template>
  <div class="hello"></div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {

  }, mounted() {
    //获取元素
    var x = 0;
    var y = 0;
    var c_x = 0;
    var c_y = 0;
    var isDown = false;
    
    document.onmousedown =function(e) {
      //获取x坐标和y坐标
      x = e.clientX;
      y = e.clientY;

      // const { ipcRenderer } = window.require('electron')
      // ipcRenderer.send('md')
      // ipcRenderer.on('mainmd', (e, a) => {
      //   m_x = a.parent_x
      //   m_y = a.parent_y
      // })

      // ipcRenderer.send('cd')
      // ipcRenderer.on('childcd', (e, a) => {
      //   c_x = a.offsetX
      //   c_y = a.offsetY

      // })

      //开关打开
      isDown = true;
    }
    document.onmousemove = function (e) {
      if (isDown == false) {
        return;
      }
      var e = e || window.event;
      // if (this.time && Date.now() - this.time < 16) return
      // this.time = Date.now()
      e.stopPropagation();


      // 计算鼠标按下后移动的距离
      var nl = e.screenX - x;
      var nt = e.screenY - y;
      console.log('nt', nt);
      const { ipcRenderer } = window.require('electron')
      ipcRenderer.send('child_pos', { nl, nt })
      ipcRenderer.on('childcd', (e, a) => {
        const offsetX = a.offsetX
        const offsetY = a.offsetY
        console.log('offsetX', offsetX);
        console.log('offsetY', offsetY);
        console.log('nl', nl);
        console.log('nt', nt);
      })
      // 控制左右范围
      // if(nl < 0){
      //   dv.style.left ='0px';
      // }else if(nl > document.body.clientWidth - 85){
      //   dv.style.left = document.body.clientWidth - 85 + 'px';
      // }else{
      //   dv.style.left = nl + 'px';
      // }
      // // 控制上下
      // if(nt < 0){
      //   dv.style.top ='0px';
      // }else if(nt > document.body.clientHeight - 100){
      //   dv.style.top = document.body.clientHeight - 100 + 'px';
      // }else{
      //   dv.style.top = nt + 'px';
      // }

    }
    document.onmouseup = function() {
      isDown = false;
      if (isDown) {
        isDown = false;
      }
    }
  },
}
</script>
<style >
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/* body {
  -webkit-app-region: drag;
}
button {
  -webkit-app-region: no-drag;
} */
</style>
