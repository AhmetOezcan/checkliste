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

  // PDF Generation
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get the .pdf-main element
      const element = document.querySelector('.pdf-main');
      if (!element) {
        console.error('Element .pdf-main not found');
        return;
      }

      try {
        // Load required libraries dynamically
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');

        // Create canvas from the element
        const canvas = await html2canvas(element, {
          scale: 2, // Higher scale for better quality
          useCORS: true, // Enable CORS for images
          logging: false,
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight
        });

        // Create PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        // Calculate dimensions to fit the content properly
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        
        // Calculate scaling factor to ensure content fits on one page
        const scale = Math.min(
          imgWidth / canvas.width,
          pageHeight / canvas.height
        ) * 0.95; // 5% margin to ensure it fits on one page
        
        const scaledWidth = canvas.width * scale;
        const scaledHeight = canvas.height * scale;
        
        // Center horizontally and vertically
        const xOffset = (imgWidth - scaledWidth) / 2;
        const yOffset = (pageHeight - scaledHeight) / 2;
        
        // Add the image to the PDF
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          xOffset,
          yOffset,
          scaledWidth,
          scaledHeight
        );

        // Save the PDF
        pdf.save('checkliste.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Fehler beim Generieren der PDF-Datei. Bitte versuchen Sie es erneut.');
      }
    });
  }
});

// Helper function to load scripts dynamically
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
