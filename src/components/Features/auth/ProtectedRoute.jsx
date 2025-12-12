import { Loading } from "../../Common/Loading/Loading";
import { Navigate } from "react-router";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, isError, isSuccess, isFetching } = useAuth();
  if (isLoading || isFetching) {
    return <Loading />;
  }
  if (isError || !isSuccess || !user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
