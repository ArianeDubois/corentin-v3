<template>
  <div class="page overflow-hidden">
    <div
      ref="prev"
      class="
        fixed
        -translate-x-1/2 -translate-y-1/2
        z-20
        !text-transparent
        lg:!text-inherit
      "
      :class="hoverPrev ? 'lg:opacity-1 ' : 'opacity-0'"
    >
      PREV
    </div>
    <div
      ref="next"
      class="
        fixed
        -translate-x-1/2 -translate-y-1/2
        z-20
        !text-transparent
        lg:!text-inherit
      "
      :class="hoverNext ? 'lg:opacity-1' : 'opacity-0'"
    >
      NEXT
    </div>

    <client-only>
      <LayoutHeader :isProject="isProject" :indexActive="indexActive" />
    </client-only>

    <LayoutNumbers
      :projects="projects"
      :indexActive="indexActive"
      page="home"
      @slide-change="updateSlide"
    />

    <div
      class="
        fixed
        flex
        top-0
        h-[calc(100vh-120px)]
        lg:h-[calc(100vh-30px)]
        w-screen
        lg:cursor-none
        z-20
      "
    >
      <div
        class="w-1/2"
        @click="slidePrev"
        @mouseenter="hoverPrev = true"
        @mouseleave="hoverPrev = false"
      ></div>
      <div
        class="w-1/2"
        @click="slideNext"
        @mouseenter="hoverNext = true"
        @mouseleave="hoverNext = false"
      ></div>
    </div>

    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        class="
          swiper
          w-auto
          lg:h-[80vw]
          max-h-[75vh] max-w-[90vw]
          lg:max-w-[80vw]
        "
      >
        <div class="swiper-wrapper flex !items-center">
          <client-only>
            <div
              :data-index="`${image.project}`"
              class="swiper-slide"
              v-for="(image, index) in imagesObject"
              :key="`image-${index}`"
              ref="slide"
            >
              <nuxt-img
                v-if="!image.isVideo"
                class="
                  h-full
                  w-full
                  object-contain
                  max-h-[62vh]
                  lg:max-h-[80vh] lg:max-h-content
                "
                format="webp"
                quality="80"
                :src="`images/${image.project}/home/${image.slug}`"
                alt=""
                sizes="sm:100vw md:100vw xl:1200px 2xl:1200px"
              />
              <video
                v-if="image.isVideo"
                autoplay
                muted
                playsinline
                loop
                ref="video"
                class="
                  mx-auto
                  lg:h-[80vw] lg:max-h-[80vh] lg:max-w-[80vw]
                  video
                  pointer-events-none
                "
              >
                <source
                  :src="`images/${image.project}/home/${image.slug}`"
                  type="video/mp4"
                />
                <source src="maVideo.webm" type="video/webm" />
              </video>
            </div>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import projectsData from "/content/projects.json";
import { Swiper, Navigation, EffectFade } from "swiper";
import "swiper/swiper-bundle.min.css";

export default {
  data() {
    return {
      isProject: false,
      projects: projectsData,
      slider: null,
      imagesObject: [],
      indexActive: "01",
      hoverNext: false,
      hoverPrev: false,
    };
  },
  mounted() {
    this.projects.map((project) => {
      project.slider.map((image) =>
        this.imagesObject.push({
          slug: image.slug,
          project: project.index,
          isVideo: image.isVideo,
        })
      );
    });
    Swiper.use([Navigation, EffectFade]);

    this.$nextTick(() => {
      window.addEventListener("mousemove", this.handleMouseMove);

      this.slider = new Swiper(".swiper", {
        slidesPerView: 1,
        allowTouchMove: false,
        centeredSlides: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        navigation: {
          nextEl: this.$refs.swiper_next,
          prevEl: this.$refs.swiper_prev,
        },
      });
    });
  },
  destroyed() {
    if (this.slider) {
      this.slider.destroy();
      this.slider = null;
    }
  },

  head() {
    return {
      bodyAttrs: {
        class: "overflow-hidden index-" + this.indexActive,
      },
    };
  },

  methods: {
    handleMouseMove(event) {
      if (this.hoverNext) {
        this.$refs.next.style.top = event.clientY + "px";
        this.$refs.next.style.left = event.clientX + "px";
      }
      if (this.hoverPrev) {
        this.$refs.prev.style.top = event.clientY + "px";
        this.$refs.prev.style.left = event.clientX + "px";
      }
    },

    updateSlide(index) {
      let slideIndex = this.imagesObject.findIndex(
        (element) => element.project == index
      );

      this.indexActive = this.$refs.slide[slideIndex].getAttribute("data-index");
      this.slider.slideTo(slideIndex);
    },
    slidePrev() {
      if (this.slider.activeIndex < 1) {
        this.slider.slideTo(this.$refs.slide.length - 1);
        this.indexActive = "07";
      } else {
        this.slider.slidePrev();
        this.indexActive =
          this.$refs.slide[this.slider.activeIndex].getAttribute("data-index");
        if (this.$refs.slide[this.slider.activeIndex].querySelector(".video")) {
          this.$refs.slide[this.slider.activeIndex]
            .querySelector(".video")
            .play();
        }

        if (
          this.$refs.slide[this.slider.activeIndex + 1].querySelector(".video")
        ) {
          this.$refs.slide[this.slider.activeIndex + 1]
            .querySelector(".video")
            .pause();
        }
      }
    },
    slideNext() {
      if (this.$refs.slide.length - 1 == this.slider.activeIndex) {
        this.slider.slideTo(0);
        this.indexActive = "01";
      } else {
        this.slider.slideNext();
        this.indexActive =
          this.$refs.slide[this.slider.activeIndex].getAttribute("data-index");
        if (this.$refs.slide[this.slider.activeIndex].querySelector(".video")) {
          this.$refs.slide[this.slider.activeIndex]
            .querySelector(".video")
            .play();
        }
        if (
          this.$refs.slide[this.slider.activeIndex - 1].querySelector(".video")
        ) {
          this.$refs.slide[this.slider.activeIndex - 1]
            .querySelector(".video")
            .pause();
        }
      }
    },
  },
};
</script>
