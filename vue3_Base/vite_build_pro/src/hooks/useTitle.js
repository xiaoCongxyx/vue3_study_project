import { ref,watch } from "vue";

export default function (title = 'vue3学习之旅') {
    let titleRef = ref(title)

    watch(titleRef, newVal => {
        document.title = newVal
    },{
        immediate: true
    })

    return titleRef;
}