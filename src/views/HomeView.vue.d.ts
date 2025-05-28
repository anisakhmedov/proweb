declare const _default: import("vue").DefineComponent<{}, {}, {
    carouselRef: null;
    isDown: boolean;
    startX: number;
    scrollLeft: number;
    selectedCategoryKey: null;
}, {
    courseStore(): any;
    categories(): any[];
    filteredCourses(): any;
}, {
    toggleCategory(key: any): void;
    startDrag(e: any): void;
    onDrag(e: any): void;
    stopDrag(): void;
    fetchData(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
