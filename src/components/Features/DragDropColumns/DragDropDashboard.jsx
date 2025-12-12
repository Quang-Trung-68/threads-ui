import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Common/ui/dropdown-menu";
import { Button } from "@/components/Common/ui/button";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

// --- IMPORT CÁC PAGE CỦA BẠN ---
// TODO: Thay đổi đường dẫn import cho phù hợp với cấu trúc project của bạn
// import Posts from './pages/Posts';
// import PostDetail from './pages/PostDetail';
// import UserProfile from './pages/UserProfile';
// import Search from './pages/Search';
// ... các page khác

// --- PLACEHOLDER COMPONENTS (XÓA KHI ĐÃ IMPORT ĐÚNG) ---
const Posts = ({ onNavigate, state }) => (
  <div>
    <h3 className="mb-4 text-lg font-bold">📝 Posts</h3>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((id) => (
      <div
        key={id}
        className="mb-3 cursor-pointer rounded border p-3 hover:bg-gray-50"
        onClick={() => onNavigate("PostDetail", { postId: id })}
      >
        <h4 className="font-semibold">Post Title {id}</h4>
        <p className="text-sm text-gray-600">Click to view detail...</p>
      </div>
    ))}
  </div>
);

const PostDetail = ({ onNavigate, state }) => (
  <div>
    <button
      onClick={() => onNavigate("Posts")}
      className="mb-4 text-sm text-blue-600 hover:underline"
    >
      ← Back to Posts
    </button>
    <h3 className="mb-4 text-lg font-bold">📄 Post Detail #{state?.postId}</h3>
    <div className="mb-4 rounded border p-3">
      <p className="mb-2">Post content here...</p>
      <p className="text-sm text-gray-600">Author: John Doe</p>
    </div>
    <button
      onClick={() =>
        onNavigate("UserProfile", { userId: 123, userName: "John Doe" })
      }
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      View Author Profile
    </button>
  </div>
);

const UserProfile = ({ onNavigate, state }) => (
  <div>
    <h3 className="mb-4 text-lg font-bold">👤 User Profile</h3>
    {state && (
      <div className="mb-4 rounded border border-blue-200 bg-blue-50 p-3">
        <p className="font-semibold">User ID: {state.userId}</p>
        <p className="font-semibold">Name: {state.userName}</p>
      </div>
    )}
    <div className="space-y-2">
      <p>
        Email: {state?.userName?.toLowerCase().replace(" ", ".")}@example.com
      </p>
      <p>Bio: Software developer and content creator</p>
    </div>
    <button
      onClick={() => onNavigate("Posts")}
      className="mt-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
    >
      View Posts
    </button>
  </div>
);

const Search = ({ onNavigate, state }) => (
  <div>
    <h3 className="mb-4 text-lg font-bold">🔍 Search</h3>
    <input
      type="text"
      placeholder="Search..."
      className="mb-4 w-full rounded border px-3 py-2"
    />
    <div className="space-y-2">
      {[1, 2, 3].map((id) => (
        <div
          key={id}
          className="cursor-pointer rounded border p-2 hover:bg-gray-50"
          onClick={() => onNavigate("PostDetail", { postId: id + 100 })}
        >
          Search Result {id}
        </div>
      ))}
    </div>
  </div>
);
// --- END PLACEHOLDER COMPONENTS ---

// --- 1. CONFIG & UTILS ---
// Định nghĩa các loại column và component khởi tạo của chúng
const COLUMN_TYPES = [
  {
    type: "posts",
    label: "📝 Posts",
    initialComponent: "Posts", // Component khởi đầu khi tạo column
  },
  {
    type: "search",
    label: "🔍 Search",
    initialComponent: "Search",
  },
  {
    type: "profile",
    label: "👤 Profile",
    initialComponent: "UserProfile",
  },
];

// Registry chứa TẤT CẢ các component có thể render
// Mỗi column có thể navigate đến bất kỳ component nào trong registry này
const COMPONENT_REGISTRY = {
  Posts: Posts,
  PostDetail: PostDetail,
  UserProfile: UserProfile,
  Search: Search,
  // Thêm các component khác ở đây
};

