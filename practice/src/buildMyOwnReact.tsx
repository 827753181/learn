const REACT_TEXT_ELEMENT = "REACT_TEXT_ELEMENT";
const createTextElement = (text) => ({
  type: REACT_TEXT_ELEMENT,
  props: { children: [], nodeValue: text },
});

type Fiber = {
  type: string;
  props: {
    children: Fiber[];
    [key: string]: any;
  };
  child?: Fiber;
  parent?: Fiber;
  sibing?: Fiber;
  dom?: any;
};
// createElementFiber
const createElement = (tag, props = {}, ...childrens) => {
  const children = childrens.flat();
  let fiber = {
    type: tag,
    props: {
      ...props,
      children: children.map((ele) =>
        typeof ele === "object" ? ele : createTextElement(ele)
      ),
    },
  };
  return fiber;
};

// createDom
const createDom = (fiber) => {
  let dom =
    fiber.type === REACT_TEXT_ELEMENT
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  for (let key in fiber.props) {
    if (key !== "children") dom[key] = fiber.props[key];
  }
  return dom;
};
//render
const render = (container, element: Fiber) => {
  const reconcileChildren = (fiber, container) => {
    if (!fiber.dom) fiber.dom = createDom(fiber);
    fiber.props.children.forEach((ele) => reconcileChildren(ele, fiber.dom));
    container.appendChild(fiber.dom);
  };
  reconcileChildren(element, container);
};
// TODO: 添加workLoop，performUnitOfWork，reconcileChildren更新fiber区分update，create，delete ---> 添加commit阶段 ---> 
const FlyBoy = {
  render,
  createElement,
};

// const dom = FlyBoy.createElement("div",{className:222},111)
/** @jsx FlyBoy.createElement */
const dom = (
  <div className="222">
    <div className="22213">24124</div>333
  </div>
);
FlyBoy.render(document.querySelector("#root"), dom);
