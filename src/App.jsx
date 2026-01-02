import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/routes";
import { Toaster } from "sonner";
import ProtectedRoute from "@/components/Features/auth/ProtectedRoute";
import SplashScreen from "./components/Common/SplashScreen";
import "@/App.css";

function App() {
  return (
    <>
      <SplashScreen duration={1000} />
      <Toaster
      expand={true}
        richColors
        position="bottom-center"
        toastOptions={{
          classNames: {
            title: "text-[15px] font-medium",
            description: "text-lg text-muted-foreground",
          },
        }}
      />
      <Routes>
        {ROUTES.map((router, index) => {
          const Layout = router.layout;
          return (
            <Route key={index} element={<Layout />}>
              {router.children.map((child, index) => {
                const Element = child.element;
                const isPrivate = child.private;
                if (!isPrivate)
                  return (
                    <Route
                      key={index}
                      path={child.path}
                      element={<Element />}
                    />
                  );
                return (
                  <Route
                    key={index}
                    path={child.path}
                    element={
                      <ProtectedRoute>
                        <Element />
                      </ProtectedRoute>
                    }
                  />
                );
              })}
            </Route>
          );
        })}
      </Routes>
    </>
  );
}

export default App;