const generateId = () =>
  `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// --- 2. COLUMN CONTENT WITH DYNAMIC ROUTING ---
const InnerColumnContent = ({ navigation, onNavigate }) => {
  const current = navigation.history[navigation.currentIndex];
  const currentComponentName = current.componentName;
  const currentState = current.state;

  const canGoBack = navigation.currentIndex > 0;
  const canGoForward = navigation.currentIndex < navigation.history.length - 1;

  const handleNavigate = (componentName, state = null) => {
    onNavigate("push", componentName, state);
  };

  const handleBack = () => {
    if (canGoBack) onNavigate("back");
  };

  const handleForward = () => {
    if (canGoForward) onNavigate("forward");
  };

  // Lấy component từ registry
  const CurrentComponent = COMPONENT_REGISTRY[currentComponentName];

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Navigation Bar - Chỉ hiển thị Back/Forward */}
      <div className="border-b border-gray-200 bg-gray-50 p-2.5">
        {/* Back/Forward buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            className="rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
            title="Back"
          >
            ← Back
          </button>
          <button
            onClick={handleForward}
            disabled={!canGoForward}
            className="rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
            title="Forward"
          >
            Forward →
          </button>

          <div className="ml-auto text-xs text-gray-500">
            {currentComponentName} ({navigation.currentIndex + 1}/
            {navigation.history.length})
          </div>
        </div>
      </div>

      {/* Content Area - Render Component động */}
      <SimpleBar className="max-h-120 flex-1">
        <div className="p-4">
          {CurrentComponent ? (
            <CurrentComponent
              onNavigate={handleNavigate}
              state={currentState}
              navigation={navigation}
            />
          ) : (
            <div className="text-center text-red-600">
              <h3 className="text-lg font-bold">⚠️ Component not found</h3>
              <p className="mt-2 text-sm">
                Component "{currentComponentName}" không tồn tại trong registry
              </p>
              <button
                onClick={() => handleNavigate("Posts")}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Go to Posts
              </button>
            </div>
          )}
        </div>
      </SimpleBar>
    </div>
  );
};

// --- 3. SORTABLE COLUMN COMPONENT ---
const SortableColumn = ({
  id,
  type,
  index,
  navigation,
  onNavigate,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const canRemove = index !== 0;

  // Lấy label từ type
  const columnTypeInfo = COLUMN_TYPES.find((ct) => ct.type === type);
  const columnLabel = columnTypeInfo?.label || `Widget ${index + 1}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative h-150 max-w-100 min-w-100 flex-1 flex-col gap-2 rounded-lg border border-gray-200 bg-white ${
        isDragging ? "opacity-80 shadow-2xl" : "shadow-md"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex cursor-grab items-center justify-between bg-linear-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-white select-none"
      >
        <span className="font-bold">:: {columnLabel}</span>

        {canRemove && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onRemove(id)}
            className="cursor-pointer border-none bg-transparent px-1.5 py-0 text-base leading-none text-white transition-colors hover:text-red-200"
            title="Đóng cột này"
          >
            ✕
          </button>
        )}
      </div>

      <div className="relative w-100 flex-1">
        <InnerColumnContent
          navigation={navigation}
          onNavigate={(action, componentName, state) =>
            onNavigate(id, action, componentName, state)
          }
        />
      </div>
    </div>
  );
};

// --- 4. COMPONENT NÚT THÊM (+) & MENU ---
const AddColumnButton = ({ onAdd }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-2 border-dashed border-gray-400 hover:border-blue-600 hover:text-blue-600"
        >
          <span className="text-2xl">+</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuLabel className="text-xs text-gray-500">
          THÊM CỘT
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {COLUMN_TYPES.map((item) => (
          <DropdownMenuItem
            key={item.type}
            onClick={() => onAdd(item.type)}
            className="cursor-pointer"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// --- 5. COMPONENT CHÍNH (APP) ---
export default function DragDropDashboard() {
  const [columns, setColumns] = useState([
    {
      id: "col-default",
      type: "posts",
      navigation: {
        history: [{ componentName: "Posts", state: null }],
        currentIndex: 0,
      },
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddColumn = (type) => {
    // Tìm component khởi tạo từ config
    const columnConfig = COLUMN_TYPES.find((ct) => ct.type === type);
    const initialComponent = columnConfig?.initialComponent || "Posts";

    const newCol = {
      id: generateId(),
      type,
      navigation: {
        history: [{ componentName: initialComponent, state: null }],
        currentIndex: 0,
      },
    };
    setColumns([...columns, newCol]);
  };

  const handleRemoveColumn = (idToRemove) => {
    setColumns(columns.filter((col) => col.id !== idToRemove));
  };

  const handleNavigate = (columnId, action, componentName, state = null) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (col.id !== columnId) return col;

        const nav = col.navigation;

        if (action === "push") {
          // Thêm component mới vào history với state
          const newHistory = [
            ...nav.history.slice(0, nav.currentIndex + 1),
            { componentName, state },
          ];
          return {
            ...col,
            navigation: {
              history: newHistory,
              currentIndex: newHistory.length - 1,
            },
          };
        } else if (action === "back") {
          // Quay lại component trước
          return {
            ...col,
            navigation: {
              ...nav,
              currentIndex: Math.max(0, nav.currentIndex - 1),
            },
          };
        } else if (action === "forward") {
          // Đi tới component tiếp theo
          return {
            ...col,
            navigation: {
              ...nav,
              currentIndex: Math.min(
                nav.history.length - 1,
                nav.currentIndex + 1,
              ),
            },
          };
        }

        return col;
      }),
    );
  };

  return (
    <div className="max-h-dvh">
      <SimpleBar>
        <div className="flex items-center justify-center-safe">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={columns.map((c) => c.id)}
              strategy={horizontalListSortingStrategy}
            >
              {columns.map((col, index) => (
                <SortableColumn
                  key={col.id}
                  id={col.id}
                  type={col.type}
                  index={index}
                  navigation={col.navigation}
                  onNavigate={handleNavigate}
                  onRemove={handleRemoveColumn}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className="ml-2.5">
            <AddColumnButton onAdd={handleAddColumn} />
          </div>
        </div>
      </SimpleBar>
    </div>
  );
}
