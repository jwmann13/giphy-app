let gifs = document.querySelectorAll('.gif');

let sectionObserver = new IntersectionObserver(function(entries){
  entries.forEach(entry => {
    if (!entry.isIntersecting){
      console.log(entry)
      console.log('hello');
    } else {
      console.log(entry.target.children)
      console.log('goodbye');
    }
  })
}, {
  root: null,
  rootMargin: '-50px 0px'
});

gifs.forEach(gif => { sectionObserver.observe(gif) })

// sectionObserver.observe()
// document.querySelector('.gif').forEach(gif => {
//   sectionObserver.observe(gif)
// });