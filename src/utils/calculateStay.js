import moment from "moment";

export const calculateStayDuration = (arrivalDate, departureDate) => {
  try {
    // Parse the dates using moment.js
    const arrival = moment(arrivalDate);
    const departure = moment(departureDate);

    // Calculate the difference in days
    const days = departure.diff(arrival, "days");

    // Validate dates
    if (days <= 0) {
      throw new Error("Departure date must be after the arrival date");
    }

    // Nights are equal to days for hotel stays
    const nights = days;

    return { days, nights };
  } catch (error) {
    console.log(error.message);
  }
};
