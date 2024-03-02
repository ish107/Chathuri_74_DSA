"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AVLNode_1 = __importDefault(require("./AVLNode"));
class AVLTree {
    root;
    constructor() {
        this.root = null;
    }
    getHeight(node) {
        return node ? node.height : 0;
    }
    updateHeight(node) {
        node.height = 1 + Math.max((this.getHeight(node.left)), (this.getHeight(node.right)));
    }
    getBalanceFactor(node) {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }
    insert(key) {
        this.root = this.insertData(this.root, key);
    }
    delete(key) {
        this.root = this.deleteNode(this.root, key);
    }
    search(key) {
        if (this.searchNode(this.root, key) == null) {
            return false;
        }
        else {
            return true;
        }
    }
    insertData(node, key) {
        if (!node) {
            return new AVLNode_1.default(key);
        }
        else if (key < node.key) {
            node.left = this.insertData(node.left, key);
        }
        else if (key > node.key) {
            node.right = this.insertData(node.right, key);
        }
        else {
            return node;
        }
        this.updateHeight(node);
        let balance = this.getBalanceFactor(node);
        if (balance > 1) {
            let select = node.left;
            if (key < select.key) {
                return this.rightRotate(node);
            }
            else {
                node.left = this.leftRotate(node.left);
                return this.rightRotate(node);
            }
        }
        if (balance < -1) {
            let select = node.left;
            if (key < select.key) {
                return this.leftRotate(node);
            }
            else {
                node.left = this.leftRotate(node.left);
                return this.leftRotate(node);
            }
        }
        return node;
    }
    deleteNode(node, key) {
        if (!node) {
            return node;
        }
        else if (key < node.key) {
            node.left = this.deleteNode(node.left, key);
        }
        else if (key > node.key) {
            node.right = this.deleteNode(node.right, key);
        }
        else {
            if (node.left == null || node.right == null) {
                const temp = node.left ? node.left : node.right;
                if (temp == null) {
                    node = null; //no child
                }
                else {
                    node = temp; //one chile
                }
            }
            else {
                const elem = this.findMinNode(node.right); //node with 2 children
                node.key = elem.key;
                node.right = this.deleteNode(node.right, elem.key);
            }
        }
        if (node == null) {
            return node;
        }
        this.updateHeight(node);
        let balance = this.getBalanceFactor(node);
        if (balance > 1) {
            let select = node.left;
            if (key < select.key) {
                return this.rightRotate(node);
            }
            else {
                node.left = this.leftRotate(node.left);
                return this.rightRotate(node);
            }
        }
        if (balance < -1) {
            let select = node.left;
            if (key < select.key) {
                return this.leftRotate(node);
            }
            else {
                node.left = this.leftRotate(node.left);
                return this.leftRotate(node);
            }
        }
        return node;
    }
    searchNode(node, key) {
        if (node === null || node.key == key) {
            return node;
        }
        else if (key < node.key) {
            return this.searchNode(node.left, key);
        }
        else {
            return this.searchNode(node.left, key);
        }
    }
    findMinNode(node) {
        let current = node;
        while (current.left != null) {
            current = current.left;
        }
        return current;
    }
    rightRotate(node) {
        let T1 = node.left;
        let T2 = T1.right;
        T1.right = node;
        node.left = T2;
        this.updateHeight(node);
        this.updateHeight(T1);
        return T1;
    }
    leftRotate(node) {
        let T1 = node.right;
        let T2 = T1.left;
        T1.right = node;
        node.left = T2;
        this.updateHeight(node);
        this.updateHeight(T1);
        return T1;
    }
}
