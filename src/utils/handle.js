import elementResizeDector from "element-resize-detector";

let resizeId = 0,
    handles = {},
    dector = elementResizeDector();
const resize = {
    bind(el, binding) {
        const id = resizeId++;
        document.body.setAttribute("data-event-id", id);
        handles[id] = function (el) {
            binding.value({
                el: el,
                width: el.offsetWidth,
                height: el.offsetHeight,
            });
        };
        dector.listenTo(el, handles[id]);
    },
    unbind(el) {
        const id = document.body.getAttribute("data-event-id");
        dector.removeListener(el, handles[id]);
    },
};

export { resize };
