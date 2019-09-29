const initIntersectionObserver = () => {
  const options = {
    root: null
    // root: document.querySelector('#gifs')
    /* root: document.querySelector(".cat-list") */
  }

  const callback = entries => {
    entries.forEach(entry => {
      console.log(entry.target)
      if (entry.target.id === 'gif-container-0') {
        topSentCallback(entry);
      } else if (entry.target.id === `gif-container-${listSize - 1}`) {
        botSentCallback(entry);
      }
    });
  }

  var observer = new IntersectionObserver(callback, options);
  observer.observe(document.querySelector("#gif-container-0"));
  // observer.observe($(`#gif-container-${listSize - 1}`));
}

const recycleDOM = firstIndex => {
  for (let i = 0; i < listSize; i++) {
    const tile = document.querySelector("#gif-container-" + i);
    tile.firstElementChild.innerText = DB[i + firstIndex].title;
    tile.lastChild.setAttribute("src", DB[i + firstIndex].imgSrc);
  }
}

const adjustPaddings = isScrollDown => {
  const container = document.querySelector("#gifs");
  const currentPaddingTop = getNumFromStyle(container.style.paddingTop);
  const currentPaddingBottom = getNumFromStyle(container.style.paddingBottom);
  const remPaddingsVal = 170 * (listSize / 2);
  if (isScrollDown) {
    container.style.paddingTop = currentPaddingTop + remPaddingsVal + "px";
    container.style.paddingBottom = currentPaddingBottom === 0 ? "0px" : currentPaddingBottom - remPaddingsVal + "px";
  } else {
    container.style.paddingBottom = currentPaddingBottom + remPaddingsVal + "px";
    container.style.paddingTop = currentPaddingTop === 0 ? "0px" : currentPaddingTop - remPaddingsVal + "px";
  }
}