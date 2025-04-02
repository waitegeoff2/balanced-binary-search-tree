class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTreeRecursive(array);
    }

    sortArray(arr) {
        function compareNumeric(a, b) {
            if (a > b) return 1;
            if (a == b) return 0;
            if (a < b) return -1;
          }
        
        let orderedArray = arr.sort(compareNumeric);
        let orderedArrayFinal = [...new Set(orderedArray)];
        return orderedArrayFinal;
    }

    //using a queue to do it (non-recursive method)
    buildTree(array){
        var sortedArray = this.sortArray(array);
        console.log(sortedArray);

        let n = sortedArray.length;

        //if array is empty, return null
        if (n===0) { 
            return null; 
        }

        //finds midpoint of array and makes it root
        let mid = Math.floor((n-1) / 2);
        //root node is middle value of the array
        let root = new Node(sortedArray[mid]);

        //queue with root node and two variables, start and end of array
        let queue = [ {node: root, range: [ 0, n-1 ]} ]
        console.log(queue);
        //use to loop array until queue is empty
        let frontIndex = 0;

        while(frontIndex < queue.length) {
            let front = queue[frontIndex];
            let current = front.node;
            console.log(current)
            let [s,e] = front.range;
            let index = s + Math.floor((e - s) / 2);

            //if left subtree exists
            if (s < index) {
                let midLeft
                    = s + Math.floor((index - 1 - s) / 2);
                let left = new Node(sortedArray[midLeft]);
                current.left = left;
                queue.push({node : left, range : [ s, index - 1 ]});
            }
    
            // If right subtree exists
            if (e > index) {
                let midRight
                    = index + 1
                      + Math.floor((e - index - 1) / 2);
                let right = new Node(sortedArray[midRight]);
                current.right = right;
                queue.push(
                    {node : right, range : [ index + 1, e ]});
            }
    
            frontIndex++;
        }
        return root;

    }
    
    buildTreeRecursive(array) {
        var sortedArray = this.sortArray(array);

        //base case, array has a length of 0
        if(sortedArray.length === 0) return null;

        //set middle element of array as root
        const mid = Math.floor(sortedArray.length / 2);
        const root = new Node(sortedArray[mid]);

        //recursively get middle element of left half (slicing from start to middle of array), make it the child.
        root.left = this.buildTreeRecursive(sortedArray.slice(0, mid));
        root.right = this.buildTreeRecursive(sortedArray.slice(mid + 1)); 
        return root; 
    } 

     
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(testTree.root)

