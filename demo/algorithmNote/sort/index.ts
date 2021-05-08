function maopao(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j + 1], array[j]] = [array[j], array[j + 1]];
      }
    }
  }
  return array;
}
function chose(array) {
  let minIdx = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j < array.length; j++) {
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    i !== minIdx && ([array[minIdx], array[i]] = [array[i], array[minIdx]]);
  }
  return array;
}
function insertSort(array) {
  let temp;
  for (let i = 0; i < array.length; i++) {
    let j = i;
    temp = array[i];
    while (j > 0 && array[j - 1] > array[j]) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = temp;
  }
  return array;
}

function mergeArraySort(left, right) {
  let i = 0;
  let j = 0;
  let result = [];
  for (let key = 0; key < left.length; key++) {
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

function mergeSort(array) {
  if (array.length > 1) {
    let middle = Math.floor(array.length / 2);
    let left = mergeSort(array.slice(0, middle));
    let right = mergeSort(array.slice(middle));
    return mergeArraySort(left, right);
  }
  return array;
}

//快排(思考，不直接变更数组，通过返回拼接)
function quickSort(array, left = 0, right = array.length - 1) {
  if (array.length > 1) {
    let index = partition(array, left, right);
    if (left < index - 1) {
      quickSort(array, left, index - 1);
    }
    if (right > index) {
      quickSort(array, index, right);
    }
  }
  return array;
}
function partition(array, left, right) {
  let point = array[Math.floor((left + right) / 2)];
  let i = left,
    j = right;
  while (i <= j) {
    while (array[i] < point) {
      i++;
    }
    while (array[j] > point) {
      j--;
    }
    if (i <= j) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
      j--;
    }
  }
  return i;
}
quickSort([1, 2, 3, 5333, 222, 31, 52]);
