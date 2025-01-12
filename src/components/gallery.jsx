const CustomGallery = ({ images }) => {
  return (
    <div className="container mx-auto ">
      <div
        className="flex overflow-x-auto space-x-4 p-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((image) => (
          <div
            key={image.roomID}
            className="shrink-0"
            style={{ scrollSnapAlign: "center" }}
          >
            <img
              className="rounded-lg shadow-md"
              style={{ width: 300, height: 300 }}
              src={image.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomGallery;
