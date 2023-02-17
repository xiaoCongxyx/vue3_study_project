import  { ref } from "vue";

export default function () {
    let mouseX = ref(0);
    let mouseY = ref(0);

    window.addEventListener('mousemove', e => {
        mouseX.value = e.pageX;
        mouseY.value = e.pageY;
    })

    return {
        mouseX,
        mouseY
    }

}