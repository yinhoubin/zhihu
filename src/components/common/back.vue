<template>
  <div class="back">
    <!-- <button class="btn btn-default" @click='$router.go(-1)'>返回</button> -->
    <i class="fa fa-mail-reply" @click='$router.go(-1)'></i>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  data () {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted () {}
};
</script>
<style lang="stylus" scoped>
.back
  display inline-block
</style>
