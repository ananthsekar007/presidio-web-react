import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminLogin } from "./pages/AdminLogin";
import Entry from "./pages/Entry";
import Appointments from "./pages/Appointments";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { AdminVaccinationCenters } from "./pages/AdminVaccinationCenters";
import { ActiveAppointments } from "./pages/ActiveAppointments";
import { InActiveAppointments } from "./pages/InActiveAppointments";

const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/appointments" element={<Appointments />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/centers" element={<AdminVaccinationCenters />} />
          <Route
            path="/user/active-appointments"
            element={<ActiveAppointments />}
          />
          <Route
            path="/user/inactive-appointments"
            element={<InActiveAppointments />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
