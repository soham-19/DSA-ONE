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

// implement shell sort and update the visualization after each swap
async function shellSort() {
  const bars = container.querySelectorAll('.bar');
  let n = numbers.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let temp = numbers[i];
      let j = i;
      bars[j].classList.add('processing');

      while (j >= gap && numbers[j - gap] > temp) {
        bars[j - gap].classList.add('focus');
        await new Promise(resolve => setTimeout(resolve, 200));

        numbers[j] = numbers[j - gap];
        bars[j].style.height = `${numbers[j]}px`;
        bars[j].querySelector('p').innerHTML = numbers[j];
        bars[j].classList.remove('processing');
        bars[j - gap].classList.remove('focus');
        j -= gap;

        bars[j].classList.add('processing');
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      numbers[j] = temp;
      bars[j].style.height = `${numbers[j]}px`;
      bars[j].querySelector('p').innerHTML = numbers[j];
      bars[j].classList.remove('processing');
      bars[j].classList.add('sorted');
      bars[j].querySelector('p').classList.add('hide');
    }

    gap = Math.floor(gap / 2);
  }

  // change the color of the sorted bars to green
  for (let i = 0; i < bars.length; i++) {
    if (bars[i].classList.contains('sorted')) {
      continue;
    }

    bars[i].classList.add('sorted');
    bars[i].querySelector('p').classList.add('hide');
  }
}

// sort the array when the button is clicked
function sort() {
  shellSort();
}
