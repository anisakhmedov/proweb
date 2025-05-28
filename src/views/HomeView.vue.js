import { ref, onMounted, onUnmounted } from 'vue';
import { useCourses } from "@/stores/courses";
export default (await import('vue')).defineComponent({
    data() {
        return {
            carouselRef: null,
            isDown: false,
            startX: 0,
            scrollLeft: 0,
            selectedCategoryKey: null,
        };
    },
    beforeRouteLeave(to, from, next) {
        const courseStore = useCourses();
        courseStore.resetCourses();
        next();
    },
    computed: {
        courseStore() {
            return useCourses();
        },
        categories() {
            const catsMap = new Map();
            this.courseStore.courses.forEach(course => {
                course.categories.forEach(cat => {
                    catsMap.set(cat.key, cat);
                });
            });
            return Array.from(catsMap.values());
        },
        filteredCourses() {
            if (!this.selectedCategoryKey) {
                return this.courseStore.courses;
            }
            return this.courseStore.courses.filter(course => course.categories.some(cat => cat.key === this.selectedCategoryKey));
        }
    },
    methods: {
        toggleCategory(key) {
            if (this.selectedCategoryKey === key) {
                this.selectedCategoryKey = null;
            }
            else {
                this.selectedCategoryKey = key;
            }
        },
        startDrag(e) {
            if (!this.carouselRef)
                return;
            this.isDown = true;
            this.carouselRef.classList.add('dragging');
            this.startX = e.pageX - this.carouselRef.offsetLeft;
            this.scrollLeft = this.carouselRef.scrollLeft;
        },
        onDrag(e) {
            if (!this.isDown || !this.carouselRef)
                return;
            e.preventDefault();
            const x = e.pageX - this.carouselRef.offsetLeft;
            const walk = x - this.startX;
            this.carouselRef.scrollLeft = this.scrollLeft - walk;
        },
        stopDrag() {
            this.isDown = false;
            if (this.carouselRef) {
                this.carouselRef.classList.remove('dragging');
            }
        },
        async fetchData() {
            if (this.courseStore.courses.length === 0) {
                await this.courseStore.fetchCourses();
            }
        }
    },
    mounted() {
        this.carouselRef = this.$refs.carouselRef;
        if (this.carouselRef) {
            this.carouselRef.addEventListener('wheel', (e) => {
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.carouselRef.scrollLeft += e.deltaY;
                }
            }, { passive: false });
            this.carouselRef.addEventListener('mousedown', this.startDrag);
            this.carouselRef.addEventListener('mousemove', this.onDrag);
            this.carouselRef.addEventListener('mouseup', this.stopDrag);
            this.carouselRef.addEventListener('mouseleave', this.stopDrag);
        }
        this.fetchData();
    },
    unmounted() {
        if (!this.carouselRef)
            return;
        this.carouselRef.removeEventListener('mousedown', this.startDrag);
        this.carouselRef.removeEventListener('mousemove', this.onDrag);
        this.carouselRef.removeEventListener('mouseup', this.stopDrag);
        this.carouselRef.removeEventListener('mouseleave', this.stopDrag);
    }
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['categories']} */ ;
/** @type {__VLS_StyleScopedClasses['categories']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    id: "HomeView",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "headTitle" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "categories" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "name" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (const [cat] of __VLS_getVForSourceType((__VLS_ctx.categories))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.toggleCategory(cat.key);
            } },
        key: (cat.key),
        ...{ class: ({ active: __VLS_ctx.selectedCategoryKey === cat.key }) },
        ...{ style: {} },
        ...{ style: (__VLS_ctx.selectedCategoryKey === cat.key ? `background-color:${cat.color}` : 'background-color: #ededed') },
    });
    (cat.name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wrapper" },
});
if (__VLS_ctx.courseStore.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loader-wrapper" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "custom-loader" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "carousel" },
        ref: "carouselRef",
    });
    /** @type {typeof __VLS_ctx.carouselRef} */ ;
    for (const [l] of __VLS_getVForSourceType((__VLS_ctx.filteredCourses))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "item" },
            key: (l.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "titleCourse" },
        });
        (l.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ style: (`background-color: ${l.categories[0].color}`) },
        });
        (l.categories[0].name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "block" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "top" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "start" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "allTime" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "dates" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (l.start_date_formatted);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (l.day_names);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
            ...{ class: "list" },
        });
        for (const [les] of __VLS_getVForSourceType((l.groups))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                key: (les.id),
            });
            (les.study_time);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "bottom" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "start" },
        });
        for (const [i] of __VLS_getVForSourceType((l.open_lessons))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "itemsDates" },
                key: (i.id),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "dates" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (i.date_formatted);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (i.day_name);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
                ...{ class: "list" },
            });
            for (const [t] of __VLS_getVForSourceType((i.times))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                    key: (t),
                });
                (t);
            }
        }
    }
}
/** @type {__VLS_StyleScopedClasses['headTitle']} */ ;
/** @type {__VLS_StyleScopedClasses['categories']} */ ;
/** @type {__VLS_StyleScopedClasses['name']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['loader-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-loader']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['titleCourse']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['top']} */ ;
/** @type {__VLS_StyleScopedClasses['start']} */ ;
/** @type {__VLS_StyleScopedClasses['allTime']} */ ;
/** @type {__VLS_StyleScopedClasses['dates']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['start']} */ ;
/** @type {__VLS_StyleScopedClasses['itemsDates']} */ ;
/** @type {__VLS_StyleScopedClasses['dates']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
var __VLS_dollars;
let __VLS_self;
