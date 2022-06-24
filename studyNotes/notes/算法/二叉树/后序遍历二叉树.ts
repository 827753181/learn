// 递归实现
function postorderTraversalLoop(root, array = []) {
	if (root) {
		postorderTraversalLoop(root.left, array);
		postorderTraversalLoop(root.right, array);
		array.push(root.val);
	}
	return array;
}

// 非递归实现

// 取根节点为目标节点，开始遍历
// 1.左孩子入栈 -> 直至左孩子为空的节点
// 2.节点出栈 -> 访问该节点
// 3.以右孩子为目标节点，再依次执行1、2、3
function postorderTraversal(root) {
	const result = [];
	const stack = [];
	let current = root;
	let last = null;
	while (current || stack.length > 0) {
		// 遍历左节点
		while (current) {
			stack.push(current);
			current = current.left;
		}

		// 不pop，先看下最后一个左节点的情况
		current = stack[stack.length - 1];

		// 无右节点（表明是叶子结点），或者右节点是最后一个被塞进去的节点
		if (!current.right || current.right == last) {
			current = stack.pop();
			result.push(current.val);
			last = current;
			current = null; // 继续弹栈
		} else {
            // 有未遍历右节点，则向下遍历右节点入栈
			current = current.right;
		}
	}
	return result;
}
