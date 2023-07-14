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

// implement shell sort and update the visualization after each swap
async function shellSort() {
  const bars = container.querySelectorAll('.bar');
  const len = numbers.length;
  let gap = Math.floor(len / 2);
  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      const key = numbers[i];
      let j = i;
      while (j >= gap && numbers[j - gap] > key) {
        count++;
        myFunction();

        bars[j].style.backgroundColor = "green"; // change color of bar being compa#4B0082
        bars[j - gap].style.backgroundColor = "green"; // change color of the compa#4B0082 bar

        numbers[j] = numbers[j - gap];
        bars[j].style.height = `${numbers[j]}px`;
        bars[j].querySelector('p').innerHTML = numbers[j];

        j -= gap;
        await new Promise(resolve => setTimeout(resolve, 300)); // delay to slow down the animation

        // reset color of bars after comparison
        bars[j].style.backgroundColor = "#222"; // normal gray
        bars[j + gap].style.backgroundColor = "#222"; // normal gray
      }
      numbers[j] = key;
      bars[j].style.height = `${key}px`;
      bars[j].querySelector('p').innerHTML = key;

      // change color of sorted bar to green
      bars[j].style.backgroundColor = "#4B0082"; // green
    }
    gap = Math.floor(gap / 2);
  }
  // change color of all bars to green after sorting is finished
  for (let i = 0; i < len; i++) {
    bars[i].style.backgroundColor = "#4B0082"; // green
  }
}

// sort the array when the button is clicked
function sort() {
  shellSort();
}

function myFunction() {
  document.getElementById("output").innerHTML = "Comparisons: " + count;
}
