function showWidth() {
  document.getElementById('width-indicator').textContent = window.innerWidth + 'px';
}
window.addEventListener('resize', showWidth);
showWidth();

/* Note to self, when I've finished the code here, ask CoPilot for advice on how I can iterate to adhere to DRY principles  */