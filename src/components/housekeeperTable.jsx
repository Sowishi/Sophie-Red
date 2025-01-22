import { Button, Table } from "flowbite-react";
import useCrudHousekeeping from "../hooks/useCrudHousekeeping";
import { useEffect, useState } from "react";
import useUserStore from "../utils/zustand";
import Loader from "./loader";
import moment from "moment";

const HousekeeperTable = () => {
  const { fetchUserTasks } = useCrudHousekeeping();
  const [tasks, setTasks] = useState(null);
  const { currentAdmin } = useUserStore();

  useEffect(() => {
    fetchUserTasks(currentAdmin?.id, setTasks);
  }, []);

  if (tasks == null) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <Table hoverable striped>
      <Table.Head>
        <Table.HeadCell>Assign Date</Table.HeadCell>
        <Table.HeadCell>Housekeeper</Table.HeadCell>
        <Table.HeadCell>Service Type</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Completed At</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {tasks.map((task) => {
          const assignDate = task.createdAt
            ? moment(task.createdAt.toDate()).format("LLL")
            : "invalid";

          const completedDate = task.completedAt
            ? moment(task.completedAt.toDate()).format("LLL")
            : "invalid";
          return (
            <Table.Row key={task.id}>
              <Table.Cell>{assignDate}</Table.Cell>
              <Table.Cell>{task.housekeeper.fullName}</Table.Cell>
              <Table.Cell>{task.serviceType}</Table.Cell>
              <Table.Cell>{task.description}</Table.Cell>
              <Table.Cell>
                {task.completedAt ? completedDate : "---"}
              </Table.Cell>
              <Table.Cell>
                <Button>Complete Tasks</Button>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default HousekeeperTable;
