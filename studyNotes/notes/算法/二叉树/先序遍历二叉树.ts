
// 递归实现
function preorderTraversalLoop(root, array = []) {
	if (root) {
		array.push(root.val);
		preorderTraversalLoop(root.left, array);
		preorderTraversalLoop(root.right, array);
	}
	return array;
}

// 非递归实现
// 取根节点为目标节点，开始遍历
// 1.访问目标节点
// 2.左孩子入栈 -> 直至左孩子为空的节点
// 3.节点出栈，以右孩子为目标节点，再依次执行1、2、3
function preorderTraversal(root) {
	const result = [];
	const stack = [];
	let current = root;

	while (current || stack.length > 0) {
		// 遍历左节点
		while (current) {
			stack.push(current);
            result.push(current.val)
			current = current.left;
		}
		current = stack.pop();

		// 遍历右节点
		current = current.right;
	}
	return result
}
