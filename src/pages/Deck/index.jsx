import DragDropDashboard from "@/components/Features/DragDropColumns/DragDropDashboard";

export default function Deck() {
  return (
    <div className="bg-muted/20 flex h-screen w-full flex-col overflow-hidden">
      <DragDropDashboard />
    </div>
  );
}
