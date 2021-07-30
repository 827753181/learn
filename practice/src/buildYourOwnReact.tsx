const REACT_TEXT_ELEMENT = "REACT_TEXT_ELEMENT";

//事件循环，因此需要衍生出一个可以记录下一个unit work的数据结构 ---> fiber
let nextUnitOfWork = null;

//rootunit（也可以理解为rootfiber的引用），用于commit阶段从上向下的遍历
let wipRoot = null;

const createTextElement = (text) => {
  return {
    type: REACT_TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
};

//数据渲染要实现   --- 1.当前的虚拟dom，2.渲染函数
var Didact = {
  createElement(tag, props = {}, ...children) {
    let propsChildren = children.flat();
    const element = {
      type: tag,
      props: {
        ...props,
        children: propsChildren.map((ele) =>
          typeof ele === "object" ? ele : createTextElement(ele)
        ),
      },
    };
    return element;
  },

  //createDom改为只完成单元工作，不管其他fiber
  createDom(fiber) {
    const dom =
      fiber.type === REACT_TEXT_ELEMENT
        ? document.createTextNode("")
        : document.createElement(fiber.type);
    const props = fiber.props || {};

    const isProperty = (key) => key !== "children";
    Object.keys(props)
      .filter(isProperty)
      .forEach((name) => {
        dom[name] = props[name];
      });

    return dom;
  },
  render(container, element) {
    wipRoot = {
      dom: container,
      props: {
        children: [element],
      },
    };
    nextUnitOfWork = wipRoot;
  },
};

//fiber
/* 
  there we will do three things for each fiber: 
  1.add the element to the DOM 添加元素到dom（渲染）
  2.create the fibers for the element’s children 创建children的fiber
  3.select the next unit of work 选中下一个工作单元
*/
class Fiber {
  child = null;
  sibling = null;
  parent = null;

  dom = null;
  type = null;
  props: {};
}

//commit的工作单元
function commitWork(fiber) {
  if (!fiber) return;
  const parent = fiber.parent.dom;
  parent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}

function performUnitOfWork(fiber: Fiber) {
  //单元任务，创建fiber各个节点，并将其链接构建出fiberTree
  /*
    1.add dom node
    2.create new fibers
    3.return next unit of work
  */
  if (fiber) {
    // 1.add dom node
    if (!fiber.dom) fiber.dom = Didact.createDom(fiber);

    // 每次渲染都添加，可能导致ui渲染不完全的页面被用户看到，因此，我们引入concurrent模式，when commit时触发renderall
    // if (fiber.parent) fiber.parent.dom.appendChild(fiber.dom);
    // 2.create new fibers
    let elements = fiber.props.children;
    let index = 0,
      prevSibing = null;
    while (index < elements.length) {
      let element = elements[index];
      const newFiber = {
        type: element.type,
        parent: fiber,
        props: element.props,
        dom: null,
        children: element.children,
      };
      if (index === 0) fiber.child = newFiber;
      else prevSibing.sibling = newFiber;
      prevSibing = newFiber;
      index++;
    }
    //3.return next unit of work
    if (fiber.child) {
      return fiber.child;
    }
    let nextFiber = fiber;
    while (nextFiber) {
      if (nextFiber.sibling) {
        return nextFiber.sibling;
      }
      nextFiber = nextFiber.parent;
    }
  }
}
function workLoop(deadLine) {
  let shouldYield = false;
  while (nextUnitOfWork != null && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadLine.timeRemaining() < 1;
  }

  //当没有其他任务时，触发渲染
  if (nextUnitOfWork == null && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function schedulerCallback() {
  requestIdleCallback(workLoop);
}
/** @jsx Didact.createElement */
const element = (
  <h1 title="foo">
    <div className="sss">hahahah</div>111<div>1123</div>

    <div>
      {new Array(1100).fill(1).map((ele, idx) => (
        <span>
          {new Array(100).fill(1).map((ele, idx) => (
            <div>{idx}</div>
          ))}
        </span>
      ))}
    </div>
  </h1>
);

// const element = React.createElement(
//   "h1",
//   {
//     title: "foo",
//   },
//   "Hello"
// );

// var element = {
//   // $$typeof: REACT_ELEMENT_TYPE,
//   // key: undefined,
//   // ref: undefined,
//   type: "h1",
//   props: {
//     title: "foo",
//     children: "Hello"
//   }
// };

// const element = <h1 title='foo'>Hello</h1>

var container = document.querySelector("#root");
Didact.render(container, element);
schedulerCallback();
