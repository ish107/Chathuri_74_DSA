import AVLNode from "./AVLNode";

class AVLTree{
    public root:AVLNode|null;
    constructor(){
        this.root = null;
    }
    private getHeight(node:AVLNode|null):number{
        return node? node.height:0;
    }
    private updateHeight(node:AVLNode):void{
        node.height = 1 + Math.max((this.getHeight(node.left)),(this.getHeight(node.right)));
    }
    private getBalanceFactor(node:AVLNode):number{
        return this.getHeight(node.left)-this.getHeight(node.right);
    }
    public insert(key:number):void{
        this.root = this.insertData(this.root,key);
    }
    public delete(key:number):void{
        this.root = this.deleteNode(this.root,key);
    }
    public search(key:number):Boolean{
        if(this.searchNode(this.root,key)==null){
            return false;
        }else{
            return true;
        }
    }
    public countNodes(node:AVLNode):number{
        return this.inOrderTraversal(node)
    }

    private insertData(node:AVLNode|null,key:number):AVLNode{
        if(!node){
            return new AVLNode(key);
        }else if(key<node.key){
            node.left = this.insertData(node.left,key)
        }else if(key>node.key){
            node.right = this.insertData(node.right,key)
        }else{
            return node
        }
        this.updateHeight(node);
        //balancing the tree
        let balance :number = this.getBalanceFactor(node);
        if(balance>1){
            let select = node.left as AVLNode;
            if(key<select.key){
                return this.rightRotate(node)
            }else{
                node.left =  this.leftRotate(node.left as AVLNode)
                return this.rightRotate(node);
            }
        }
        if(balance<-1){
            let select = node.left as AVLNode;
            if(key<select.key){
                return this.leftRotate(node)
            }else{
                node.left =  this.leftRotate(node.left as AVLNode)
                return this.leftRotate(node);
            }
        }
        return node;

    }
    private deleteNode(node:AVLNode|null,key:number):AVLNode|null{
        if(!node){
            return node;
        }else if(key<node.key){
            node.left = this.deleteNode(node.left,key)
        }else if(key>node.key){
            node.right = this.deleteNode(node.right,key)
        }else{
            if(node.left==null||node.right==null){
                const temp =node.left? node.left:node.right;
                if(temp==null){
                    node=null;  //no child
                }else{
                    node=temp; //one chile
                }
            }else{
                const elem = this.findMinNode(node.right) as AVLNode;  //node with 2 children
                node.key = elem.key;
                node.right = this.deleteNode(node.right,elem.key);
            }
        }
        if(node==null){
            return node;
        }
        this.updateHeight(node);
        //balancing the tree
        let balance :number = this.getBalanceFactor(node);
        if(balance>1){
            let select = node.left as AVLNode;
            if(key<select.key){
                return this.rightRotate(node)
            }else{
                node.left =  this.leftRotate(node.left as AVLNode)
                return this.rightRotate(node);
            }
        }
        if(balance<-1){
            let select = node.left as AVLNode;
            if(key<select.key){
                return this.leftRotate(node)
            }else{
                node.left =  this.leftRotate(node.left as AVLNode)
                return this.leftRotate(node);
            }
        }
        return node;
    }


    public searchNode(node:AVLNode|null,key:number):AVLNode|null{
        if(node===null || node.key ==key ){
            return node;
        }else if(key<node.key){
            return this.searchNode(node.left,key);
        }else{
            return this.searchNode(node.left,key)
        }
    }


    private findMinNode(node:AVLNode):AVLNode|null{
        let current = node;
        while (current.left !=null){
            current =current.left;
        }
        return current;
    }

    private rightRotate(node:AVLNode):AVLNode{  //right rotation
        let T1 :AVLNode = node.left as AVLNode;
        let T2 = T1.right as AVLNode;
        T1.right = node;
        node.left =T2;
        this.updateHeight(node);
        this.updateHeight(T1)
        return T1;
    }
    private leftRotate(node:AVLNode):AVLNode{   //left rotation
        let T1 :AVLNode = node.right as AVLNode;
        let T2 = T1.left as AVLNode;
        T1.right = node;
        node.left =T2;
        this.updateHeight(node);
        this.updateHeight(T1)
        return T1;
    }

    public inOrderTraversal(node: AVLNode | null): number {
        const arr:number[] = []
        if (node) {
        this.inOrderTraversal(node.left);
        arr.push(node.key);   //adding nodes to an array
        this.inOrderTraversal(node.right);
        }

        return arr.length //get the length of the array
    }
        
    
}

export default AVLTree;