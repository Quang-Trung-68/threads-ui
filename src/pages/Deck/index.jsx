import DragDropDashboard from "@/components/Features/DragDropColumns/DragDropDashboard";
import { useLocation } from "react-router";

export default function Deck() {
  const location = useLocation();
  const pageType = location.state.pageType;
  return (
    <div className="bg-muted/20 flex h-screen w-full flex-col overflow-hidden">
      <DragDropDashboard pageType={pageType} />
    </div>
  );
}
