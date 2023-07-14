const container = document.getElementById('container');

// Create an array of random numbers to sort
let numbers = [];
for (let i = 0; i < 20; i++) {
  numbers.push(Math.floor(Math.random() * 100));
}

// Create a bar element for each number and add it to the container
for (let i = 0; i < numbers.length; i++) {
  const bar = document.createElement('div');
  bar.classList.add('bar');
  const p = document.createElement('p');
  p.innerHTML = numbers[i];
  bar.appendChild(p);
  bar.style.height = `${numbers[i]}px`;
  container.appendChild(bar);
}

// Utility function to update the visualization
function updateVisualization(arr, comparingIndices, sortedIndices) {
  const bars = container.querySelectorAll('.bar');
  for (let i = 0; i < arr.length; i++) {
    const bar = bars[i];
    bar.style.height = `${arr[i]}px`;
    bar.querySelector('p').innerHTML = arr[i];

    if (comparingIndices.includes(i)) {
      bar.classList.add('focus');
    } else {
      bar.classList.remove('focus');
    }

    if (sortedIndices.includes(i)) {
      bar.classList.add('sorted');
    } else {
      bar.classList.remove('sorted');
    }

    if (sortedIndices.includes(i) && arr[i] === i) {
      bar.classList.add('right-position');
    } else {
      bar.classList.remove('right-position');
    }
  }
}

// Implement Quick Sort and update the visualization after each swap
async function quickSort(arr, low, high) {
  if (low < high) {
    const pivotIndex = await partition(arr, low, high);
    await quickSort(arr, low, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, high);
  }
}

async function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // Highlight the comparing bars in red
    updateVisualization(arr, [j, high], []);

    await new Promise(resolve => setTimeout(resolve, 100));

    if (arr[j] <= pivot) {
      i++;

      // Swap arr[i] and arr[j]
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      // Update the visualization
      updateVisualization(arr, [j, high], [i]);

      // await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  // Swap arr[i+1] and arr[high] (pivot)
  const temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  // Update the visualization
  updateVisualization(arr, [high], [i + 1]);

  return i + 1;
}

// Sort the array when the button is clicked
function sort() {
  const low = 0;
  const high = numbers.length - 1;
  quickSort(numbers, low, high);
}

// Call the sort function to initiate the sorting process
sort();
