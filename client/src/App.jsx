import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Services";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Error } from "./pages/Error";
import { AdminLayout } from "./components/layouts/AdminLayout";
import { Useradmin } from "./pages/Useradmin";
import { Contactadmin } from "./pages/Contactadmin";
import Navbar from "./components/Navbar";
import Footer from "./components/footer/Footer";
import { Edituser } from "./pages/Edituser";

const App = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/services" element={<Service />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element = {<Useradmin/>}/>
          <Route path="contacts" element = {<Contactadmin />}/>
          <Route path="users/:id/edit" element ={<Edituser />}/>
        </Route>
        {/* default page/wildcard */}
        <Route path="*" element={<Error />}></Route> 
        
      </Routes>
      <Footer />
    </BrowserRouter>
  </>;
}

export default App;