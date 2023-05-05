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

// implement merge sort and update the visualization after each merge
async function mergeSort(start, end) {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  const bars = container.querySelectorAll('.bar');
  const leftArray = numbers.slice(start, mid + 1);
  const rightArray = numbers.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] < rightArray[j]) {
      numbers[k++] = leftArray[i++];
    } else {
      numbers[k++] = rightArray[j++];
    }
    // highlight the bars being compared
    bars[start + i].classList.add('focus');
    bars[mid + 1 + j].classList.add('focus');
    // wait a short time to slow down the animation
    await new Promise(resolve => setTimeout(resolve, 200));
    // update the visualization
    bars[start + i].style.height = `${numbers[start + i]}px`;
    bars[mid + 1 + j].style.height = `${numbers[mid + 1 + j]}px`;
    bars[start + i].querySelector('p').innerHTML = numbers[start + i];
    bars[mid + 1 + j].querySelector('p').innerHTML = numbers[mid + 1 + j];
    // remove focus class from the bars being compared
    bars[start + i].classList.remove('focus');
    bars[mid + 1 + j].classList.remove('focus');
  }
  while (i < leftArray.length) {
    numbers[k++] = leftArray[i++];
  }
  while (j < rightArray.length) {
    numbers[k++] = rightArray[j++];
  }
  // highlight the sorted bars in green
  for (let l = start; l <= end; l++) {
    bars[l].classList.add('sorted');
    bars[l].querySelector('p').classList.add('hide');
  }
}

// sort the array when the button is clicked
function sort() {
  mergeSort(0, numbers.length - 1);
}
