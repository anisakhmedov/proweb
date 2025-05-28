<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCourses } from "@/stores/courses"

export default {
  data() {
    return {
      carouselRef: null,
      isDown: false,
      startX: 0,
      scrollLeft: 0,
      selectedCategoryKey: null,
    }
  },
  beforeRouteLeave(to, from, next) {
    const courseStore = useCourses()
    courseStore.resetCourses()
    next()
  },

  computed: {
    courseStore() {
      return useCourses()
    },


    categories() {
      const catsMap = new Map()
      this.courseStore.courses.forEach(course => {
        course.categories.forEach(cat => {
          catsMap.set(cat.key, cat)
        })
      })
      return Array.from(catsMap.values())
    },

    filteredCourses() {
      if (!this.selectedCategoryKey) {
        return this.courseStore.courses
      }
      return this.courseStore.courses.filter(course =>
        course.categories.some(cat => cat.key === this.selectedCategoryKey)
      )
    }
  },

  methods: {
    toggleCategory(key) {
      if (this.selectedCategoryKey === key) {
        this.selectedCategoryKey = null
      } else {
        this.selectedCategoryKey = key
      }
    },

    startDrag(e) {
      if (!this.carouselRef) return
      this.isDown = true
      this.carouselRef.classList.add('dragging')
      this.startX = e.pageX - this.carouselRef.offsetLeft
      this.scrollLeft = this.carouselRef.scrollLeft
    },

    onDrag(e) {
      if (!this.isDown || !this.carouselRef) return
      e.preventDefault()
      const x = e.pageX - this.carouselRef.offsetLeft
      const walk = x - this.startX
      this.carouselRef.scrollLeft = this.scrollLeft - walk
    },

    stopDrag() {
      this.isDown = false
      if (this.carouselRef) {
        this.carouselRef.classList.remove('dragging')
      }
    },

    async fetchData() {
      if (this.courseStore.courses.length === 0) {
        await this.courseStore.fetchCourses()
      }
    }
  },

  mounted() {
    this.carouselRef = this.$refs.carouselRef

    if (this.carouselRef) {
      this.carouselRef.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
          e.preventDefault()
          this.carouselRef.scrollLeft += e.deltaY
        }
      }, { passive: false })

      this.carouselRef.addEventListener('mousedown', this.startDrag)
      this.carouselRef.addEventListener('mousemove', this.onDrag)
      this.carouselRef.addEventListener('mouseup', this.stopDrag)
      this.carouselRef.addEventListener('mouseleave', this.stopDrag)
    }

    this.fetchData()
  },

  unmounted() {
    if (!this.carouselRef) return
    this.carouselRef.removeEventListener('mousedown', this.startDrag)
    this.carouselRef.removeEventListener('mousemove', this.onDrag)
    this.carouselRef.removeEventListener('mouseup', this.stopDrag)
    this.carouselRef.removeEventListener('mouseleave', this.stopDrag)
  }
}
</script>

<template>
  <main id="HomeView">
    <div class="headTitle">Запуски</div>
    <div class="categories">
      <div class="name">Категории</div>
      <ul>
        <li v-for="cat in categories" :key="cat.key" :class="{ active: selectedCategoryKey === cat.key }"
          @click="toggleCategory(cat.key)" style="cursor: pointer;"
          :style="selectedCategoryKey === cat.key ? `background-color:${cat.color}` : 'background-color: #ededed'">
          {{ cat.name }}
        </li>
      </ul>
    </div>

    <div class="wrapper">
      <div v-if="courseStore.isLoading" class="loader-wrapper">
        <div class="custom-loader"></div>
      </div>
      <div v-else class="carousel" ref="carouselRef">
        <div class="item" v-for="l of filteredCourses" :key="l.id">
          <p class="titleCourse">
            {{ l.name }}
            <span :style="`background-color: ${l.categories[0].color}`">
              {{ l.categories[0].name }}
            </span>
          </p>
          <div class="block">
            <div class="top">
              <p class="start">Старт групп</p>
              <div class="allTime">
                <div class="dates">
                  <span>{{ l.start_date_formatted }}</span>
                  <span>{{ l.day_names }}</span>
                </div>
                <ul class="list">
                  <li v-for="les of l.groups" :key="les.id">{{ les.study_time }}</li>
                </ul>
              </div>
            </div>
            <div class="bottom">
              <p class="start">Открытые уроки</p>
              <div class="itemsDates" v-for="i of l.open_lessons" :key="i.id">
                <div class="dates">
                  <span>{{ i.date_formatted }}</span>
                  <span>{{ i.day_name }}</span>
                </div>
                <ul class="list">
                  <li v-for="t of i.times" :key="t">{{ t }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.categories ul {
  display: flex;
  gap: 10px;
  padding: 0;
  list-style: none;
}

.categories li {
  padding: 5px 10px;
  border-radius: 4px;
  user-select: none;
}

.categories li.active {
  color: white;
}
</style>
