
// 递归实现
function inorderTraversalLoop(root, array = []) {
	if (root) {
		inorderTraversalLoop(root.left, array);
		array.push(root.val);
		inorderTraversalLoop(root.right, array);
	}
	return array;
}

// 非递归实现

// 取根节点为目标节点，开始遍历
// 1.左孩子入栈 -> 直至左孩子为空的节点
// 2.节点出栈 -> 访问该节点
// 3.以右孩子为目标节点，再依次执行1、2、3
function inorderTraversal(root) {
	const result = [];
	const stack = [];
	let current = root;

	while (current || stack.length > 0) {
		// 遍历左节点
		while (current) {
			stack.push(current);
			current = current.left;
		}
		current = stack.pop();
		// 先消费左节点，消费完左节点后这里消费中节点，最后消费右节点
		result.push(current);

		// 遍历右节点
		current = current.right;
	}
	return result
}
