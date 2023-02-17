import { customRef } from 'vue';

export default function (value) {
    /**
     * @track 进行依赖收集;
     * @trigger 触发更新
     */
    return customRef((track, trigger) => {
        let timer= null;
        return {
            get() {
                track();
                return value;
            },
            set(newVal) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    value = newVal;
                    trigger()
                },500)
            }
        }
    })
}