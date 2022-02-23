<template>
 <el-dialog  v-bind="$attrs" v-on="$listeners">
   <!-- 对各种的slot做转发 -->
      <template v-for="(_,slotName) in $slots" v-slot:[slotName]>
            <slot :name="slotName"></slot>
          </template>
    <!--使用弹框的footer插槽添加按钮-->
    <template #footer>
      <!--对外继续暴露footer插槽，有个别弹框按钮需要自定义-->
      <slot name="footer">
        <!--将取消与确定按钮集成到内部-->
        <span>
          <el-button @click="_handlCeancel">取 消</el-button>
          <el-button type="primary" @click="_handleConfirm">
            确 定
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
//默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 
    //将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
    //通过设置 inheritAttrs 到 false，这些默认行为将会被去掉
    inheritAttrs: false,
   methods: {
    // 对外抛出cancel事件
    _handlCeancel() {
      this.$emit("cancel");
    },
    // 对外抛出 confirm事件
    _handleConfirm() {
      this.$emit("confirm");
    }
}
}
</script>

<style>

</style>