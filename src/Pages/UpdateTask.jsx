import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetch(`https://task-management-server-theta.vercel.app/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, [id]);
  //   console.log(task);

  const onSubmit = (data) => {
    if (data.taskStatus === "Select One") {
      return setError("You Have To Select Your Task Status");
    }
    setError("");
    axios
      .patch(
        `https://task-management-server-theta.vercel.app/updateTask/${task._id}`,
        data
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your task has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2 className="text-center py-5">Update Your Task</h2>
      <div className="pb-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-4 w-75 mx-auto">
            <label className="fs-5 mb-3" htmlFor="">
              Task Name
            </label>
            <br />
            <input
              className="py-2 w-100 fs-5"
              type="text"
              defaultValue={task?.taskName}
              {...register("taskName", { required: true })}
            />
          </div>
          <div className="py-2 w-75 mx-auto">
            <label className="fs-5 mb-3" htmlFor="">
              Task Status
            </label>
            <br />
            <select
              name="status"
              id=""
              defaultValue={task?.taskStatus}
              className="py-2 w-100"
              {...register("taskStatus", { required: true })}
            >
              <option value="Select One">Select One</option>
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
            </select>
            <p className="text-danger">{error}</p>
          </div>
          <div className="py-4 w-75 mx-auto">
            <label className="fs-5 mb-3" htmlFor="">
              Task Details
            </label>
            <br />
            <textarea
              name="details"
              id=""
              cols="30"
              rows="5"
              defaultValue={task?.taskDetails}
              className="w-100"
              {...register("taskDetails", { required: true })}
            ></textarea>
          </div>
          <div className="text-center">
            <button className="py-2 px-5 bg-success text-white border-0 mb-2 rounded">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
