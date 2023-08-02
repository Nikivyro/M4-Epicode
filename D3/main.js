function getRandomImage() {
  const randomArray = ['nature','adventure','sea','animals','food','water'];
  const randomQuery = Math.floor(Math.random() * randomArray.length);
  const API_KEY = 'GrObsuQxBba2jYLfNvt8mau2EgpTJPBIJU79VagDc1FLjX0b43gtUVRi';
  const UrlRandomPic = `https://api.pexels.com/v1/search?query=${randomQuery}&per_page=1&orientation=landscape`;

  const request = {
    method: 'GET',
    headers: {
      'Authorization': API_KEY
    }
  }

  fetch(UrlRandomPic, request)
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nella richiesta: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data.photos[0].src.large)
      const heroSection = document.getElementById('hero')
      heroSection.style.backgroundImage = `url('${data.photos[0].src.large}')`;
    })
    .catch(error => {
      console.error('Si è verificato un errore', error);
    });
}


function getGallery() {
  const API_KEY = 'GrObsuQxBba2jYLfNvt8mau2EgpTJPBIJU79VagDc1FLjX0b43gtUVRi';
  const searchValue = document.getElementById('search').value;
  const urlComplete = `https://api.pexels.com/v1/search?query=${searchValue}&orientation=square`;

  const request = {
    method: 'GET',
    headers: {
      'Authorization': API_KEY
    }
  }

  fetch(urlComplete,request)
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nella richiesta: ' + response.status);
      }
      return response.json();
    })
    .then(res => {
      
      const allPhotos = document.getElementById('allPhotos');
      // const col1 = document.getElementById('col1');
      // const col2 = document.getElementById('col2');
      // const col3 = document.getElementById('col3');

      allPhotos.innerHTML = '';

      const photos = res.photos
      photos.forEach((photo, i) => {
        allPhotos.innerHTML += '<div class="col-6 col-md-4 col-lg-3"><img src="' + photo.src.large + '" class="img-fluid mb-3"></div>'
      });
    })
    .catch(error => {
      console.error('Si è verificato un errore durante la ricerca delle immagini:', error);
    });
}

getRandomImage()