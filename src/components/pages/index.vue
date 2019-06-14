<template>
  <div class="wrapper">
    <div class="mask" @touchstart.self="hide()">
      <div class="con">
        <div class="top">
          <div class="pic">
            <img class="yonghu" src="http://pic1.zhimg.com/b7832fc1784e7574a8da5ebb7fe1fbe4_im.jpg" alt>
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
      <div class="navLeft">
        <i class="fa fa-bars" id="meau" @touchstart="Show()"></i>
        <span>{{name}}</span>
      </div>
      <div class="navRight">
        <i class="fa fa-bell" id="bell"></i>
        <span class="fa fa-ellipsis-v" id="more"></span>
      </div>
    </div>
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      @someSwiperEvent="callback"
      v-if="top_stories.length"
    >
      <!-- slides -->
      <swiper-slide v-for="item in top_stories" :key="item.id">
        <img :src="item.image" @touchstart="toDetail(item.id)">
        <p>{{item.title}}</p>
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>

    <div class="news" v-for="(item,index) in news" :key="index">
      <p class="title">{{item.title}}</p>
      <ul class="ul">
        <li
          v-for="(it) in item.data"
          :key="it.id"
          class="box"
          :id="it.id"
          @touchstart="toDetail(it.id)"
        >
          <p>{{it.title}}</p>
          <div class="pic">
            <img :src="it.images" alt>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import API from "../../common/js/API.js";

Date.prototype.getWeek = function() {
  var arr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var day = this.getDay();
  return arr[day];
};
var num = 0;
function getDate(num) {
  var date = new Date().getTime();
  //1 params=20190610 title=06月09日 星期日
  var newDate = new Date(date - (num - 1) * 24 * 60 * 60 * 1000);

  var year1 = newDate.getFullYear();
  var month1 =
    newDate.getMonth() + 1 < 10
      ? "0" + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1;
  var day1 =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  var params = year1 + "" + month1 + "" + day1;
  // title
  var newDate2 = new Date(date - num * 24 * 60 * 60 * 1000);
  var month2 =
    newDate2.getMonth() + 1 < 10
      ? "0" + (newDate2.getMonth() + 1)
      : newDate2.getMonth() + 1;
  var day2 =
    newDate2.getDate() < 10 ? "0" + newDate2.getDate() : newDate2.getDate();
  var week = newDate2.getWeek();
  var title = month2 + "月" + day2 + "日" + " " + week;
  return {
    params: params,
    title: title
  };
}
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: [],
  data() {
    return {
      name: "首页",
      isload: true,
      // isShow: false,
      news: [],
      top_stories: [],
      title: "首页",
      swiperOption: {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  watch: {},
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    shouye(){
      this.$router.push("/index");
    },
    Show() {
      this.$(".mask").animate({'left':0})
    },
    hide(){
      this.$(".mask").animate({'left':"-100%"})
    },

    collect(){
      this.$router.push('/collect')
    },
    callback() {},
    toDetail(id) {
      this.$router.push("/detail/" + id);
    },
    getNewDate() {
      if (this.isload) {
        this.isload = false;
        num++;
        this.$http({
          url: API.before + "/" + getDate(num).params
        }).then(d => {
          this.isload = true;
          this.news.push({
            title: getDate(num).title,
            data: d.data.stories
          });
          // console.log(d);
        });
      }
    }
  },
  mounted() {
    var that = this;
    this.$http({
      url: API.Ndatas,
      method: "get"
    })
      .then(d => {
        this.news.push({
          title: "今日新闻",
          data: d.data.stories
        });
        this.top_stories = d.data.top_stories;
        this.getNewDate();
      })
      .catch(err => {
        console.log(err);
      });

    window.onscroll = function() {
      var wh =
        document.documentElement.clientHeight || document.body.clientHeight;
      var st = document.documentElement.scrollTop || document.body.scrollTop;
      var dh =
        document.documentElement.offsetHeight || document.body.offsetHeight;
      if (wh + st + 30 >= dh) {
        that.getNewDate();
      }

      //
      if (st < 220) {
        that.name = "首页";
      } else {
        var times = document.querySelectorAll(".title");
        for (var i = 0; i < times.length; i++) {
          if (times[i].getBoundingClientRect().top + st < st + wh) {
            // console.log(times[i].getBoundingClientRect().top + st);
            // console.log(times[i].innerHTML)
            that.name = times[i].innerHTML;
          }
        }
      }
    };
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
          .yonghu{
            border-radius :50%
            width 100%
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

    .navLeft {
      width: 50%;
      float: left;
      text-align: left;
      padding-left: 0.4rem;

      i {
        display: block;
        float: left;
        font-size: 0.5rem;
        color: $fff;
        line-height: 1rem;
      }

      span {
        // margin-left: 0.5rem;
        float: left;
        display: block;
        font-size: 0.38rem;
        color: $fff;
        line-height: 1rem;
      }
    }

    .navRight {
      float: right;
      text-align: right;
      padding-right: 0.4rem;

      i {
        display: block;
        float: left;
        font-size: 0.5rem;
        color: $fff;
        line-height: 1rem;
      }

      span {
        margin-left: 0.5rem;
        float: left;
        display: block;
        font-size: 0.44rem;
        color: $fff;
        line-height: 1rem;
      }
    }
  }

  .swiper-container {
    padding-top: 1rem;
  }

  .swiper-container img {
    width: 100%;
    height: 4rem;
  }

  .swiper-container p {
    position: absolute;
    width: 7rem;
    text-align: center;
    top: 2.8rem;
    color: #fff;
    font-size: 0.4rem;
  }

  .title {
    padding-top: 0.3rem;
    padding-left: 0.2rem;
    padding-bottom: 0.2rem;
    color: $primary;
  }

  .ul {
    margin: 0.2rem;
    padding-left 0
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