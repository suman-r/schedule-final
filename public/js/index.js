const form = document.getElementById('schedule-form');
const mediaFileInput = document.getElementById('media-file');
const captionInput = document.getElementById('caption');
const scheduleTimeInput = document.getElementById('schedule-time');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formdata = {
    mediaFile: mediaFileInput.files[0],
    caption: captionInput.value,
    scheduleTime: scheduleTimeInput.value
  };

  const form = document.getElementById('schedule-form');

  
  const mediaFile = document.getElementById('media-file').files[0];
  const caption = document.getElementById('caption').value;
  const scheduleTime = document.getElementById('schedule-time').value;
  
  const formData = new FormData();
  formData.append('mediaFile', mediaFile);
  formData.append('caption', caption);
  formData.append('scheduleTime', scheduleTime);
  
  fetch('/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData))
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));



  const jsonData = JSON.stringify(formdata);
  console.log(jsonData);
});
