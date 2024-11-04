import { socialMediaIcons } from "./menu";

import SocialIcons from "./SocialIcons";
import ItemsContainer from "./ItemsContainer";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  
  return (
    <footer className="bg-black mt-60">
      {(!pathname.startsWith("/product") && !pathname.startsWith("/admin")) && (
        <div className="p-16 text-center bg-gray-50 md:py-32 md:px-40">
          <p className="font-medium">Estamos aquí para ti</p>
          <h3 className="my-5 text-4xl font-semibold font-poppins">¿Tienes Preguntas?</h3>
          <p className="px-40 font-medium">
            En Cel-Fii, valoramos tu experiencia y queremos asegurarnos de que tengas toda la
            información que necesitas. Si tienes alguna pregunta sobre nuestros productos, servicios
            o cualquier otro tema, no dudes en contactarnos a través de WhatsApp. Nuestro equipo
            está disponible para ayudarte y responder a tus inquietudes de manera rápida y
            eficiente. ¡Escríbenos y hablemos!
          </p>
          <button className="mt-8 primary-btn">Abrir Chat</button>
        </div>
      )}
      <ItemsContainer />
      <div className="container flex items-center justify-between pt-2 pb-8 text-sm text-center text-gray-400">
        <span>
          &copy; {new Date().getFullYear()} Cel-Fii. Todos los derechos reservados.
          Terminos・Políticas de privacidad
        </span>
        <SocialIcons icons={socialMediaIcons} />
      </div>
    </footer>
  );
};
export default Footer;
