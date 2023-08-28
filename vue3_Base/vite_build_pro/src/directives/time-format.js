import dayjs from "dayjs";

export default function (app) {
    let formatString = 'YYYY-MM-DD HH:MM:ss'
    app.directive('time-format', {
        created(el, binding) {
            if (binding.value) {
                formatString = binding.value
            }
        },
        mounted(el, binding) {
            let timeStamp = el.textContent
            if(timeStamp.length === 10) {
                timeStamp *= 1000;
            }
            timeStamp = parseInt(timeStamp)

            el.textContent = dayjs(timeStamp).format(formatString)
        },
    })
}