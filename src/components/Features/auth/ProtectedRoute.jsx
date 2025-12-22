import { Loading } from "../../Common/Loading/Loading";
import { Navigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import { PATHS } from "@/configs/paths";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, isError, isSuccess, isFetching } = useAuth();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError || !isSuccess || !user) return <Navigate to={PATHS.LOGIN} />;

  if (user && !user.verified)
    return <Navigate to={PATHS.REQUIRE_VERIFIED_EMAIL} />;

  return children;
};

export default ProtectedRoute;
