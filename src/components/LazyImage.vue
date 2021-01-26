<template lang="pug">
  #LazyImage(ref="LazyImage" :style="boxStyle")
    //- loading
    .group(v-if="!complete" :style="isReady ? hideStyle : showStyle")
      //- hash canvas
      BlurhashCanvas.img(v-if="canHash" :hash="imgHashCode")
      //- loading image
      img.img.loading(v-if="!canHash && useLazy" :src="loadImg")

    //- ready
    .group(:style="isReady ? showStyle : hideStyle")
      //- origin image
      img.img(v-if="!isErr"
              :src="src"
              v-bind="$attrs"
              :style="imgStyle"
              @load="ImgLoaded"
              @error="ImgLoadErr")
      //- error image
      img.img.err-img(v-else :src="errImgSelect")

</template>

<script>
import BlurhashCanvas from "@/components/LazyImage/BlurhashCanvas";
import loadImg from "@/assets/loading.gif";
import errImgW from "@/assets/error_w.svg";
import errImgH from "@/assets/error_h.svg";

export default {
  components: {
    BlurhashCanvas
  },
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      default: ""
    },
    useHash: {
      // 使用模糊加載
      type: Boolean,
      default: () => false
    },
    hashCode: {
      // 模糊加載代碼
      type: String,
      default: ""
    },
    useLazy: {
      // 使用懶加載
      type: Boolean,
      default: () => true
    },
    width: {
      type: Number,
      default: 100 // 寬，100~0 為 %
    },
    height: {
      type: Number,
      default: 100 // 高，100~0 為 %, useHeightScale = true 時為寬的比例
    },
    useHeightScale: {
      // 使用圖片等比例
      type: Boolean,
      default: false
    },
    second: {
      type: Number,
      default: 0.6 // 動畫時間
    },
    objectFit: {
      // 圖片放置
      type: String,
      default: "cover"
    },
    borderPadding: {
      // 邊線間距
      type: String,
      default: "0"
    }
  },
  data () {
    return {
      isVisible: false,
      imgHashCode: "", // 模糊代碼
      isLoaded: false, // 圖片已加載
      isErr: false, // 圖片加載失敗
      loadImg, // 載入動畫
      errImgW, // 寬 失敗圖檔
      errImgH, // 長 失敗圖檔
      complete: false // 完成,
    };
  },
  computed: {
    canHash () {
      if (this.useHash && this.imgHashCode && this.imgHashCode.length > 0) {
        return true;
      }
      return false;
    },
    // 設定樣式
    boxStyle () {
      const _style = {};
      _style.backgroundColor = this.backColor;
      _style.width = `${this.width}${
        this.width <= 100 ? "%" : "px"
      } !important`;
      if (this.useHeightScale) {
        _style["padding-top"] = `${this.height}% !important`;
      } else {
        _style.height = `${this.height}${
          this.height <= 100 ? "%" : "px"
        } !important`;
      }
      return _style;
    },
    isReady () {
      return this.isLoaded || this.isErr;
    },
    showStyle () {
      if (!this.complete) {
        return {
          animation: `${this.second}s appear`
        };
      }
      return {};
    },
    hideStyle () {
      return {
        animation: `${this.second}s fade`
      };
    },
    imgStyle () {
      return {
        objectFit: `${this.objectFit} !important`,
        padding: this.borderPadding
      };
    },
    errImgSelect () {
      // 決定 errimg 用寬版還是長版
      const el = this.$refs.LazyImage;
      if (el.offsetWidth >= el.offsetHeight) {
        return this.errImgW;
      }
      return this.errImgH;
      // if (el.offsetWidth >= el.offsetHeight) {
      //   return this.errImgW;
      // }
      // return this.errImgH;
    }
  },
  watch: {
    src () {
      this.imgInit();
    },
    isReady (val) {
      if (val) {
        setTimeout(() => {
          this.complete = true;
        }, this.second * 1000);
        return;
      }
      this.complete = val;
    }
  },
  mounted () {
    this.imgInit();
  },
  methods: {
    imgInit () {
      this.isErr = false;
      this.isLoaded = false;
      if (this.useHash) {
        this.imgHashCode = "";
        this.ImgGetHashCode();
      }
    },
    // 圖載入成功
    ImgLoaded () {
      this.isLoaded = true;
    },
    // 圖載入失敗
    ImgLoadErr () {
      this.isErr = true;
    },
    // 擷取圖片 hash code
    ImgGetHashCode () {
      this.imgHashCode = this.hashCode || this.src.split("hash=")?.[1] || "";
    }
  }
};
</script>

<style lang="scss" scoped>
#LazyImage {
  position: relative !important;
  overflow: hidden;
  .group {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .loading {
      position: relative !important;
      object-fit: contain !important;
    }
    .img {
      position: absolute !important;
      object-fit: cover;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100% !important;
      height: 100% !important;
    }
    .err-img {
      box-sizing: border-box;
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      padding: 20% !important;
    }
  }
}
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
// 淡出
@keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>
