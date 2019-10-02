const header = document.querySelector('.input')
const section = $('#gifs')[0].children;
const topSentinel = section[0];
const bottomSentinel = section[section.length-1];

const sectionObserver = new IntersectionObserver(function(entries, sectionObserver){
  entries.forEach(entry => {
    if (!entry.isIntersecting){
      console.log('hello');
    } else {
      console.log('goodbye');
    }
  })
});

// sectionObserver.observe(topSentinel);

console.log(topSentinel);