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

// implement insertion sort and update the visualization after each swap
async function insertionSort() {
  const bars = container.querySelectorAll('.bar');
  for (let i = 1; i < numbers.length; i++) {
    const key = numbers[i];
    let j = i - 1;
    while (j >= 0 && numbers[j] > key) {
      bars[j].style.backgroundColor = "#0C7B93"; // change color of bar being compared 4CAF50
      numbers[j + 1] = numbers[j];
      bars[j + 1].style.height = `${numbers[j + 1]}px`;
      bars[j + 1].querySelector('p').innerHTML = numbers[j + 1];
      j--;
      // wait a short time to slow down the animation
      await new Promise(resolve => setTimeout(resolve, 300));
      // reset color of bar after comparison
      bars[j + 1].style.backgroundColor = "#FF1E56"; // green
    }
    numbers[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
    bars[j + 1].querySelector('p').innerHTML = key;
    // change color of sorted bar to green
    bars[j + 1].style.backgroundColor = "#FF1E56"; // green
  }
  // change color of all bars to green after sorting is finished
  for (let i = 0; i < numbers.length; i++) {
    bars[i].style.backgroundColor = "#0C7B93"; // green
  }
}

// sort the array when the button is clicked
function sort() {
  insertionSort();
}
