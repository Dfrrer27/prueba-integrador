import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Toaster } from 'react-hot-toast'; // para las autentificaciones

export function Layout() {
  return (
    <>
        <Toaster />
        <Navbar />
        <div>
            <Outlet />
        </div>
    </>
  )
}
