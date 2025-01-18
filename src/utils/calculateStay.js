import moment from "moment";

export const calculateStayDuration = (arrivalDate, departureDate, firebase) => {
  try {
    if (firebase) {
      const arrival = moment(arrivalDate.toDate());
      const departure = moment(departureDate.toDate());

      // Calculate the difference in days
      const days = departure.diff(arrival, "days");

      // Validate dates
      if (days <= 0) {
        throw new Error("Departure date must be after the arrival date");
      }

      // Nights are equal to days for hotel stays
      const nights = days;

      return { days, nights };
    }
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
