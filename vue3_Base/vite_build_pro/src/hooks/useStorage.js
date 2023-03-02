import {ref, watchEffect} from "vue";

export default function (name, value) {
    let data = ref(value);

    if (value) {
        window.localStorage.setItem(name, JSON.stringify(value))
    } else {
        data = JSON.parse(window.localStorage.getItem(name))
    }

    watchEffect(data,newVal => {
        window.localStorage.setItem(name, JSON.stringify(newVal))
    })

    return data
}