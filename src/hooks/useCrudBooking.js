import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import moment from "moment/moment";
import { calculateStayDuration } from "../utils/calculateStay";

const useCrudBooking = () => {
  const fetchAvailableRoom = async (
    persons,
    setRooms,
    arrivalDate,
    departureDate
  ) => {
    if (
      !persons ||
      typeof persons.adults !== "number" ||
      typeof persons.kids !== "number"
    ) {
      console.error(
        "Invalid input: persons object must have numeric 'adults' and 'kids' properties."
      );
      return;
    }

    try {
      const roomsRef = collection(db, "rooms");
      const q = query(
        roomsRef,
        where("adultCount", ">=", persons.adults), // Check room can accommodate required adults
        where("childCount", ">=", persons.kids) // Check room can accommodate required kids
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setRooms([]);
        return;
      }

      const allRooms = snapshot.docs.map((doc) => ({
        id: doc.id, // Include document ID if needed
        ...doc.data(),
      }));

      // Filter rooms based on availability for the selected dates
      const availableRooms = [];
      for (const room of allRooms) {
        const isAvailable = await checkRoomAvailability(
          room.id,
          arrivalDate,
          departureDate
        );
        if (isAvailable) {
          availableRooms.push(room);
        }
      }

      setRooms(availableRooms);
    } catch (error) {
      console.error("Error fetching available rooms:", error.message);
    }
  };

  const checkRoomAvailability = async (
    roomId,
    desiredCheckIn,
    desiredCheckOut
  ) => {
    console.log(desiredCheckIn, desiredCheckOut);
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("roomId", "==", roomId),
      where("status", "==", "Booked")
    );

    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const booking = doc.data();
      const existingCheckIn = moment(booking.checkInDate.toDate());
      const existingCheckOut = moment(booking.checkOutDate.toDate());

      // Check for overlap
      if (
        moment(desiredCheckIn).isBefore(existingCheckOut) &&
        moment(desiredCheckOut).isAfter(existingCheckIn)
      ) {
        return false; // Room is not available
      }
    }

    return true; // Room is available
  };

  const checkEventAvailability = async (desiredCheckIn, desiredCheckOut) => {
    console.log(desiredCheckIn, desiredCheckOut);
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("bookType", "==", "event"),
      where("status", "==", "Booked")
    );

    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const booking = doc.data();
      const existingCheckIn = moment(booking.checkInDate.toDate());
      const existingCheckOut = moment(booking.checkOutDate.toDate());

      // Check for overlap
      if (
        moment(desiredCheckIn).isBefore(existingCheckOut) &&
        moment(desiredCheckOut).isAfter(existingCheckIn)
      ) {
        return false; // Room is not available
      }
    }

    return true; // Room is available
  };

  const bookRoom = async (
    roomId,
    currentUser,
    checkInDate,
    checkOutDate,
    totalPrice,
    downpayment,
    paymentTerm,
    roomDetails
  ) => {
    // Convert input dates to Moment.js objects
    const desiredCheckIn = moment(checkInDate);
    const desiredCheckOut = moment(checkOutDate);

    const roomAvailable = await checkRoomAvailability(
      roomId,
      desiredCheckIn,
      desiredCheckOut
    );

    if (!roomAvailable) {
      throw new Error("Room is not available for the selected dates.");
    }

    const bookingsRef = collection(db, "bookings");

    const newBooking = {
      roomId,
      currentUser,
      checkInDate: desiredCheckIn.toDate(), // Save as Firebase-compatible Date object
      checkOutDate: desiredCheckOut.toDate(),
      status: "Booked",
      totalPrice,
      downpayment,
      paymentStatus: paymentTerm,
      roomDetails,
      createdAt: serverTimestamp(),
      bookType: "room",
    };

    const docRef = await addDoc(bookingsRef, newBooking);
    return docRef.id; // Return the booking ID
  };

  const bookEvent = async (
    currentUser,
    checkInDate,
    checkOutDate,
    totalPrice,
    downpayment,
    paymentTerm,
    roomDetails
  ) => {
    // Convert input dates to Moment.js objects
    const desiredCheckIn = moment(checkInDate);
    const desiredCheckOut = moment(checkOutDate);

    const roomAvailable = await checkEventAvailability(
      desiredCheckIn,
      desiredCheckOut
    );

    if (!roomAvailable) {
      throw new Error("Event is not available for the selected dates.");
    }

    const bookingsRef = collection(db, "bookings");

    const newBooking = {
      currentUser,
      checkInDate: desiredCheckIn.toDate(), // Save as Firebase-compatible Date object
      checkOutDate: desiredCheckOut.toDate(),
      status: "Booked",
      totalPrice,
      downpayment,
      paymentStatus: paymentTerm,
      roomDetails,
      createdAt: serverTimestamp(),
      bookType: "event",
    };

    const docRef = await addDoc(bookingsRef, newBooking);
    return docRef.id; // Return the booking ID
  };

  const fetchUserBooking = async (user, setBooking) => {
    const colRef = collection(db, "bookings");
    const q = query(
      colRef,
      where("currentUser.uid", "==", user.uid),
      where("status", "==", "Booked"),
      where("bookType", "==", "room")
    );
    const snapshot = await getDocs(q);
    const output = [];
    snapshot.docs.map((doc) => {
      output.push({ ...doc.data(), id: doc.id });
    });

    setBooking(output[0]);
  };

  const cancelBooking = async (id) => {
    try {
      const docRef = doc(db, "bookings", id);
      await deleteDoc(docRef);
      console.log("Fdkj");
    } catch (error) {
      console.log(error.message);
    }
  };

  const reschedBooking = async (id, checkInDate, checkOutDate, roomDetails) => {
    try {
      const docRef = doc(db, "bookings", id);
      const desiredCheckIn = moment(checkInDate);
      const desiredCheckOut = moment(checkOutDate);

      const days = calculateStayDuration(desiredCheckIn, desiredCheckOut).days;
      const totalPrice = parseInt(days) * parseInt(roomDetails?.pricePerNight);

      updateDoc(docRef, {
        checkInDate: desiredCheckIn.toDate(), // Save as Firebase-compatible Date object
        checkOutDate: desiredCheckOut.toDate(),
        totalPrice,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllBookings = async (setBooking) => {
    const colRef = collection(db, "bookings");
    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.map((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setBooking(output);
    });

    setBooking(output);
  };

  const updateBookingPayment = async (id, status) => {
    try {
      const docRef = doc(db, "bookings", id);
      updateDoc(docRef, {
        paymentStatus: status,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBooking = async (id) => {
    try {
      const docRef = doc(db, "bookings", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };
  const checkoutBooking = async (id) => {
    try {
      const docRef = doc(db, "bookings", id);
      await updateDoc(docRef, {
        status: "Completed",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchAvailableRoom,
    checkRoomAvailability,
    bookRoom,
    bookEvent,
    fetchUserBooking,
    cancelBooking,
    reschedBooking,
    fetchAllBookings,
    updateBookingPayment,
    deleteBooking,
    checkoutBooking,
    checkEventAvailability,
  };
};

export default useCrudBooking;
