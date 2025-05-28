import { defineStore } from 'pinia'

export const useCourses = defineStore('courses', {
  state: () => ({
    courses: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    courseCount: (state) => state.courses.length,
  },

  actions: {
    async fetchCourses() {
      this.isLoading = true
      this.error = null

      const daysMap = {
        0: 'ВС',
        1: 'ПН',
        2: 'ВТ',
        3: 'СР',
        4: 'ЧТ',
        5: 'ПТ',
        6: 'СБ',
      }

      const formatDate = (dateStr) => {
        const months = [
          'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
          'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ]
        const date = new Date(dateStr)
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        return `${day} ${month} ${year}`
      }

      try {
        const response = await fetch('https://main.proweb.uz/api/v1/launches/external/course/research/')
        if (!response.ok) {
          throw new Error('err')
        }

        const data = await response.json()

        this.courses = data.results
          .map(course => {
            const sortedGroups = [...course.groups]
              .sort((a, b) => {
                const dateA = new Date(`${a.start_date}T${a.study_time}`)
                const dateB = new Date(`${b.start_date}T${b.study_time}`)
                return dateA - dateB
              })
              .map(group => ({
                ...group,
                study_time: group.study_time.slice(0, 5),
              }))

            const firstGroup = sortedGroups[0]
            const dayNames = firstGroup?.days?.map(day => daysMap[day % 7] || '') || []
            const startDateFormatted = firstGroup?.start_date ? formatDate(firstGroup.start_date) : ''

            const sortedLessons = [...course.open_lessons]
              .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time}`)
                const dateB = new Date(`${b.date}T${b.time}`)
                return dateB - dateA || a.time.localeCompare(b.time)
              })

            const groupedLessonsMap = new Map()

            for (const lesson of sortedLessons) {
              const dateKey = lesson.date
              const timeFormatted = lesson.time.slice(0, 5)
              const dayName = daysMap[new Date(lesson.date).getDay()]

              if (!groupedLessonsMap.has(dateKey)) {
                groupedLessonsMap.set(dateKey, {
                  id: lesson.id,
                  format: lesson.format,
                  practical: lesson.practical,
                  date: dateKey,
                  date_formatted: formatDate(dateKey),
                  day_name: dayName,
                  times: [timeFormatted],
                })
              } else {
                groupedLessonsMap.get(dateKey).times.push(timeFormatted)
              }
            }

            const groupedLessons = Array.from(groupedLessonsMap.values())
              .sort((a, b) => new Date(b.date) - new Date(a.date))

            return {
              ...course,
              groups: sortedGroups,
              open_lessons: groupedLessons,
              day_names: dayNames.join(', '),
              start_date_formatted: startDateFormatted,
            }
          })
          .filter(course => course.groups.length > 0 && course.open_lessons.length > 0)

      } catch (err) {
        this.error = err.message || 'err'
      } finally {
        this.isLoading = false
      }
    },
    resetCourses() {
      this.courses = []
      this.isLoading = false
      this.error = null
    }
  },
})
