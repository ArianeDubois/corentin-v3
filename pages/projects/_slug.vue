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
      :class="hoverPrev ? 'lg:opacity-1' : 'opacity-0'"
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
      <LayoutHeader :isProject="isProject" />
    </client-only>

    <LayoutNumbers
      :indexActive="indexActive"
      :projects="projects"
      page="project"
    />
    <div
      class="
        fixed
        flex
        lg:cursor-none
        top-0
        lg:h-[calc(100vh-30px)]
        h-[calc(100vh-120px)]
        w-screen
        z-20
      "
      @mouseenter="(hoverPrev = false), (hoverNext = false)"
    >
      <div
        class="w-1/2"
        @mouseenter="hoverPrev = true"
        @mouseleave="hoverPrev = false"
        @click="pagePrev"
      ></div>
      <div
        class="w-1/2"
        @mouseenter="hoverNext = true"
        @mouseleave="hoverNext = false"
        @click="pageNext"
      ></div>
    </div>
    <div
      class="flex flex-col lg:h-[35vh]"
      :class="parseInt(project.index) > 4 ? 'lg:mt-[35vh] lg:pt-1.5' : ''"
    >
      <div class="flex flex-wrap mt-[1.15rem]">
        <div class="w-1/2 lg:w-1/4 p-1 pl-0 pt-0.5">
          <div class="border-b border-black pb-1">Client</div>
          <h1 class="pt-0.5">
            {{ project.title }}
          </h1>
        </div>

        <div class="w-1/2 lg:w-1/4 p-1 pt-0.5">
          <div class="border-b border-black pb-1">Project</div>
          <p class="lg:mb-0 lg:mb-0 pt-0.5">
            {{ project.description }}
          </p>
        </div>

        <div class="w-1/2 lg:w-1/4 px-0 lg:px-1 pb-1 pr-1 pt-0.5">
          <div class="border-b border-black pb-1">Date</div>
          <p class="pt-0.5">
            {{ project.date }}
          </p>
        </div>

        <div class="w-1/2 lg:w-1/4 p-1 pt-0.5 pr-0">
          <div class="border-b border-black pb-1">Team</div>
          <ul class="pt-0.5">
            <li v-for="team in project.team" :key="`team-${team.name}`">
              <a v-if="team.url" :href="team.url" target="_blank">{{
                team.name
              }}</a>
              <span v-if="!team.url">
                {{ team.name }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-wrap -mx-1">
        <div
          v-for="(image, index) in project.images"
          :key="`image-${index}`"
          class="
            w-1/4
            lg:w-[12.5%]
            p-1
            h-full
            transition
            animate-show
            images
            ease-in
            duration-300
          "
          ref="images"
        >
          <nuxt-img
            v-if="!image.isVideo"
            class="w-full object-cover max-h-[calc(30vh-16px)]"
            format="webp"
            placeholder
            quality="80"
            :src="`images/${project.index}/project/${image.slug}`"
            alt=""
            sizes="sm:50vw lg:50vw xl:25vw 2xl:25vw"
          />
          <video
            v-if="image.isVideo"
            ref="project_video"
            class="
              w-full
              object-cover
              max-h-[calc(30vh-16px)]
              pointer-events-none
            "
            autoplay
            muted
            playsinline
            loop
            @load="playVideo"
          >
            <source
              :src="`images/${project.index}/project/${image.slug}`"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
import projectsData from "/content/projects.json";
export default {
  data() {
    return {
      show: false,
      isProject: true,
      nextIndex: null,
      nextPageIndex: null,
      prevPageIndex: null,
      projects: projectsData,
      project: projectsData.filter(
        (project) => project.index === this.$route.params.slug
      )[0],
      indexActive: this.$route.params.slug,
      hoverNext: false,
      hoverPrev: false,
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: "overflow-hidden index-" + this.project.index,
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("mousemove", this.handleMouseMove);
    });
  },
  methods: {
    handleMouseMove(event) {
      if (this.hoverNext && this.$refs.next) {
        this.$refs.next.style.top = event.clientY + "px";
        this.$refs.next.style.left = event.clientX + "px";
      }
      if (this.hoverPrev && this.$refs.prev) {
        this.$refs.prev.style.top = event.clientY + "px";
        this.$refs.prev.style.left = event.clientX + "px";
      }
    },
    pagePrev() {
      if (parseInt(this.indexActive) > 1) {
        this.$router
          .push({
            path: `/projects/0${parseInt(this.indexActive) - 1}`,
            params: { slug: parseInt(this.indexActive) - 1 },
          })
         ;
      } else {
        this.$router
          .push({
            path: `/projects/08`,
            params: { slug: 8 },
          })
         ;
      }
    },
    pageNext() {
      if (parseInt(this.indexActive) <= 7) {
        this.$router
          .push({
            path: `/projects/0${parseInt(this.indexActive) + 1}`,
            params: { slug: parseInt(this.indexActive) + 1 },
          })
         ;
      } else {
        this.$router
          .push({
            path: `/projects/01`,
            params: { slug: 1 },
          })
         ;
      }
    },
    playVideo() {
      this.$refs.project_video.play();
    },
  },
};
</script>
