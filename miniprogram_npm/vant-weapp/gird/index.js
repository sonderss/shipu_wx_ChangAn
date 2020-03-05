// miniprogram_npm/vant-weapp/gird/index.js
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    size: {
      type: String || Number,
      value: '20',
    },
    icon:{
      type:String,
      value:''
    },
    name:{
      type:String,
      value:''
    },
    num:{
      type:String || Number,
      value:''
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    evnetBack:function(n){
      this.triggerEvent('customevent', this.properties.num) 
    }
  }
})