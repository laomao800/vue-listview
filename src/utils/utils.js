import Vue from 'vue'

export function isVNode(node) {
  const vm = new Vue()
  const emptyVNode = vm.$createElement()
  return node instanceof emptyVNode.constructor
}
