// 操作给定的二叉树，将其变换为源二叉树的镜像。
/* 
       源二叉树 
    	    8
    	   /  \
    	  6   10
    	 / \  / \
    	5  7 9 11
    	镜像二叉树
    	    8
    	   /  \
    	  10   6
    	 / \  / \
    	11 9 7  5
*/

/* 
    思路
    当前节点的左节点和右节点互换
    当前节点的左右节点重复此过程
*/

function Mirror(root) {
	if (root) {
		const temp = root.right;
		root.left = root.right;
		root.right = temp;
		Mirror(root.left);
		Mirror(root.right);
	}
}
