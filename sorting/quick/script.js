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

// implement quick sort and update the visualization after each swap
async function quickSort(low, high) {
  if (low < high) {
    const pivotIndex = await partition(low, high);
    await quickSort(low, pivotIndex - 1);
    await quickSort(pivotIndex + 1, high);
  }
}

async function partition(low, high) {
  const bars = container.querySelectorAll('.bar');
  const pivotValue = numbers[high];
  let i = low;
  for (let j = low; j < high; j++) {
    bars[high].classList.add('focus');
    bars[j].classList.add('focus');

    await new Promise(resolve => setTimeout(resolve, 200));

    if (numbers[j] < pivotValue) {
      await swap(i, j);
      bars[i].classList.remove('focus');
      i++;
    }

    bars[j].classList.remove('focus');
  }
  await swap(i, high);
  bars[i].classList.remove('focus');
  bars[i].classList.add('sorted');
  bars[i].style.backgroundColor = '#FF1E56';
  bars[i].querySelector('p').classList.add('hide');

  await new Promise(resolve => setTimeout(resolve, 100));
  
  
  return i;
}

async function swap(i, j) {
  const bars = container.querySelectorAll('.bar');
  const temp = numbers[i];
  numbers[i] = numbers[j];
  numbers[j] = temp;

  bars[i].style.height = `${numbers[i]}px`;
  bars[j].style.height = `${numbers[j]}px`;
  bars[i].querySelector('p').innerHTML = numbers[i];
  bars[j].querySelector('p').innerHTML = numbers[j];

  bars[i].classList.add('swapping');
  bars[j].classList.add('swapping');

  await new Promise(resolve => setTimeout(resolve, 100));

  bars[i].classList.remove('swapping');
  bars[j].classList.remove('swapping');
}
function changeBarColors(color) {
  const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = color;
  }
}

// sort the array when the button is clicked
function sort() {
  quickSort(0, numbers.length - 1);
}
