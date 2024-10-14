
  function onScroll() {
    const elements = document.querySelectorAll('.animated');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add('animate');
      } else {
        element.classList.remove('animate');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('load', onScroll);
