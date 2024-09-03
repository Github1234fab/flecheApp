// place files you want to import through the `$lib` alias in this folder.

const targetNode = document.getElementById('myElement');

const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('Enfant modifié');
    } else if (mutation.type === 'attributes') {
      console.log('Attribut modifié');
    }
  }
});

const config = { childList: true, attributes: true, subtree: true };
observer.observe(targetNode, config);