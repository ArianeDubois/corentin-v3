<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>
import projectsData from "/content/projects.json";
export default {
  data() {
    return {
      projects: projectsData,
    };
  },
};
</script>
