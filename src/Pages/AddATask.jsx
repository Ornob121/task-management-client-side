import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddATask = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    data.localId = localStorage.getItem("database");
    data.taskAddingTime = new Date();
    if (data.taskStatus === "Select One") {
      return setError("You Have To Select Your Task Status");
    }
    setError("");
    axios
      .post("https://task-management-server-theta.vercel.app/tasks", data)
      .then((res) => {
        if (res.data.acknowledged) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-light pb-5">
      <div className="py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4 w-75 mx-auto">
            <label className="fs-5 mb-3" htmlFor="">
              Task Name
            </label>
            <br />
            <input
              className="py-2 w-100 fs-5"
              type="text"
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
              className="w-100"
              {...register("taskDetails", { required: true })}
            ></textarea>
          </div>
          <div className="text-center">
            <button className="py-2 px-5 bg-info border-0 mb-2 rounded">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddATask;
