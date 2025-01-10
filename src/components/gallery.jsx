const CustomGallery = () => {
  return (
    <div className="container mx-auto ">
      <div
        className="flex overflow-x-auto space-x-4 p-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="shrink-0"
            style={{ scrollSnapAlign: "center" }}
          >
            <img
              className="rounded-lg shadow-md"
              style={{ width: 300, height: 300 }}
              src="https://fastly.picsum.photos/id/326/200/300.jpg?hmac=SKzjQ5ycCVyISiOfq2m-GqpQ5zWT_J202KPYG7z0uB4"
              alt={`Gallery item ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomGallery;
