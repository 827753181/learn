const REACT_TEXT_ELEMENT = "REACT_TEXT_ELEMENT";

//事件循环，因此需要衍生出一个可以记录下一个unit work的数据结构 ---> fiber
let nextUnitOfWork = null;

//rootunit（也可以理解为rootfiber的引用），用于commit阶段从上向下的遍历
let wipRoot = null;

//添加currentRoot，分离当前tree和workInProgressTree，用于update和delete
let currentRoot = null;

//要删除的元素列表
let deletions = null;

//hook相关全局变量，用于定位
let wipFiber = null,
  hookIndex = 0;

const createTextElement = (text) => {
  return {
    type: REACT_TEXT_ELEMENT,
    props: {
      nodeValue: text != null && text !== false ? text : undefined,
      children: [],
    },
  };
};
const createElement = (tag, props = {}, ...children) => {
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
};
const createDom = (fiber) => {
  const dom =
    fiber.type === REACT_TEXT_ELEMENT
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  updateDom(dom, {}, fiber.props);
  return dom;
};
const render = (container, element) => {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
};
function useState(initialState) {
  let oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  let hook = {
    state: oldHook ? oldHook.state : initialState,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    console.log(hook.state);
    hook.state = action(hook.state);
  });
  const setState = (action) => {
    if (typeof action === "function") hook.queue.push(action);
    else hook.queue.push((val) => action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };

    nextUnitOfWork = wipRoot;
    deletions = [];
  };
  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}
//数据渲染要实现   --- 1.当前的虚拟dom，2.渲染函数
var Didact = {
  createElement,

  //createDom改为只完成单元工作，不管其他fiber
  createDom,

  render,
  useState,
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
  effectTag = null;

  dom = null;
  type = null;
  props: {};
}

const isEvent = (key: string) => key.startsWith("on");
const isProperty = (key) => key !== "children" && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isDelete = (prev, next) => (key) => !(key in next);
//更新Dom的模块
const updateDom = (dom, prevProps, nextProps) => {
  //remove old events listeners or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  //remove old props
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isDelete(prevProps, nextProps))
    .forEach((key) => delete dom[key]);
  //update or add props
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((key) => (dom[key] = nextProps[key]));

  //update or add old events
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
};

function commitDeletion(fiber, parentDom) {
  if (fiber.dom) parentDom.removeChild(fiber.dom);
  else commitDeletion(fiber.child, parentDom);
}
//commit的工作单元
function commitWork(fiber) {
  if (!fiber) return;
  let hasDomParentFiber = fiber.parent;
  if (!hasDomParentFiber.dom) hasDomParentFiber = hasDomParentFiber.parent;
  const parentDom = hasDomParentFiber.dom;
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null)
    parentDom.appendChild(fiber.dom);
  else if (fiber.effectTag === "UPDATE")
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  else if (fiber.effectTag === "DELETION") commitDeletion(fiber, parentDom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const children = [fiber.type(fiber.props)];

  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber) {
  // 1.add dom node
  if (!fiber.dom) fiber.dom = Didact.createDom(fiber);

  // 每次渲染都添加，可能导致ui渲染不完全的页面被用户看到，因此，我们引入concurrent模式，when commit时触发renderall
  // if (fiber.parent) fiber.parent.dom.appendChild(fiber.dom);
  // 2.create new fibers
  let elements = fiber.props.children;
  reconcileChildren(fiber, elements);
}

function performUnitOfWork(fiber: Fiber) {
  //单元任务，创建fiber各个节点，并将其链接构建出fiberTree
  /*
    1.add dom node  -- updateXXX
    2.create new fibers --- reconcileChildren in updateXXX
    3.return next unit of work
  */
  if (fiber) {
    if (fiber.type instanceof Function) updateFunctionComponent(fiber);
    else updateHostComponent(fiber);

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
// 根据旧有fiberChildren 创建新fiberChildren
function reconcileChildren(wipFiber, elements) {
  let index = 0,
    prevSibing = null;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  while (index < elements.length || oldFiber != null) {
    let element = elements[index];

    let newFiber = null;

    //  compare oldFiber to element
    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      //  update the node
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (element && !sameType) {
      //  add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !sameType) {
      //  delete the oldFiber's node
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibing.sibling = newFiber;
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    prevSibing = newFiber;
    index++;
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
const FunctionComp = (props) => {
  const [a, setA] = useState(111);
  let dom = (
    <div className="FunctionComp">
      {a > 111 && "testAdd"}
      <span
        onClick={() => {
          setA((old) => {
            return old + 2;
          });
        }}
      >
        {a}
      </span>
      {a === 111 && "testDel"}
    </div>
  );
  return dom;
};
/** @jsx Didact.createElement */
const element = (
  <h1 title="foo">
    <FunctionComp test={2}></FunctionComp>
    <div onClick={() => alert(2)} className="sss">
      hahahah
    </div>
    111<div>1123</div>
    <div>
      {/* {new Array(1100).fill(1).map((ele, idx) => (
        <span>
          {new Array(100).fill(1).map((ele, idx) => (
            <div>{idx}</div>
          ))}
        </span>
      ))} */}
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
