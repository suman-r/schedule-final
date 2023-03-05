const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const igUserId = '<YOUR_IG_USER_ID>';
const accessToken = '<YOUR_ACCESS_TOKEN>';
app.use(express.static("public"));
app.use(bodyParser.json());
app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
 // const filePath = path.join(__dirname, 'index.html');
 // res.sendFile(filePath);
})
// Define a route to upload the media file and create the media container
app.post('/upload', async (req, res) => {
  const { imageUrl, caption } = req.body;

  // Step 1: Upload the media file and get the media ID
  const mediaId = await uploadMedia(imageUrl, caption);

  // Step 2: Create a media container with the media ID and get the creation ID
  const creationId = await createMediaContainer(mediaId, caption);

  res.send(`Scheduled post with creation ID ${creationId}`);
});

// Function to upload the media file and get the media ID
async function uploadMedia(imageUrl, caption) {
  const form = new FormData();
  form.append('image_url', fs.createReadStream(imageUrl));
  form.append('caption', caption);

  const response = await axios.post(`https://graph.instagram.com/${igUserId}/media`, form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data.id;
}

// Function to create a media container with the media ID and get the creation ID
async function createMediaContainer(mediaId, caption) {
  const response = await axios.post(`https://graph.instagram.com/${igUserId}/media?creation_id=${mediaId}`, {
    caption
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data.id;
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
