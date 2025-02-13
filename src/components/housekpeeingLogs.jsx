import { useState } from "react";
import { Alert, Badge, Table, TextInput, Button } from "flowbite-react";
import moment from "moment";

const HousekeepingLogs = ({ logs }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredLogs = logs.filter((log) => {
    const logDate = log?.createdAt ? moment(log.createdAt.toDate()) : null;
    const start = startDate ? moment(startDate) : null;
    const end = endDate ? moment(endDate).endOf("day") : null;

    if (!logDate) return false;
    if (start && logDate.isBefore(start)) return false;
    if (end && logDate.isAfter(end)) return false;

    return true;
  });

  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <TextInput
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <TextInput
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <Button
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
        >
          Reset
        </Button>
      </div>
      {filteredLogs.length >= 1 ? (
        <Table hoverable striped>
          <Table.Head>
            <Table.HeadCell>Assign Date</Table.HeadCell>
            <Table.HeadCell>Housekeeper</Table.HeadCell>
            <Table.HeadCell>Service Type</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Completed At</Table.HeadCell>
            <Table.HeadCell>Remarks</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredLogs.map((log) => {
              const assignDate = log?.createdAt
                ? moment(log.createdAt.toDate()).format("LLL")
                : "invalid";
              const completedDate = log?.completedAt
                ? moment(log.completedAt.toDate()).format("LLL")
                : "invalid";
              return (
                <Table.Row key={log?.id}>
                  <Table.Cell>{assignDate}</Table.Cell>
                  <Table.Cell>{log?.housekeeper?.fullName}</Table.Cell>
                  <Table.Cell>{log?.serviceType}</Table.Cell>
                  <Table.Cell>{log?.description}</Table.Cell>
                  <Table.Cell>
                    {log?.completedAt ? completedDate : "---"}
                  </Table.Cell>
                  <Table.Cell>{log?.remarks || "---"}</Table.Cell>
                  <Table.Cell>
                    <Badge>{log?.status}</Badge>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <Alert color="failure">There's no logs to show</Alert>
      )}
    </>
  );
};

export default HousekeepingLogs;
