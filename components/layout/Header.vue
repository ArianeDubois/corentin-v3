<template>
  <div class="h-0">
    <div
      class="fixed bottom-0 left-0 right-0 h-[6px] w-full bg-white z-[60]"
    ></div>
    <div
      ref="header_menu"
      class="
        fixed
        bottom-0
        top-0
        lg:top-auto
        w-full
        transition-transform
        duration-100
        ease-in
        -mx-[7px]
        p-[7px]
      "
      :class="isOpen ? 'z-50' : 'lg:translate-y-[calc(100%-27px)]'"
    >
      <div
        class="
          flex
          bg-white
          lg:static
          fixed
          bottom-0
          left-0
          right-0
          p-[7px]
          lg:p-0
          z-50
        "
      >
        <div class="w-1/2 flex-1 pr-1">
          <NuxtLink to="/">
            <div>
              <h1
                class="
                  border-transparent
                  lg:border-b lg:border-black
                  pb-1
                  pr-4
                  lg:pr-0
                  max-w-[115px]
                  lg:max-w-full
                "
              >
                Corentin Corneau, Selected works

                <span class="lg:hidden flex p-0 m-0">
                  <a href="mailto:info@corentincorneau.com">Email,</a>
                  <a
                    href="https://www.instagram.com/corentin.corneau/?hl=en"
                    target="_blank"
                    > Instagram</a
                  >
                </span>
              </h1>
            </div>
          </NuxtLink>
        </div>

        <div class="flex flex-wrap lg:flex-nowrap lg:w-1/2 flex-1">
          <div class="w-full lg:w-1/2 pr-1">
            <div
              class="
                flex
                items-end
                border-transparent
                w-full
                lg:border-b lg:border-black lg:pb-1 lg:ml-1
              "
              @click="toggllePage"
            >
              <NuxtLink
                class="pb-4 lg:pb-0"
                :to="{
                  name: 'projects-slug',
                  params: { slug: indexActive },
                }"
                v-if="!isProject"
              >
                Index
              </NuxtLink>

              <NuxtLink class="pb-4 lg:pb-0" to="/" v-if="isProject">
                Image
              </NuxtLink>
            </div>
          </div>
          <div
            @click="togglleMenu"
            class="
              -mb-2
              lg:mb-0 lg:pb-0
              w-full
              lg:w-1/2
              cursor-pointer
              border-transparent
              lg:border-b lg:border-black lg:ml-2
            "
          >
            About
          </div>
        </div>
      </div>

      <div
        class="
          lg:flex lg:flex-wrap
          -ml-4
          z-50
          lg:ml-0
          -translate-x-full
          bg-white
          h-[calc(100vh-40px)]
          lg:translate-x-0 lg:h-auto
          transition-transform
        "
        ref="menu_mobile"
      >
        <div class="w-full lg:w-1/2 flex lg:pt-0">
          <div class="w-1/2 pt-0.5">
            Art direction, design and motion design
          </div>

          <div class="w-1/2 pt-0.5 pb-2 lg:ml-2">
            {{ about.description }}
            <span class="pt-4 lg:pt-0">
              IG: <a
                href="https://www.instagram.com/corentin.corneau/?hl=en"
                target="_blank"
                >@corentincorneau</a
              >,
              <a href="mailto:info@corentincorneau.com"
                >Mail: info@corentincorneau.com</a
              >
            </span>
          </div>
        </div>

        <div
          class="
            w-full
            lg:w-1/2
            flex flex-wrap
            border-t border-black
            lg:border-none
            mt-16
            lg:mt-0
          "
        >
          <div class="w-full lg:w-1/2 flex">
            <div class="w-1/2 pt-0.5 lg:ml-1.5">Clients</div>
            <div class="w-1/2 pt-0.5">
            {{ about.clients }}
            </div>
          </div>

          <div
            class="
              w-full
              lg:w-1/2
              flex
              border-t border-black
              lg:border-none
              mt-16
              lg:mt-0
            "
          >
            <div class="w-full lg:w-1/2 pt-0.5 lg:ml-1">Credits</div>
            <div class="w-full lg:w-1/2 pt-0.5">
      {{about.credits }} <br />New york time:

              {{
                new Date()
                  .toLocaleString("en-US", { timeZone: "America/New_York" })
                  .split(",")[1]
              }}
              <br />Paris time:

              {{
                new Date()
                  .toLocaleString("en-US", { timeZone: "Europe/Paris" })
                  .split(",")[1]
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aboutData from "/content/about.json";

export default {
  props: ["isProject", "indexActive"],
  data() {
    return {
      about: aboutData,
      isOpen: false,
    };
  },
  methods: {
    toggllePage() {},
    togglleMenu() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        if (window.matchMedia("(min-width: 1024px)").matches) {
          this.$refs.header_menu.classList.remove(
            "lg:translate-y-[calc(100%-27px)]"
          );
        } else {
          this.$refs.menu_mobile.classList.remove("-translate-x-full", "-ml-4");
        }
        this.$refs.header_menu.classList.add("translate-y-0");
      }
      if (!this.isOpen) {
        if (window.matchMedia("(min-width: 1024px)").matches) {
          this.$refs.header_menu.classList.add(
            "lg:translate-y-[calc(100%-27px)]"
          );

          console.log(this.$refs.header_menu);
        } else {
          this.$refs.menu_mobile.classList.add("-translate-x-full", "-ml-4");
        }
        this.$refs.header_menu.classList.remove("translate-y-0");
      }
    },
  },
};
</script>
