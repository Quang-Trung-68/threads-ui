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
          const basePath = router.basePath;
          const layoutProps = router.props || {};

          // If layout has a basePath, use it as the parent path
          if (basePath) {
            return (
              <Route key={index} path={basePath} element={<Layout {...layoutProps} />}>

                {router.children.map((child, childIndex) => {
                  const Element = child.element;
                  const isPrivate = child.private;

                  if (!Element) return null;

                  // Use relative path (remove leading /)
                  const relativePath = child.path.startsWith('/')
                    ? child.path.substring(1)
                    : child.path;

                  if (!isPrivate)
                    return (
                      <Route
                        key={childIndex}
                        path={relativePath}
                        element={<Element />}
                      />
                    );
                  return (
                    <Route
                      key={childIndex}
                      path={relativePath}
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
          }

          return (
            <Route key={index} element={<Layout />}>
              {router.children.map((child, childIndex) => {
                const Element = child.element;
                const isPrivate = child.private;

                // Skip routes with null element (rendered directly in layout)
                if (!Element) return null;

                if (!isPrivate)
                  return (
                    <Route
                      key={childIndex}
                      path={child.path}
                      element={<Element />}
                    />
                  );
                return (
                  <Route
                    key={childIndex}
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
