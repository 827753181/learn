const REACT_TEXT_ELEMENT = "REACT_TEXT_ELEMENT";

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
  render(container, element) {
    const dom =
      element.type === REACT_TEXT_ELEMENT
        ? document.createTextNode("")
        : document.createElement(element.type);
    const props = element.props || {};

    const isProperty = (key) => key !== "children";
    Object.keys(element.props)
      .filter(isProperty)
      .forEach((name) => {
        dom[name] = element.props[name];
      });
    props.children.map((ele) => Didact.render(dom, ele));

    container.appendChild(dom);
  },
};

//事件循环，因此需要衍生出一个可以记录下一个unit work的数据结构 ---> fiber
let nextUnitOfWork = null;

function performUnitOfWork(nextUnitOfWork) {
  // todo perform
  return null;
}
function workLoop(deadLine) {
  let shouldYield = false;
  while (nextUnitOfWork != null && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadLine.timeRemainin() < 1;
  }

  requestIdleCallback(workLoop);
}

//fiber
/* 
  there we will do three things for each fiber:
  1.add the element to the DOM 添加元素到dom（渲染）
  2.create the fibers for the element’s children 创建children的fiber
  3.select the next unit of work 选中下一个工作单元
*/
class fiber {
  children = null;
  sibling = null;
  parent = null;
}

function schedulerCallback() {
  requestIdleCallback(workLoop);
}

/** @jsx Didact.createElement */
const element = (
  <h1 title="foo">
    <div className="sss">hahahah</div>111<div>1123</div>
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
