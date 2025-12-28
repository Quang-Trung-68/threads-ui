import { Loading } from "../../Common/Loading/Loading";
import { Navigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import { PATHS } from "@/configs/paths";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, isError } = useAuth();
  console.log(user);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !user) return <Navigate to={PATHS.HOME} />;
  if (user && !user.verified)
    return <Navigate to={PATHS.REQUIRE_VERIFIED_EMAIL} />;

  return children;
};

export default ProtectedRoute;
