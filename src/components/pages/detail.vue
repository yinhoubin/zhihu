<template>
  <div class="wrapper">
    <header>
      <back class="return"></back>
      <div class="T_no">
        <i class="fa fa-thumbs-up no"></i>
        <span class="t_no">{{T_popularity}}</span>
      </div>
      <div class="T_comment">
        <i class="fa fa-comments comment" @touchstart="tomorecomment(id)"></i>
        <span class="t_comment">{{T_comment}}</span>
      </div>
      <i class="fa fa-star star" @touchstart="save()"></i>
      <i class="fa fa-share-alt share"></i>
    </header>
    <div class="Img">
      <img :src="data.image" alt>
    </div>
    <div v-html="data.body" class="Body"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API.js";

var onOff = true;
export default {
  components: {},
  props: [],
  data() {
    return {
      data: "",
      id: "",
      T_comment: "",
      T_popularity: "",
      img: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    save() {
      // console.log(onOff)
      if (onOff == false) {
        this.$(".star").css("color", "#fff");
        onOff = true;
      } else {
        this.$(".star").css("color", "orange");
        onOff = false;
      }

      var arr = localStorage.getItem("arr")
        ? JSON.parse(localStorage.getItem("arr"))
        : [];

      if (arr.some(item => item.id == this.$route.params.id)) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == this.$route.params.id) {
            arr.splice(i, 1);
            break;
          }
        }
      } else {
        arr.push({
          title: this.title,
          images: this.img,
          id: this.$route.params.id
        });
      }
      localStorage.setItem("arr", JSON.stringify(arr));
    },
    tomorecomment(id) {
      this.$router.push("/morecomment/" + id);
    }
  },
  mounted() {
    var that = this;
    this.id = this.$route.params.id;
    var arr = localStorage.getItem("arr")
      ? JSON.parse(localStorage.getItem("arr"))
      : [];
    if (arr.some(item => item.id == this.$route.params.id)) {
      this.$(".star").css("color", "orange");
      onOff = false;
    } else {
      this.$(".star").css("color", "#fff");
      onOff = true;
    }

    this.$http({
      url: API.Detail + "/" + this.id,
      method: "get"
    })
      .then(d => {
        //   console.log(d),
        this.data = d.data;
        this.img = d.data.images;
        this.title = d.data.title;
        console.log(d.data.image);
        //   console.log(this.id);
      })
      .catch(err => {
        console.log(err);
      });
    this.$http({
      url: API.comment + "/" + this.id,
      method: "get"
    })
      .then(d => {
        this.T_comment = d.data.comments;
        this.T_popularity = d.data.popularity;
        //  console.log(d);
      })
      .catch(err => {
        console.log(err);
      });

    window.onscroll = function() {
      var topScroll = Math.floor(that.$(window).scrollTop());
      var scrollDist = 300;
      // console.log(topScroll)
      if (topScroll <= scrollDist) {
        that.$("header").css("opacity",1-topScroll/scrollDist);
      }else{
        that.$("header").css("opacity",0)
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.wrapper {
  width: 100vw;

  header {
    width: 100%;
    height: 1rem;
    background-color: $headercolor;
    color: $fff;
    overflow: hidden;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;

    // padding-top: 0.2rem;
    .return {
      float: left;
      // margin-top: 0.2rem;
      margin-left: 0.4rem;
      font-size: 0.5rem;
      line-height: 1rem;
    }

    .share {
      float: right;
      // margin-top: 0.2rem;
      margin-right: 0.3rem;
      font-size: 0.5rem;
      line-height: 1rem;
    }

    .star {
      float: right;
      // margin-top: 0.2rem;
      margin-right: 0.5rem;
      font-size: 0.5rem;
      line-height: 1rem;
      background-color: $headercolor;
    }

    .T_comment {
      float: right;
      padding-right: 0.2rem;
      font-size: 0.5rem;
      line-height: 1rem;
    }

    .T_no {
      float: right;
      margin-right: 0.6rem;
      font-size: 0.5rem;
      line-height: 1rem;
    }
  }

  .Img {
    margin-top: 1rem;
    width: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 5rem;
    }
  }

  .Body {
    >>>.img-place-holder, .headline {
      height: 0;
    }
  }

  .Body {
    margin-right: 0.5rem !important;
  }
}
</style>

