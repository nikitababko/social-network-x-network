export const imageShow = (src, theme) => {
  return (
    <img
      src={src}
      alt="Image"
      className="img-thumbnail"
      style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
    />
  );
};

export const videoShow = (src, theme) => {
  return (
    <video
      controls
      src={src}
      alt="Image"
      className="img-thumbnail"
      style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
    />
  );
};
