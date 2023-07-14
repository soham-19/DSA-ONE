// Generate random array of numbers
function generateArray(size, min, max) {
    var arr = [];
    for (var i = 0; i < size; i++) {
      var num = Math.floor(Math.random() * (max - min + 1)) + min;
      arr.push(num);
    }
    return arr;
  }
  
  // Display the array as bars
function displayArray(array) {
    
    var container = document.getElementById("container");
    container.innerHTML = "";
    for (var i = 0; i < array.length; i++) {
      var bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = array[i] + "px";
      var label = document.createElement("p");
      label.textContent = array[i];
      bar.appendChild(label);
      container.appendChild(bar);
    }
  }
  
  // Perform Binary Search
  function binarySearch(array, target) {
    var left = 0;
    var right = array.length - 1;
    var comparisons = 0;
  
    while (left <= right) {
      var mid = Math.floor((left + right) / 2);
      var midVal = array[mid];
  
      // Highlight the middle element
      var bars = document.getElementsByClassName("bar");
      for (var i = 0; i < bars.length; i++) {
        bars[i].classList.remove("focus", "swapping", "sorted");
        if (i === mid) {
          bars[i].classList.add("focus");
        }
      }
  
      // Update the comparison count
      comparisons++;
  
      if (midVal === target) {
        // Highlight the target element
        bars[mid].classList.add("sorted");
        return comparisons;
      } else if (midVal < target) {
        // Highlight the right half of the array
        left = mid + 1;
      } else {
        // Highlight the left half of the array
        right = mid - 1;
      }
    }
  
    return -1; // Target not found
  }
  
  // Initialize the visualization
  function initialize() {
    var size = 10;
    var min = 10;
    var max = 200;
    var target = 100;
  
      var array = generateArray(size, min, max);
      array.sort();
    displayArray(array);
  
    var output = document.getElementById("output");
    output.textContent = "Comparisons: ";
  
    var sortButton = document.getElementById("sortt");
    sortButton.addEventListener("click", function () {
      var comparisons = binarySearch(array, target);
      output.textContent = "Comparisons: " + comparisons;
    });
  }
  
  // Call the initialize function when the page is loaded
  window.onload = initialize;
  