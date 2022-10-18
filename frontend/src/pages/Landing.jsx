import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <h1>Bienvenido a ProData</h1>
      <Link to="/login">Ir al Login</Link>
    </>
  );
}

export default Landing;
