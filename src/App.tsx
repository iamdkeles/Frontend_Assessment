import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormWizard from "./components/FormWizard";
import UserList from "./components/UserList";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormWizard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
