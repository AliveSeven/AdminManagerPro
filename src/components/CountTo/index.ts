import countTo from './countTo.vue';
export default countTo;
if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.component('count-to', countTo);
}
