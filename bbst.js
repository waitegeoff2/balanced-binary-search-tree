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
        const insertedNode = new Node(value);

        //let parent = null;
        let current = this.root;
        console.log(current.data)

        if(current === null) 
            return new Node(value);

        while(current != null) {

            if(value < current.data){
              if(current.left === null) {
                current.left = insertedNode;
                break;
              } else {
                current = current.left;
              } 
            } else if(value > current.data) {
                if(current.right === null) {
                    current.right = insertedNode;
                    break;
                } else {
                    current = current.right;
                }
            }                           

        }

        //Recursion
        // let node = this.root;

        // if(value < node.data){
        //     if(node.left === null){
        //         node.left = new Node(value);
        //         return;
        //     }
        //     else{
        //         this.insert(value,node.left);
        //     }
        // }
        // else{
        //     if(node.right === null){
        //         node.right = new Node(value);
        //         return;
        //     }
        //     else{
        //         this.insert(value,node.right);
        //     }
        // }
    }

    delete(value) {
        let current = this.root;
        console.log(current.data)
        let previous = null;

        //this finds if the value is in the tree at all
        //ends when current is null OR current equals value (it just skips over the function with the current value)
        //prev points to parent of key to be deleted so we can keep track
        while (current !== null && current.data !== value) {
            previous = current;
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        // if it came out of the function with current as null, return original function
        if(current === null) {
            return this.root;
        }

        //if it came out of function with a different node, delete that node and adjust

        //check if the node to be deleted has AT LEAST one child
        if (current.left === null || current.right === null) {
            //new current the value we will be putting into tree equal to the side of the tree WITH the child
            //new current is current.right if current.left is empty, otherwise left (taking the below node and PULLING IT UP)
            let newCurrent = (current.left === null) ? current.right : current.left;
    
            // Check if the node to be deleted is the root.
            if (previous === null) {
                return newCurrent;
            }
    
            // Check if the node to be deleted is "previous" L or R child, and then subbing in newCurrent INTO THE TREE there
            if (current === previous.left) {
                previous.left = newCurrent;
            } else {
                previous.right = newCurrent;
            }
        //ELSE if the node to be deleted has two children - UPDATE THIS
        } else {
            let p = null;
            let temp = current.right;
            while (temp.left !== null) {
                p = temp;
                temp = temp.left;
            }
    
            if (p !== null) {
                p.left = temp.right;
            } else {
                current.right = temp.right;
            }
    
            current.key = temp.key;
        }
        
        return this.root;
    }

    find(value) {
        let current = this.root;
        console.log(current.data)

        while (current !== null && current.data !== value) {
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        console.log(current)

        if(current === null) {
            console.log("not in tree")
        } else {
            return current;
        }
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
testTree.insert(12);
testTree.insert(250);
testTree.delete(587);
testTree.find(6345);
prettyPrint(testTree.root)

