"use client";

import { Table, Select, Checkbox } from "flowbite-react";
import { useEffect, useState } from "react";
import moment from "moment";
import Loader from "./loader";
import useFetchCollection from "../hooks/useFetchCollection";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export function FeedbackTable() {
  const { fetchCollection } = useFetchCollection();
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [filterRating, setFilterRating] = useState("all");
  const [selectedFeedbacks, setSelectedFeedbacks] = useState({});

  useEffect(() => {
    fetchCollection(
      "feedback",
      (data) => {
        setFeedbacks(data);
        setFilteredFeedbacks(data);
      },
      setLoading
    );
  }, []);

  const handleFilterChange = (rating) => {
    setFilterRating(rating);
    if (rating === "all") {
      setFilteredFeedbacks(feedbacks);
    } else {
      setFilteredFeedbacks(
        feedbacks.filter((f) => f.rating.toString() === rating)
      );
    }
  };

  const handleCheckboxChange = async (feedback) => {
    const feedbackRef = doc(db, "feedback", feedback.id);
    const newStatus = !selectedFeedbacks[feedback.id];

    try {
      await updateDoc(feedbackRef, { posted: newStatus });
      setSelectedFeedbacks((prev) => ({
        ...prev,
        [feedback.id]: newStatus,
      }));
      console.log(`Feedback ${feedback.id} updated: posted = ${newStatus}`);
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const renderStars = (rating) => {
    const fullStar = <span style={{ color: "gold" }}>★</span>;
    const emptyStar = <span style={{ color: "lightgray" }}>☆</span>;
    return (
      <>
        {Array.from({ length: rating }, (_, i) => (
          <span key={`full-${i}`}>{fullStar}</span>
        ))}
        {Array.from({ length: 5 - rating }, (_, i) => (
          <span key={`empty-${i}`}>{emptyStar}</span>
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <div className="flex h-full justify-center items-center flex-col pt-28">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 overflow-x-aut shadow-2xl">
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="filter-rating" className="font-medium">
          Filter by Rating:
        </label>
        <Select
          id="filter-rating"
          value={filterRating}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="w-40"
        >
          <option value="all">All Ratings</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating} Star{rating > 1 && "s"}
            </option>
          ))}
        </Select>
      </div>

      <Table hoverable striped className="mt-4">
        <Table.Head>
          <Table.HeadCell>Post</Table.HeadCell>
          <Table.HeadCell>Customer Name</Table.HeadCell>
          <Table.HeadCell>Rating</Table.HeadCell>
          <Table.HeadCell className="w-[300px]">Remarks</Table.HeadCell>
          <Table.HeadCell>Room Info</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredFeedbacks && filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feedback) => (
              <Table.Row key={feedback.id} className="bg-white">
                <Table.Cell>
                  <Checkbox
                    checked={feedback.posted}
                    onChange={() => handleCheckboxChange(feedback)}
                  />
                </Table.Cell>
                <Table.Cell className="font-bold text-lg text-red-500">
                  <div className="flex items-center justify-start">
                    <img
                      width={35}
                      className="rounded-full mr-2"
                      src={feedback.currentUser?.photoURL}
                      alt=""
                    />
                    {feedback.currentUser.name}
                  </div>
                </Table.Cell>
                <Table.Cell>{renderStars(feedback.rating)}</Table.Cell>
                <Table.Cell className="w-[300px] whitespace-normal">
                  {feedback.remarks}
                </Table.Cell>
                <Table.Cell>
                  <p>Room #: {feedback.room.roomNumber}</p>
                </Table.Cell>
                <Table.Cell>
                  {moment.unix(feedback.createdAt.seconds).format("LLL")}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={6} className="text-center">
                No feedback available.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
