import React, { useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useCrudRating from "../hooks/useCrudRating";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const { fetchRatings } = useCrudRating();

  useEffect(() => {
    fetchRatings(setReviews);
  }, []);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  const filterReviews = reviews.filter((review) => review.posted);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Testimonials
          </h2>
          <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            See what our guests have to say about their experience at Sophie Red
            Hotel.
          </p>
        </div>

        <div className="mb-8 lg:mb-12">
          {filterReviews.length > 0 ? (
            <Slider {...settings}>
              {filterReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-8 bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg"
                >
                  <figure className="flex flex-col justify-center items-center text-center">
                    <FaQuoteLeft className="text-gray-400 text-4xl mb-3" />
                    <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {review.room.roomType} Room Experience
                      </h3>
                      <p className="my-4">{review.remarks}</p>
                    </blockquote>
                    <figcaption className="flex justify-center items-center space-x-3">
                      <Avatar
                        img={review.currentUser.photoURL}
                        rounded={true}
                      />
                      <div className="space-y-0.5 font-medium dark:text-white text-left">
                        <div>{review.currentUser.name}</div>
                        <div className="flex items-center text-sm font-light text-gray-500 dark:text-gray-400">
                          Rated: {renderStars(review.rating)}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No reviews available.
            </p>
          )}
        </div>
      </div>

      {/* Decorative line */}
      <div className="flex justify-center items-center py-10 pb-44">
        <div className="line bg-[#E94040] h-[10px] w-[300px]"></div>
      </div>
    </section>
  );
};

export default Testimonials;
