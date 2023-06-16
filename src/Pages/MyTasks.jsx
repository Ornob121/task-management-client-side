import { Button, Modal, Table } from "react-bootstrap";
import useMyTask from "../Hooks/useMyTask";
import { FaCheck, FaScrewdriver, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MyTasks = () => {
  const [myTasks, refetch] = useMyTask();
  const navigate = useNavigate();
  //   console.log(myTasks[0].taskDetails.length);

  // ! Confirm task complete
  const handleCompleteTask = (id) => {
    Swal.fire({
      title: "Are you sure You want to make this task completed?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I am Sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://task-management-server-theta.vercel.app/task/${id}`)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire(
                "Confirmed!",
                "Your task has been completed.",
                "success"
              );
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  //! Delete Task
  const handleDeleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://task-management-server-theta.vercel.app/task/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire("Deleted!", "Your task has been deleted.", "success");
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (myTasks.length === 0) {
    return (
      <h2 className="text-center fs-1 my-5 text-info">
        You Do Not Have Any Task Now.
        <br /> Add A New Task To See Your Tasks
      </h2>
    );
  }

  return (
    <div>
      <h2 className="text-center py-5">Here Are All The Tasks You Added</h2>
      <Table responsive className="mx-auto" style={{ width: "80%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Task Status</th>
            <th>Task Details</th>
            <th>Date Added</th>
            <th>Mark As Completed</th>
            <th>Update Task</th>
            <th>Delete Task</th>
          </tr>
        </thead>
        <tbody>
          {myTasks.map((task, i) => (
            <tr key={task._id}>
              <td>{i + 1}</td>
              <td>{task.taskName}</td>
              <td>{task.taskStatus}</td>
              <td>
                {task.taskDetails.length > 30 ? (
                  <div>
                    {task.taskDetails.slice(0, 30)}
                    <span
                      className="text-primary cursor-pointer"
                      onClick={handleShow}
                    >
                      ...Read More
                    </span>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Task Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>{task.taskDetails}</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                ) : (
                  task.taskDetails
                )}
              </td>
              <td>{task.taskAddingTime.slice(0, 10)}</td>
              <td>
                <button
                  disabled={task.taskStatus === "Completed"}
                  onClick={() => handleCompleteTask(task._id)}
                >
                  Mark As Complete <FaCheck className="text-success" />
                </button>
              </td>
              <td>
                <button onClick={() => navigate(`/my-tasks/${task._id}`)}>
                  Update Task <FaScrewdriver className="text-primary" />
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteTask(task._id)}>
                  Delete <FaTrashAlt className="text-danger" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      ;
    </div>
  );
};

export default MyTasks;
