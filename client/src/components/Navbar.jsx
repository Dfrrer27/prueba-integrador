import { arrows, feedback, help, logo, logout, profile, search, setting } from '../ImportImages';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useAuthStore } from "../store/auth";
import './styles/navbar-styles.css'

export const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  const toggleTheme = () => {
    const updatedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(updatedTheme);
    localStorage.setItem('theme', updatedTheme);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);


  const { isAuth } = useAuthStore()

  function logOutFun() {
    useAuthStore.getState().logout()
    window.location.href = '/login'
  }

  return (
    <>

      {isAuth ? (
        <>
          <nav>
            <Link className="nav-left" to='/'>
              <img src={logo} alt="Logo-TalkTec" className="logo" />  
              <h2>TalkTec</h2>
            </Link>

            <div className="search-box">
                <img src={search}  />
                <input type="text" placeholder="Search" />
            </div>

            {/* aqui es el profile */}
          
            <div className="nav-right">

              <div className={`nav-user-icon online ${menuOpen ? 'settings-menu-height' : ''}`} onClick={toggleMenu}> {/* modificar onclick = onclick="settingsMenuToggle()" */}
                <img src={profile} />
              </div>
                
              {/* settings menu */}

              <div className={`settings-menu ${menuOpen   ? 'settings-menu-height' : ''}`}>

                <div id="dark-btn" className={`dark-btn ${theme === 'dark' ? 'dark-btn-on' : ''}`} onClick={toggleTheme}>
                  <span></span>
                </div>

                <div className="settings-menu-inner">

                  <div className="user-profile">
                    <img src={profile} />
                      <div>
                        <p>Diego Ferrer</p>
                        <a href="#">See your profile</a>
                      </div>
                  </div>

                  <hr />

                  <div className="user-profile">
                    <img src={feedback} />
                      <div>
                        <p>Diego Ferrer</p>
                        <a href="#">Ver mi perfil</a>
                      </div>
                  </div>

                  <hr />

                  <div className="settings-links">
                    <img src={setting} className="settings-icon" />
                    <a href="#">Configuración <img src={arrows} width="10px" /></a>
                  </div>

                  <div className="settings-links">
                    <img src={help} className="settings-icon" />
                      <a href="#">Ayuda<img src={arrows} width="10px" /></a>
                  </div>

                  <div className="settings-links">
                    <img src={logout} className="settings-icon" />
                    <span onClick={logOutFun}>Logout</span>
                  </div>

                </div>
                  
              </div>
            
            </div>
        
          </nav>
        </>

      ): (
        <>
          
        </>
      )}

    </>
  )
}
