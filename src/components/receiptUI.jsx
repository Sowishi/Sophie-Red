import React from "react";
import logo from "../assets/logo.png";
import { calculateStayDuration } from "../utils/calculateStay";

const ReceiptUI = ({ booking }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <div className="text-center border-b pb-4 mb-4">
        <div className="flex justify-center items-center">
          <img className="w-[200px]" src={logo} alt="Logo" />
        </div>
        <h2 className="text-xl font-bold">
          SOPHIERED HOTEL AND ONSHORE RESTAURANT
        </h2>
        <p className="text-sm">
          Purok 9 Bobontugan, 9003, Jasaan, Misamis Oriental, Philippines
        </p>
        <p className="text-sm">GRACE A. JARDIN - Prop.</p>
        <p className="text-sm">VAT REG. TIN: 254-650-511-0000</p>
      </div>

      <div className="mb-4">
        <p>
          <strong>RECEIVED FROM:</strong> {booking.currentUser.name}
        </p>

        <p>
          <strong>TIN:</strong> 123-456-789 <strong>OSCA/PWD NO:</strong> N/A
        </p>
        <p>
          <strong>Total Price: </strong>{" "}
          <span className="font-bold">₱{booking.totalPrice}</span>
        </p>
      </div>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">DESCRIPTION</th>
            <th className="border px-2 py-1">QTY</th>
            <th className="border px-2 py-1">UNIT PRICE</th>
            <th className="border px-2 py-1">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">
              Hotel Room ({booking.roomDetails.roomType})
            </td>
            <td className="border px-2 py-1 text-center">
              {
                calculateStayDuration(
                  booking?.checkInDate,
                  booking?.checkOutDate,
                  true
                ).days
              }{" "}
              day(s)
            </td>
            <td className="border px-2 py-1 text-right">
              {booking.roomDetails.pricePerNight}
            </td>
            <td className="border px-2 py-1 text-right">
              {booking.roomDetails.pricePerNight *
                calculateStayDuration(
                  booking?.checkInDate,
                  booking?.checkOutDate,
                  true
                ).days}
            </td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Extra Bed</td>
            <td className="border px-2 py-1 text-center">
              {booking?.extraCharge / 600} Bed(s)
            </td>
            <td className="border px-2 py-1 text-right">600</td>
            <td className="border px-2 py-1 text-right">
              {" "}
              {booking?.extraCharge}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 text-right">
        <p>
          <strong>Total Amount Due:</strong>{" "}
          <span className="font-bold"> ₱{booking?.totalPrice}</span>
        </p>
      </div>

      <div className="mt-6 text-center border-t pt-4">
        <p className="text-sm">AUTHORIZED SIGNATURE</p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default ReceiptUI;
