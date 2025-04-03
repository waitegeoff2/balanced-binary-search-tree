class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
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

    //TRY TO WRITE THIS ONE YOUR OWN
    //sorted array
    //find mid point, that's the root
    //then, find find numbers to left of that, find midpoint of that, make it left

    buildTree(array) {
        var sortedArray = this.sortArray(array);
        console.log(sortedArray)

        let n = sortedArray.length;

        if (n === 0) return null;

        //find midpoint
        let mid = Math.floor((n - 1) / 2);
        //new root with mid of sorted array, put in data
        let root = new Node(sortedArray[mid]);

        let queue = [ {node: root, range: [0, n - 1] } ]
        let frontIndex = 0;

        while(frontIndex < queue.length) {
            //takes the first node we put in there
            let front = queue[frontIndex]; 
            //current node
            let current = front.node; // the root node right now
            let [s, e] = front.range; //setting start and end values to the CURRENT RANGE
            let index = s + Math.floor((e - s) / 2); //midpoint of the ENTIRE range currently, when it is on right or left side, will find midpoint of that instead

            //if start is less than index(midpoint of array OR current side), find midpoint there
            if(s < index) {
                let midLeft = s + Math.floor((index - 1 - s) / 2); //midpoint of left side of midpoint
                let leftNode = new Node(sortedArray[midLeft]);
                current.left = leftNode;
                queue.push({node: leftNode, range: [s, index - 1]});
            }

            if(e > index) {
                let midRight = index + 1 + Math.floor((e - index - 1) / 2);
                let rightNode = new Node(sortedArray[midRight]);
                current.right = rightNode;
                queue.push({node: rightNode, range: [index + 1, e]})
            }
            console.log(queue)
            frontIndex++
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

    insert(value) {
        
    }

     
}

//add the root of tree in here to print out tree in console
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

