import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddATask from "../Pages/AddATask";
import MyTasks from "../Pages/MyTasks";
import UpdateTask from "../Pages/UpdateTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <MyTasks />,
      },
      {
        path: "/my-tasks/:id",
        element: <UpdateTask />,
      },
      {
        path: "/add-a-task",
        element: <AddATask />,
      },
    ],
  },
]);

export default router;
