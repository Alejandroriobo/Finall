import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../styles/Dashboard.css";
import Lupa from "../assets/img/reshot-icon-search-glass-JTUHQ46YN7.svg";
import Inicio from "../assets/img/reshot-icon-home-BD472S9VLP.svg"
import Nequi from "../assets/img/1691080850513.jpeg"
import MerLib from "../assets/img/1691093362329.jpeg"
import Logo from "../assets/img/1.png"
import Video from "../assets/img/reshot-icon-video-player-MFQGB5L7P9.svg"
import Comunidad from "../assets/img/reshot-icon-leadership-TA4WMRLVXG.svg"
import Menu from "../assets/img/reshot-icon-menu-D6U5PY3TJK.svg"
import Mensajes from "../assets/img/reshot-icon-message-ZVS4DE97FT.svg"
import Usuari from "../assets/img/IMG-20220429-WA0033.jpg"
import Face from "../assets/img/log/reshot-icon-facebook-EAQUC4LBMV.svg"
import Twiter from "../assets/img/log/reshot-icon-twitter-4EAXDHGYM5.svg"
import Insta from "../assets/img/log/reshot-icon-instagram-M2ZK3USTWR.svg"
import User from "../assets/img/IMG-20220429-WA0033.jpg"

const FormularioLogin = () => {

  const navigate = useNavigate();

  const inicioSesion = async (e) => {
    // ... Your existing code for logging in ...
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="left">
            <img src={Logo} alt="Logo" />
            <div className="search-bar">
              <img src={Lupa} alt="Search Icon" />
              <input type="text" placeholder="Buscar" />
            </div>
          </div>
          <div className="middle">
            <button type="button">
              <img src={Inicio} alt="inicio" />
            </button>
            <button type="button">
              <img src={Video} alt="video" />
            </button>
            <button type="button">
              <img src={Comunidad} alt="comunidad" />
            </button>
          </div>
          <div className="right">
            <button type="menu">
              <img src={Menu} alt="menu" />
            </button>
            <button type="button">
              <img src={Mensajes} alt="mensajes" />
            </button>
            <button type="button">
              <img src={Usuari} alt="usuario" />
            </button>
          </div>
        </nav>
      </header>


      <div className="container">
      <div className="left-sidebar">
        <div className="profile-info">
          <h1>Feedback Zone</h1>
          <div className="azul">
            <img src={User} alt="user" />
          </div>
          <h2>Miguel Roa</h2>
          <h4>Ingeniero de sistemas</h4>
          <h3>Semestre 6°</h3>
          <h4>Materias:</h4>
          <ul>
            <li>Electrónica básica</li>
            <li>Emprendimiento</li>
            <li>Estadística 2</li>
            <li>Ingeniería de software</li>
            <li>Programación web</li>
            <li>Proyecto integrador 2</li>
            <li>Inglés IV</li>
          </ul>
          <button type="button">Ver más</button>
        </div>
      </div>
      <div className="main-content">
      <div className="post">
        <h2>Nequi</h2>
        <img src={Nequi} alt="Nequi" />
        <p>
        Como patrocinadores, hemos sido testigos de una final épica llena de pasión y emoción. El fútbol une y en Nequi estamos orgullos@s de haber sido parte de esta temporada de fútbol intenso, apasionante e inolvidable 💜

        Agradecemos a todos los jugadores, entrenadores, aficionad@s y colaborador@s que hicieron posible este evento. Esperamos seguir apoyando y siendo testigos de más momentos emocionantes en el mundo 🥳 En donde tod@s de alguna manera metemos goles, en la cancha o con la plata 😎 Siempre #AtuRitmo

        #CopaTrinche #PatrocinadorNequi #PasiónPorElDeporte        </p>
      </div>
      <div className="post">
        <h2>Mercado Libre</h2>
        <img src={MerLib} alt="Mercado Libre" />
        <p>
        Cumplimos 24 años de dar el máximo, de asumir nuevos desafíos, de aprender y evolucionar.
        24 años con un propósito compartido: democratizar el comercio y los servicios financieros para transformar la vida de millones de personas en América Latina.
                    
        Los resultados del segundo trimestre de 2023 reflejan el compromiso, el esfuerzo y la dedicación de los que trabajamos todos los días en MELI. 💪
                    
        ¡Felicitaciones a todas las personas del equipo por dejar su huella en esta historia y seguir creando valor para nuestros usuarios!
                    
        #OrgulloMELI #EstoEsMELI        
        </p>
      </div>
      </div>
      <div className="right-sidebar">
        <div className="azul"></div>
        <h3>Gestionar mi red</h3>
        <ul>
          <li>Contactos</li>
          <li>Seguidos y seguidores</li>
          <li>Eventos</li>
          <li>Páginas</li>
          <li>Newsletter</li>
          <li>Hashtags</li>
        </ul>
        <div>
          <h5>¿Tienes alguna pregunta?</h5>
          <h6>Visita nuestro centro de preguntas</h6>

          <h5>Gestionar tu cuenta y la privacidad</h5>
          <h6>Ve a los ajustes</h6>

          <h5>Transparencias de las recomendaciones</h5>
          <h6>Más información sobre el contenido recomendado</h6>
        </div>
        <h6>Acerca de</h6>
        <h6>Accesibilidad</h6>
        <h6>Centro de ayudas</h6>
        <h6>Publicidad y condiciones</h6>
        <h6>Opciones de publicidad</h6>
        <h6>Publicidad</h6>
        <h6>Servicios empresariales</h6>
      </div>
    </div>
               
      
      <footer>
        <div className="footer-container">
          <div className="footer-logo">
            <img src={Logo} alt="Logo del footer" />
          </div>
          <div className="footer-links">
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Acerca</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Términos y condiciones</a></li> 
            </ul>
          </div>
          <div className="footer-social">
            <ul>
              <li><a href="#"><img src={Face} alt="Facebook" /></a></li>
              <li><a href="#"><img src={Twiter} alt="Twitter" /></a></li>
              <li><a href="#"><img src={Insta} alt="Instagram" /></a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Todos los derechos reservados &copy; 2023 | Feedback Zone</p>
        </div>
      </footer>
    </div>
  );
};

export default FormularioLogin;
