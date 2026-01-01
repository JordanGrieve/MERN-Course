import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const isMobile = false;
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup className="flex-1 flex height-full overflow-hidden p-2">
        {/* Left Bar */}
        <ResizablePanel
          defaultSize={100}
          minSize={isMobile ? 0 : 10}
          maxSize={100}
        >
          Left Sidebardsdadsadad
        </ResizablePanel>

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        {/* Right Bar */}
        <ResizablePanel
          defaultSize={40}
          minSize={0}
          maxSize={40}
          collapsedSize={0}
        >
          Right Sidebar
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default MainLayout;
