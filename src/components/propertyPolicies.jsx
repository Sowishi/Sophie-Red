import React from "react";

const PropertyPolicies = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Property Policies */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Property Policies</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Children and Extra Beds</h3>
          <p>
            Extra beds are dependent on the room you choose. Please check the
            individual room capacity for more details.
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>All children are welcome.</li>
            <li>
              <strong>Infant (0-2 years):</strong> Stay for free if using
              existing bedding. Baby cot/crib may be requested directly from the
              property.
            </li>
            <li>
              <strong>Children (3-12 years):</strong> Stay for free if using
              existing bedding. If you need an extra bed, it will incur an
              additional charge.
            </li>
            <li>
              <strong>Guests 13 years and older:</strong> Must use an extra bed
              which will incur an additional charge.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Others</h3>
          <p>
            When booking more than 5 rooms, different policies and additional
            supplements may apply.
          </p>
        </div>
      </section>

      {/* Helpful Facts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Some Helpful Facts</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Check-in/Check-out</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>
              <strong>Check-in from:</strong> 02:00 PM
            </li>
            <li>
              <strong>Check-out from:</strong> 11:30 AM
            </li>
            <li>
              <strong>Check-out until:</strong> 12:00 PM
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Getting Around</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>
              <strong>Airport transfer fee:</strong> 2500 PhP
            </li>
            <li>
              <strong>Distance from city center:</strong> 36.2 km
            </li>
            <li>
              <strong>Travel time to airport (minutes):</strong> 109
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">The Property</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>
              <strong>Number of bars/lounges:</strong> 1
            </li>
            <li>
              <strong>Number of floors:</strong> 3
            </li>
            <li>
              <strong>Number of restaurants:</strong> 2
            </li>
            <li>
              <strong>Number of rooms:</strong> 28
            </li>
            <li>
              <strong>Room voltage:</strong> 220
            </li>
            <li>
              <strong>Year property opened:</strong> 2017
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PropertyPolicies;
