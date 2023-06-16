import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMyTask = () => {
  const {
    data: tasks = [],
    refetch,
    isLoading: isTaskLoading,
  } = useQuery({
    queryKey: ["tasks", localStorage.getItem("database")],
    enabled: !!localStorage.getItem("database"),
    queryFn: async () => {
      const response = await axios.get(
        `https://task-management-server-theta.vercel.app/tasks?localId=${localStorage.getItem(
          "database"
        )}`
      );
      //   console.log(response.data);
      return response.data;
    },
  });
  return [tasks, refetch, isTaskLoading];
};

export default useMyTask;
