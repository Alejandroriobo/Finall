import React, { useState } from "react";
import Logo from "../assets/Captura de pantalla 2023-08-02 221459.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../styles/Login.css";

const FormularioLogin = () => {
  const MySwal = withReactContent(Swal);
  const [usuario, setUsuario] = useState("");
  const [password, setPasword] = useState("");
  const navigate = useNavigate();

  const inicioSesion = async (e) => {
    e.preventDefault();
    console.log(" :", usuario);
    console.log("Password:", password);

    const data = {
      usuario: usuario,
      password: password,
    };

    //Consumo de Servicio Login
    await axios
      .post("http://89.116.25.43:3500/api/login", data)
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("token", resp.data.jwt);
        localStorage.setItem("user", resp.data.user);
        localStorage.setItem("username", resp.data.user.usuario);
        //Swal.fire("Información!", "Buen Trabajo!", "success");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 400 || err.response.status == 404) {
          Swal.fire("Información!", err.response.data.message, "error");
        } else {
          Swal.fire("Información!", "Ocurrio un error!", "error");
        }
      });
  };

  return (
    <div className="main">
      <div className="card_main">
        <div className="init">
          <div className="carinfo">
            <img className="log" src={Logo} alt="Logo" />
            <h1>Feedback Zone: Conectando tu futuro ingeniero con experiencias y conocimientos.</h1>
          </div>
        </div>
        <div className="lind">
          <h2>LOG IN</h2>
          <form className="cardform" onSubmit={inicioSesion}>
            
            <div className="form-group">
              <input
                className="inputs"
                type="text"
                placeholder="Email or phone"
                onChange={(e) => {
                  setUsuario(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
                <input
                className="inputs"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPasword(e.target.value);
                }}
              />
            </div>
            <div className="options">
              <input type="radio" name="option" id="remember" value="Remember" />
              <label htmlFor="remember">Remember</label>
              <input type="radio" name="option" id="forgot" value="Forgot password" />
              <label htmlFor="forgot">Forgot password</label>
            </div>
            <div className="button">
              <button type="submit">LOG IN</button>
            </div>
            <div className="w-full flex justify-end mr-5">
              <Link to={"/register"}>register </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default FormularioLogin;
