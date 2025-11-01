import "./App.css";
import { ListManager } from "./components/ListManager";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="flex justify-center ">
      <ListManager />
      <Toaster />
    </div>
  );
}

export default App;
