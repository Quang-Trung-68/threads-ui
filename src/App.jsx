import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@/App.css";
import { ROUTES } from "@/routes";
import { Toaster } from "sonner";
import ProtectedRoute from "@/components/Features/auth/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster
        richColors
        position="bottom-center"
        toastOptions={{
          classNames: {
            title: "text-lg font-medium",
            description: "text-lg text-muted-foreground",
          },
        }}
      />
      <Router>
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
      </Router>
    </>
  );
}

export default App;
