export default {
  mounted() {},
  updated(el, binding, vnode, prevVnode) {
    if (!binding.value) return;
    if (!el.children.length) return;
    for (let i of el.children) {
      i.setAttribute("draggable", true);
    }
    let sourceNode;
    el.addEventListener("dragstart", (e) => {
      sourceNode = e.target;
      e.target.classList.add("dragStyle");
    });
    el.addEventListener("dragenter", (e) => {
      e.preventDefault();
      const targetNode = e.target.parentNode;
      if (targetNode === el || targetNode === sourceNode) {
        return false;
      }
      const childrens = Array.from(el.children);
      const sourceNodeIndex = childrens.indexOf(sourceNode);
      const targetNodeIndex = childrens.indexOf(targetNode);
      if (sourceNodeIndex > targetNodeIndex) {
        el.insertBefore(sourceNode, targetNode);
      } else {
        el.insertBefore(sourceNode, targetNode.nextElementSibling);
      }
    });
    el.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragStyle");
    });
  },
};
