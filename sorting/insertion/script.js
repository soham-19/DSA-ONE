const container = document.getElementById('container');

let numbers = [];
for (let i = 0; i < 20; i++) {
  numbers.push(Math.floor(Math.random() * 100));
}
let count = 0;


// create  bar 
for (let i = 0; i < numbers.length; i++) {
  const bar = document.createElement('div');
  bar.classList.add('bar');
  const p = document.createElement('p');
  p.innerHTML = numbers[i];
  bar.appendChild(p);
  bar.style.height = `${numbers[i]}px`;
  container.appendChild(bar);
}

//   sort and update  visualization
async function insertionSort() {
  const bars = container.querySelectorAll('.bar');
  for (let i = 1; i < numbers.length; i++) {
    const key = numbers[i];
    let j = i - 1;
    while (j >= 0 && numbers[j] > key) {
      count++;
      myFunction();

      bars[j].style.backgroundColor = "green"; 
      numbers[j + 1] = numbers[j];
      bars[j + 1].style.height = `${numbers[j + 1]}px`;
      bars[j + 1].querySelector('p').innerHTML = numbers[j + 1];
      j--;
      
      await new Promise(resolve => setTimeout(resolve, 300));
      // reset color of bar 
      bars[j + 1].style.backgroundColor = "#4B0082"; // green
    }
    numbers[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
    bars[j + 1].querySelector('p').innerHTML = key;
    // change color of sorted bar to green
    bars[j + 1].style.backgroundColor = "#4B0082"; // green
  }
  // change color of all bars to green after sorting is finished
  for (let i = 0; i < numbers.length; i++) {
    bars[i].style.backgroundColor = "#4B0082"; // green
  }
}

// sort the array when the button is clicked
function sort() {
  insertionSort();
}

function myFunction() {
  document.getElementById("output").innerHTML = "Comparisions : " + count;
}
function downloadJavaFile() {
  const fileContent = 'public class InsertionSort {\n\n    public static void insertionSort(int[] arr) {\n        int n = arr.length;\n        for (int i = 1; i < n; i++) {\n            int key = arr[i];\n            int j = i - 1;\n\n            while (j >= 0 && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j = j - 1;\n            }\n            arr[j + 1] = key;\n        }\n    }\n\n    public static void printArray(int[] arr) {\n        System.out.print("[ ");\n        for (int i = 0; i < arr.length; i++) {\n            System.out.print(arr[i] + " ");\n        }\n        System.out.print("]");\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        System.out.println("Original array: ");\n        printArray(arr);\n        \n        insertionSort(arr);\n        \n        System.out.println("\\n\\nSorted array: ");\n        printArray(arr);\n    }\n}';
  
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'InsertionSort.java';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
