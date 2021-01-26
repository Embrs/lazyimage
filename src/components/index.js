import LazyImage from './LazyImage.vue';

const components = [LazyImage]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
export default install