import { Link, useNavigate, Navigate } from "react-router-dom";
import { loginRequest } from "../../api/users";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../store/auth";
import { Helmet } from "react-helmet";
import "./styles/auth-styles.css";
import { logo } from '../../ImportImages';

export function LoginPage() {

  const navigate = useNavigate();
  const { isAuth } = useAuthStore();
  const setToken = useAuthStore((state) => state.setToken);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const loginMutation = useMutation({
    mutationFn: () => loginRequest(email, password),
    onSuccess: (response) => {
      setToken(response.data.access, response.data.refresh)
      toast.success("Inicio de Sesión exitoso!")
      navigate("/home")
      setLoading(false); // Desactiva el loader después de la navegación
    },
    onError: (error) => {
      toast.error("Hubo un error, intenta de nuevo")
      console.error(error)
      setLoading(false); // Desactiva el loader en caso de error
    }
})

// Si las contraseñas coinciden ejecutamos la constante registerMutation
const handleSubmit = (event) => {
  event.preventDefault()
    setLoading(true);
    loginMutation.mutate()
}

if (loading) { 
  return <div className="loader-content"> <span className="loader"></span> </div>
}

if (isAuth) { 
  return (<Navigate to="/home"/>) 
}

  return (
    <div className="body">

      <Helmet>
        <title>TalkTec | Login</title>
      </Helmet>

      <div className="container" id="container">
        <div className="form-container sign">
            <form onSubmit={handleSubmit}>
                <h1 className="form-container--sign">Iniciar sesión</h1>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email" name="email" id="email" placeholder="name@company.com"/>

                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password" name="password" id="password" placeholder="••••••••"/>

                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-right">
                    <h1>TALK TEC</h1>
                    <img src={logo} className="toggle-panel-img" />
                    <p>
                      No tienes una cuenta? <Link to={'/register'}>Registrate</Link>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}