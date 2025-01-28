import React from "react";
import { Button, Avatar } from "flowbite-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const testimonials = [
    {
      title: "A Luxurious Stay with Unmatched Comfort",
      content: [
        "Sophie Red Hotel offers a luxurious experience in the heart of Cagayan de Oro. The rooms are well-designed, spacious, and provide all the modern amenities you could ask for.",
        "The staff goes above and beyond to make your stay comfortable, and the location is perfect for both business and leisure travelers.",
        "If you're looking for the best hotel in the area, Sophie Red is undoubtedly the top choice.",
      ],
      name: "Anna Santos",
      role: "Travel Blogger",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
    },
    {
      title: "Exceptional Service and Delicious Cuisine",
      content: [
        "The staff at Sophie Red Hotel are incredibly professional and friendly. From the moment you step in, you're greeted with warm smiles and top-notch service.",
        "The in-house restaurant serves a variety of dishes that cater to every palate, and the breakfast buffet is a must-try!",
      ],
      name: "Carlos Reyes",
      role: "Food Critic",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
    },
    {
      title: "Perfect Venue for Events and Celebrations",
      content: [
        "I hosted a corporate event at Sophie Red Hotel, and it exceeded all expectations. The event hall was elegantly set up, and the technical support provided ensured everything went smoothly.",
        "Highly recommend this hotel for business events or even family celebrations!",
      ],
      name: "Mark Villanueva",
      role: "Event Organizer",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
    },
    {
      title: "A Hidden Gem in Cagayan de Oro",
      content: [
        "Sophie Red Hotel offers an oasis of relaxation amidst the hustle and bustle of the city. The spa services are heavenly, and the rooftop pool provides stunning views of the cityscape.",
        "It’s a hidden gem that guarantees an unforgettable stay.",
      ],
      name: "Isabella Cruz",
      role: "Lifestyle Influencer",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png",
    },
  ];

  // Settings for the carousel
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay interval (5 seconds)
    pauseOnHover: true, // Pause autoplay on hover
    arrows: true, // Show navigation arrows
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Testimonials
          </h2>
          <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Discover what our guests have to say about their experience at
            Sophie Red Hotel in Cagayan de Oro, Philippines.
          </p>
        </div>
        <div className="mb-8 lg:mb-12">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 bg-gray-50 dark:bg-gray-800">
                <figure className="flex flex-col justify-center items-center text-center">
                  <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonial.title}
                    </h3>
                    {testimonial.content.map((paragraph, idx) => (
                      <p key={idx} className="my-4">
                        {paragraph}
                      </p>
                    ))}
                  </blockquote>
                  <figcaption className="flex justify-center items-center space-x-3">
                    <Avatar img={testimonial.img} rounded={true} />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                      <div>{testimonial.name}</div>
                      <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="flex justify-center items-center py-10 pb-44">
        <div className="line bg-[#E94040] h-[10px] w-[300px]"></div>
      </div>
    </section>
  );
};

export default Testimonials;
