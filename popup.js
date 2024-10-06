
document.getElementById('convertButton').addEventListener('click', function () {
  
  const fileInput = document.getElementById('imageUpload');
  
  
  const file = fileInput.files[0];

  
  if (!file) {
      alert('Please upload an image first'); 
      return; 
  }

 
  const outputFormat = document.getElementById('outputFormat').value;

  
  const reader = new FileReader();

 
  reader.onload = function (e) {
      
      const img = new Image();
      img.src = e.target.result; 

      
      img.onload = function () {
         
          const canvas = document.createElement('canvas');
          canvas.width = img.width; 
          canvas.height = img.height; 
          
          
          const ctx = canvas.getContext('2d');
          
          ctx.drawImage(img, 0, 0);

          
          let mimeType;
          let fileExtension;

          if (outputFormat === 'png') {
              mimeType = 'image/png';
              fileExtension = 'converted-image.png'; // Output file name for PNG
          } else if (outputFormat === 'jpg') {
              mimeType = 'image/jpeg';
              fileExtension = 'converted-image.jpg'; // Output file name for JPG
          }

          // Convert the drawn image on the canvas to the selected format
          canvas.toBlob(function (blob) {
              
              const url = URL.createObjectURL(blob);
             
              const downloadLink = document.getElementById('downloadLink');
              downloadLink.href = url; 
              downloadLink.download = fileExtension; 
              downloadLink.style.display = 'block';
              downloadLink.innerText = 'Download ' + outputFormat.toUpperCase(); 
          }, mimeType); 
      };
  };

  // Start reading the uploaded file as a Data URL (base64 encoded)
  reader.readAsDataURL(file);
});
