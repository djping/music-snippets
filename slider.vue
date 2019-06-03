<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" ref="dot" v-show="(dot, index) in dots"
        :class="{active: index === currentIndex}"
      >
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { addClass } from './dom'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
     dots: [],
     currentIndex: 0,
     timer: null
    }
  },
  props: {
    loop: {
      type:Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2000
    }
  },
  mounted () {
    this._initWidth()
    this._initDots()
    this._initSlider()
    window.addEventListener('resize', () => {
      this._initWidth()
      // dom change
      this.slider.refresh()
    })
  },
  methods: {
    _initWidth () {
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      this.children = this.$refs.sliderGroup.children
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        child.style.width = sliderWidth + 'px'
        addClass(child, 'slider-item')
        width += sliderWidth
      }
      this.sliderGroup.style.width = width + 'px'
    },
    _initSlider () {
      this.scroll = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400,
          click: true
        }
      })
      this.slider.on('scrollEnd', () => {
        let index = this.slider.getCurrentPage().pageX
        this.currentIndex = index
        clearTimeout(this.timer)
        this._play()
      })
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    _play () {
      this.timer = setTimeout(() => {
        let index = this.currentIndex
        this.slider.goToPage(index + 1, 0, 400)
      }, this.interval)
    }
  }
}
</script>

<style scoped lang="stylus">
// ignore css style
  .slider-item
    color red
  .active
    width 20px
</style>
