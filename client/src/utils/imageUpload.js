export const checkImage = (file) => {
  let error = '';

  if (!file) {
    return (error = 'File does not exist.');
  }

  if (file.size > 1024 * 1024) {
    return (error = 'The largest image size is 1mb.');
  }

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    return (error = 'Image format is incorrect.');
  }

  return error;
};

export const imageUpload = async (images) => {
  let imgArr = [];

  for (const item of images) {
    const formData = new FormData();

    if (item.camera) {
      formData.append('file', item.camera);
    } else {
      formData.append('file', item);
    }

    formData.append('upload_preset', 'x-network');
    formData.append('cloud_name', 'nikitababko');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/nikitababko/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();
    imgArr.push({
      public_id: data.public_id,
      url: data.secure_url,
    });
  }

  return imgArr;
};
