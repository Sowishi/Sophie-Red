import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import moment from "moment/moment";

const useCrudBooking = () => {
  const fetchAvailableRoom = async (persons, setRooms) => {
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
      }

      const availableRooms = snapshot.docs.map((doc) => ({
        id: doc.id, // Include document ID if needed
        ...doc.data(),
      }));

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
    };

    const docRef = await addDoc(bookingsRef, newBooking);
    return docRef.id; // Return the booking ID
  };

  const fetchUserBooking = async (user, setBooking) => {
    const colRef = collection(db, "bookings");
    const q = query(colRef, where("currentUser.uid", "==", user.uid));
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

  return {
    fetchAvailableRoom,
    checkRoomAvailability,
    bookRoom,
    fetchUserBooking,
    cancelBooking,
  };
};

export default useCrudBooking;
