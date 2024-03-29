const container = document.getElementById('container');

// create an array of random numbers to sort
let numbers = [];
for (let i = 0; i < 20; i++) {
  numbers.push(Math.floor(Math.random() * 100));
}

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

// implement bubble sort and update the visualization after each swap
async function bubbleSort() {
  const bars = container.querySelectorAll('.bar');
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - i - 1; j++) {
      // add focus class to the bars being compared
      bars[j].classList.add('focus');
      bars[j+1].classList.add('focus');

      // wait a short time to slow down the animation
      await new Promise(resolve => setTimeout(resolve, 200));

      if (numbers[j] > numbers[j+1]) {
        // swap numbers[j] and numbers[j+1]
        const temp = numbers[j];
        numbers[j] = numbers[j+1];
        numbers[j+1] = temp;

        // update the visualization
        bars[j].style.height = `${numbers[j]}px`;
        bars[j+1].style.height = `${numbers[j+1]}px`;
        bars[j].querySelector('p').innerHTML = numbers[j];
        bars[j+1].querySelector('p').innerHTML = numbers[j+1];
        bars[j].classList.add('swapping');
        bars[j+1].classList.add('swapping');

        // wait a short time to slow down the animation
        await new Promise(resolve => setTimeout(resolve, 100));

        // remove swapping class and show the numbers again
        bars[j].classList.remove('swapping');
        bars[j+1].classList.remove('swapping');
      }

      // remove focus class from the bars being compared
      bars[j].classList.remove('focus');
      bars[j+1].classList.remove('focus');
    }
    // change the color of the sorted bars to green
    bars[numbers.length - i - 1].classList.add('sorted');
    bars[numbers.length - i - 1].querySelector('p').classList.add('hide');
  }
  // change the color of the first bar to green
  bars[0].classList.add('sorted');
  bars[0].querySelector('p').classList.add('hide');
}

// sort the array when the button is clicked
function sort() {
  bubbleSort();
}

function downloadJavaFile() {
  const fileContent = 'public class BubbleSort {\n\n    public static void bubbleSort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++) {\n            for (int j = 0; j < n-i-1; j++) {\n                if (arr[j] > arr[j+1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j+1];\n                    arr[j+1] = temp;\n                }\n            }\n        }\n    }\n\n    public static void printArray(int[] arr) {\n        System.out.print("[ ");\n        for (int i = 0; i < arr.length; i++) {\n            System.out.print(arr[i] + " ");\n        }\n        System.out.print("]");\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        System.out.println("Original array: ");\n        printArray(arr);\n        \n        bubbleSort(arr);\n        \n        System.out.println("\\n\\nSorted array: ");\n        printArray(arr);\n    }\n}';
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'HelloWorld.java';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

