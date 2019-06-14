<template>
  <div class="wrapper">
    <div class="mask" @touchstart.self="hide()">
      <div class="con">
        <div class="top">
          <div class="pic">
            <img
              class="yonghu"
              src="http://pic1.zhimg.com/b7832fc1784e7574a8da5ebb7fe1fbe4_im.jpg"
              alt
            >
          </div>
          <p class="log">请登陆</p>
          <div class="load">
            <i class="fa fa-star"></i>
            <span @touchstart="collect()">我的收藏</span>
            <i class="fa fa-download"></i>
            <span>离线下载</span>
          </div>
        </div>
        <div class="First">
          <i class="fa fa-home"></i>
          <span class="sy" @touchstart="shouye()">首页</span>
        </div>
      </div>
    </div>
    <div class="nav">
      <i class="fa fa-bars" id="meau" @touchstart="Show()"></i>
      <span>{{num}}条收藏</span>
    </div>
    <div class="news">
      <ul>
        <li class="box" v-for="item in arr" :key="item.id" @touchstart="toDetail(item.id)">
          <p>{{item.title}}</p>
          <div class="pic">
            <img :src="item.images" alt>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      num: "",
      arr: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    shouye() {
      this.$router.push("/index");
    },
    Show() {
      this.$(".mask").animate({ left: 0 });
    },
    hide() {
      this.$(".mask").animate({ left: "-100%" });
    },
    toDetail(id) {
      this.$router.push("/detail/" + id);
    }
  },
  mounted() {
    var arr = localStorage.getItem("arr");
    this.num = JSON.parse(arr).length;
    this.arr = JSON.parse(arr);
    // console.log(this.arr)
    // console.log(JSON.parse(arr))

    
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.wrapper {
  .mask {
    position: fixed;
    left: -100%;
    top: 0px;
    z-index: 4;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    .con {
      width: 80%;
      height: 100%;
      background-color: $fff;
      color: $fff;

      .top {
        background-color: $headercolor;
        width: 100%;
        height: 2rem;
        padding-top: 0.2rem;
        overflow: hidden;

        .log {
          margin-top: 0.4rem;
          font-size: 0.4rem;
        }

        .pic {
          background-color: green;
          height: 1rem;
          width: 1rem;
          border-radius: 50%;
          margin-left: 0.2rem;
          margin-right: 0.3rem;
          float: left;

          .yonghu {
            border-radius: 50%;
            width: 100%;
          }
        }

        .load {
          margin-top: 0.7rem;
          margin-left: 0.4rem;
          font-size: 0.3rem;
          padding-bottom: 0.3rem;

          .star {
            padding-right: 0.3rem;
            display: inline-block;
          }

          i {
            margin-right: 0.5rem;
          }

          span {
            display: inline-block;
            margin-right: 0.3rem;
          }
        }
      }

      .First {
        background-color: #EBEBEB;
        height: 0.3rem;
        font-size: 0.4rem;
        color: $headercolor;
        padding: 0.3rem;

        .sy {
          display: inline-block;
          padiing-left: 0.5rem;
        }
      }
    }
  }

  .nav {
    width: 100%;
    height: 1rem;
    background: #00a2ed;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    font-size: 0.4rem;
    padding-left: 0.4rem;

    i {
      display: block;
      float: left;
      font-size: 0.5rem;
      color: $fff;
      line-height: 1rem;
    }

    span {
      padding-left: 0.4rem;
      font-size: 0.4rem;
      color: $fff;
      line-height: 1rem;
    }
  }

  .news {
    margin-top: 1rem;
  }

  ul {
    padding: 0.2rem;
    // padding-left 0
  }

  .box {
    background-color: #ccc;
    margin-bottom: 0.1rem;
    border-radius: 0.1rem;
    overflow: hidden;
  }

  .box p {
    flex: 1;
    float: left;
    width: 5rem;
    line-height: 0.3rem;
    height: 0.3rem;
    padding-top: 0.1rem;
    font-size: 0.3rem;
    margin-top: 0.3rem;
    padding-left: 0.1rem;
  }

  .box img {
    float: right;
    width: 1rem;
    height: 1rem;
    margin: 0.2rem 0.2rem 0.2rem 0;
  }
}
</style>