const container = document.getElementById('container');

// create an array of random numbers to sort
let numbers = [];
for (let i = 0; i < 20; i++) {
  numbers.push(Math.floor(Math.random() * 100));
}
let count = 0;
// create a bar element for each number and add it to the container
for (let i = 0; i < numbers.length; i++) {
  const bar = document.createElement('div');
  bar.classList.add('bar');
  const p = document.createElement('p');
  p.innerHTML = numbers[i];
  bar.appendChild(p);
  bar.style.height = `${numbers[i]}px`;
  container.appendChild(bar);
}

// implement selection sort and update the visualization after each swap
async function selectionSort() {
  const bars = container.querySelectorAll('.bar');
  for (let i = 0; i < numbers.length - 1; i++) {
    let minIndex = i;
    // add focus class to the bar being compared with the minIndex
    bars[minIndex].classList.add('focus');
    for (let j = i + 1; j < numbers.length; j++) {
      // add focus class to the bar being compared
      bars[j].classList.add('focus');

      // wait a short time to slow down the animation
      await new Promise(resolve => setTimeout(resolve, 200));

      if (numbers[j] < numbers[minIndex]) {
        count++;
        myFunction();
        // update the minIndex
        minIndex = j;
      }

      // remove focus class from the bar being compared
      bars[j].classList.remove('focus');
    }

    // swap numbers[i] and numbers[minIndex]
    const temp = numbers[i];
    numbers[i] = numbers[minIndex];
    numbers[minIndex] = temp;

    // update the visualization
    bars[i].style.height = `${numbers[i]}px`;
    bars[minIndex].style.height = `${numbers[minIndex]}px`;
    bars[i].querySelector('p').innerHTML = numbers[i];
    bars[minIndex].querySelector('p').innerHTML = numbers[minIndex];
    bars[i].classList.add('swapping');
    bars[minIndex].classList.add('swapping');

    // wait a short time to slow down the animation
    await new Promise(resolve => setTimeout(resolve, 100));

    // remove swapping class and show the numbers again
    bars[i].classList.remove('swapping');
    bars[minIndex].classList.remove('swapping');

    // change the color of the sorted bar to green
    bars[i].classList.add('sorted');
    bars[i].querySelector('p').classList.add('hide');
  }
  // change the color of the last bar to green
  bars[numbers.length - 1].classList.add('sorted');
  bars[numbers.length - 1].querySelector('p').classList.add('hide');
}

// sort the array when the button is clicked
function sort() {
  selectionSort();
}
function downloadJavaFile() {
  const fileContent = 'public class SelectionSort {\n\n    public static void selectionSort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++) {\n            int minIndex = i;\n            for (int j = i+1; j < n; j++) {\n                if (arr[j] < arr[minIndex]) {\n                    minIndex = j;\n                }\n            }\n            int temp = arr[minIndex];\n            arr[minIndex] = arr[i];\n            arr[i] = temp;\n        }\n    }\n\n    public static void printArray(int[] arr) {\n        System.out.print("[ ");\n        for (int i = 0; i < arr.length; i++) {\n            System.out.print(arr[i] + " ");\n        }\n        System.out.print("]");\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        System.out.println("Original array: ");\n        printArray(arr);\n        \n        selectionSort(arr);\n        \n        System.out.println("\\n\\nSorted array: ");\n        printArray(arr);\n    }\n}';
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'SelectionSort.java';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
function myFunction() {
  document.getElementById("output").innerHTML = "Comparisions : " + count;
}