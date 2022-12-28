<template>
  <div
    class="fixed top-0 left-0 bottom-0 right-0 z-40 pointer-events-none page"
  >
    <ul
      class="flex flex-wrap h-[70vh]"
      :class="nextIndex == 1 ? 'lg:flex-row' : ''"
    >
      <li
        v-for="project in projects"
        :key="project.slug"
        class="w-1/2 lg:w-1/4 h-[calc(100vh-98px)] lg:h-1/2 number mb-2 px-1"
        :class="`number-${project.index} ${
          parseInt(project.index) == parseInt(indexActive) ||
          parseInt(project.index) == parseInt(indexActive) + 1
            ? ''
            : 'hidden lg:block'
        }`"
      >
        <NuxtLink
          v-if="page == 'project'"
          class="pointer-events-auto inline-block text-gray-300"
          :to="{
            name: 'projects-slug',
            params: { slug: project.index },
          }"
        >
          <span @click="projectChange">{{ project.index }}</span>
        </NuxtLink>

        <div
          v-if="page == 'home'"
          class="pointer-events-auto inline-block text-gray-300 cursor-pointer"
          :class="indexActive == project.index ? 'text-black' : 'text-gray-300'"
          @click="slideChange(project.index)"
        >
          <span>{{ project.index }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["projects", "page", "indexActive"],
  data() {
    return {
      nextIndex: null,
      numberIsHover: null,
    };
  },
  mounted() {
    if (parseInt(this.indexActive) == 8) {
      this.nextIndex = 1;
    }
  },
  methods: {
    projectChange() {
      this.$emit("project-change");
    },
    slideChange(index) {
      this.$emit("slide-change", index);
    },
  },
};
</script>
