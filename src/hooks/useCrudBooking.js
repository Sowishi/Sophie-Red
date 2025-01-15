import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

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

  return { fetchAvailableRoom };
};

export default useCrudBooking;
