document.addEventListener('DOMContentLoaded', function() {
  // EMS click boxes
  const emsClickBoxes = document.querySelectorAll('.ems-section .click-box');
  emsClickBoxes.forEach(box => {
    box.addEventListener('click', function() {
      emsClickBoxes.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Generator component click boxes
  const generatorClickBoxes = document.querySelectorAll('.icon-box[data-component]');
  generatorClickBoxes.forEach(box => {
    box.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

  // Frequency click boxes in Netz section
  const frequencyClickBoxes = document.querySelectorAll('.frequency-group .click-box');
  frequencyClickBoxes.forEach(box => {
    box.addEventListener('click', function() {
      frequencyClickBoxes.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Click boxes within icon boxes (like ECDS access)
  const innerClickBoxes = document.querySelectorAll('.icon-box .click-box');
  innerClickBoxes.forEach(box => {
    box.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent the icon box click event
      const group = this.closest('.radio-group');
      if (group) {
        group.querySelectorAll('.click-box').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
});
