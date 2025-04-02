class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(root) {
        this.root = root;
        this.list = [];
    }

    sortArray(array) {
        function compareNumeric(a, b) {
            if (a > b) return 1;
            if (a == b) return 0;
            if (a < b) return -1;
          }
        
        let orderedArray = array.sort(compareNumeric);
        let orderedArrayFinal = [...new Set(orderedArray)];
        return orderedArrayFinal;
    }

    buildTree(array){
        var sortedArray = this.sortArray(array);
        console.log(sortedArray);
        

    }
}

let testTree = new Tree();
testTree.buildTree([3, 8, 1, 25, 15, 1000, 21, 3, 25, 0.5, 8, 1, 0.5])
testTree.buildTree([3, 4, 1, 50, 25, 1000, 1000, 21, 3, 25, 0.5, 8, 1, 0.5])
