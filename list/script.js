class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    add(value) {
      const newNode = new Node(value);
  
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
  
      this.render();
    }
  
    render() {
      const linkedListDiv = document.getElementById('linked-list');
      linkedListDiv.innerHTML = '';
  
      let current = this.head;
      while (current) {
        const nodeDiv = document.createElement('div');
        nodeDiv.classList.add('node');
  
        const valueDiv = document.createElement('div');
        valueDiv.classList.add('value');
        valueDiv.innerText = current.value;
        nodeDiv.appendChild(valueDiv);
  
        const nextDiv = document.createElement('div');
        nextDiv.classList.add('next');
        if (current.next) {
          nextDiv.innerText = 'Next';
        } else {
          nextDiv.innerText = 'End';
        }
        nodeDiv.appendChild(nextDiv);
  
        linkedListDiv.appendChild(nodeDiv);
  
        current = current.next;
      }
    }
  }
  
  const linkedList = new LinkedList();
  
  linkedList.add(1);
  linkedList.add(2);
  linkedList.add(3);
  linkedList.add(4);
  