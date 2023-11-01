import { Link, useNavigate, Navigate } from "react-router-dom";
import { registerRequest } from "../../api/users";
import { useMutation } from "@tanstack/react-query";
import { useEffect ,useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../store/auth";
import { axi } from '../../api/useAxios';
import "./styles/auth-styles.css";
import { logo } from '../../ImportImages';

export function RegisterPage() {

  const navigate = useNavigate();
  const { isAuth } = useAuthStore();

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [degree, setDegree] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  useEffect(() => {
    // Realiza una solicitud para obtener la lista de carreras desde Django
    axi.get('/users/departments/') // ruta relativa
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const registerMutation = useMutation({
    mutationFn: () => registerRequest(code, email, name, last_name, degree, password),
    onSuccess: () => {
      toast.success("Registro exitoso!")
      navigate("/login")
      setLoading(false); // Desactiva el loader después de la navegación
    },
    onError: (error) => {
      toast.error("Hubo un error, intenta de nuevo")
      console.error(error)
      setLoading(false); // Desactiva el loader en caso de error
    }
})

const handleMatch = () => {
  if (password !== re_password) {
    return false
  } else {
    return true
  }
}

// Si las contraseñas coinciden ejecutamos la constante registerMutation
const handleSubmit = (event) => {
  event.preventDefault()
  if (password !== re_password) {
    toast.error("Las contraseñas deben coincidir")
  } else {
    setLoading(true);
    registerMutation.mutate()
  }
}

if (loading) { 
  return <div className="loader-content"> <span className="loader"></span> </div>
}

if (isAuth) { 
  return (<Navigate to="/home"/>) 
}

  return (
    <div className="body">

      <div className="container" id="container">

        <div className="form-container sign" onSubmit={handleSubmit}>
          <form>
              <h1 className="form-container--sign">Regístrate</h1>
              
              <input
              value={code}
              onChange={(e) => setCode(e.target.value)} 
              type="code" name="code" id="code" placeholder="123456"/>

              <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
              type="email" name="email" id="email" placeholder="name@email.com"/>

              <input 
              value={name}
              onChange={(e) => setName(e.target.value)}  
              type="name" name="name" id="name" placeholder="Diego"/>

              <input
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}   
              type="last_name" name="last_name" id="last_name" placeholder="Ferrer"/>

              <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              name="degree"
              id="degree"
              >
                <option value="">Selecciona una carrera</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name_depart}
                  </option>
                ))}
              </select>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}   
                type="password" name="password" id="password" placeholder="••••••••" />    

              <input
                value={re_password}
                onChange={(e) => setRePassword(e.target.value)}   
                type="password" name="re-password" id="re-password" placeholder="••••••••" />

              { handleMatch() ? null : (<p className="handleMatch">Las contraseñas deben coincidir</p>) }

              <button type="submit" >Registrate</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h1>TALK TEC</h1>
              <img src={logo} className="toggle-panel-img" />
              <p>¿Tiene una cuenta? <Link to={'/login'}>Iniciar sesión</Link></p>
            </div>
          </div>
        </div>

      </div>

    </div>

  )
}
