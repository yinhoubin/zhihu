<template>
  <div class="wrapper">
    <div class="top">
      <back class="return"></back>
      <p class="dp">
        <span>{{comments.length+shortComments.length}}</span>条点评
      </p>
      <i class="fa fa-pencil edit"></i>
    </div>
    <div class="longComment">
      <p class="count">
        <span class="leng">{{comments.length}}</span>条长评
      </p>
      <hr>
      <div class="show" v-if="comments.length==0">
        <b></b>
        <hr>
      </div>

      <div v-for="item in comments" :key="item.id" class="t_circle">
        <img :src="item.avatar" alt class="pic">
        <span class="author">{{item.author}}</span>
        <span class="num">{{item.likes}}</span>
        <i class="fa fa-thumbs-up"></i>
        <p class="con">{{item.content}}</p>
        <p class="time">{{item.time|moment}}</p>
        <hr>
      </div>
    </div>
    <div class="first">
      <div class="T_short">
        <span>{{shortComments.length}}</span>条短评
      </div>
      <i class="fa fa-angle-double-down T_double" @touchstart="toshort()"></i>
    </div>
    <!-- <div v-if="shortComments.length==0">
      <b></b>
      <hr>
    </div>-->
    <div class="shortComment" v-if="isShow">
      <hr>
      <div v-for="item in shortComments" :key="item.id" class="t_circle">
        <img :src="item.avatar" alt class="pic">
        <span class="author">{{item.author}}</span>
        <span class="num">{{item.likes}}</span>
        <i class="fa fa-thumbs-up"></i>
        <p class="con">{{item.content}}</p>
        <p class="time">{{item.time|moment}}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API.js";
export default {
  components: {
    // vBack
  },
  props: [],
  data() {
    return {
      comments: [],
      shortComments: [],
      isShow: false,
      id: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    toshort() {
      this.isShow = !this.isShow;
      // console.log(this.$('.first').offset().top)
      this.$('body,html').animate({'scrollTop':this.$('.first').offset().top-10},100)
    }
  },
  mounted() {
    var that=this
    this.id = this.$route.params.id;
    this.$http({
      url: API.longComment + "/" + this.id + "/" + "long-comments",
      method: "get"
    })
      .then(d => {
        this.comments = d.data.comments;
        console.log(d);
      })
      .catch(err => {
        console.log(err);
      });
    this.$http({
      url: API.longComment + "/" + this.id + "/" + "short-comments"
    })
      .then(d => {
        this.shortComments = d.data.comments;
        console.log(d);
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
      // console.log(wh, st, dh);
    };
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.wrapper {
  width: 100vw;

  b {
    display: inline-block;
    width: 100%;
    height: 75% vh;
    background: url('../../../static/images/shafa.jpg') no-repeat 50% 50%;
    background-size: 30% 30%;
  }

  .top {
    height: 1rem;
    background-color: $headercolor;
    overflow: hidden;
    

    .return {
      float: left;
      margin-top: 0.3rem;
      margin-left: 0.3rem;
      font-size: 0.4rem;
      color: $fff;
    }

    .edit {
      float: right;
      margin-top: 0.3rem;
      margin-right: 0.6rem;
      font-size: 0.4rem;
      color: #fff;
    }

    .dp {
      float: left;
      font-size: 0.4rem;
      color: #fff;
      margin: 0.3rem 0 0 0 !important;
      padding-left: 0.9rem;

      span {
        display: inline-block;
        padding-right: 0.1rem;
        height: 1rem;
      }
    }
  }

  .longComment {
    hr {
      margin: 0.2rem 0 0.2rem 0 !important;
      background-color: $primary;
    }

    .count {
      margin: 0.2rem 0 0 0.2rem !important;
      color: $primary;

      .leng {
        padding-right: 0.1rem;
        display: inline-block;
      }
    }
  }

  .t_circle {
    img {
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      margin-left: 0.3rem;
    }

    .author {
      font-size: 0.2rem;
      color: black;
    }

    i {
      color: $primary;
      float: right;
      margin-top: 0.1rem;
      margin-right: 0.1rem;
    }

    .num {
      float: right;
      margin-top: 0.1rem;
      margin-right: 0.6rem;
    }
  }

  .con {
    text-indent: 2em;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    font-size: 0.2rem;
    line-height: 0.3rem;
    margin: 0.07rem 0.3rem 0 0 !important;
  }

  .time {
    padding-left: 0.3rem;
  }

  .first {
    overflow: hidden;

    .T_short {
      float: left;

      span {
        margin-right: 0.1rem;
        margin-left: 0.2rem;
      }
    }

    .T_double {
      float: right;
      margin-right: 0.7rem;
      color: $primary;
      display: inline-block;
    }
  }
}
</style>

