import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({ cartItems = [], isCartPage = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "+5492604545982";

  const buildCartMessage = () => {
    if (cartItems.length === 0) return "🛒 *Tu carrito está vacío.*";

    const cartDetails = cartItems
      .map((item) => {
        const totalPrice = item.quantity * item.priceArs;
        return `*Producto:* ${item.name}\n*Cantidad:* ${item.quantity}\n*Precio unitario:* ARS ${
          item.priceArs
        }\n*Total:* ARS ${totalPrice.toFixed(2)}\n`;
      })
      .join("\n");

    const totalCompra = cartItems.reduce((acc, item) => acc + item.quantity * item.priceArs, 0);

    return `¡Hola! Me gustaría realizar la siguiente compra:\n\n${cartDetails}\n *Total de la compra:* ARS ${totalCompra.toFixed(
      2
    )}\n\n ¿Cómo debo proceder para realizar el pago?`;
  };

  const message = isCartPage
    ? buildCartMessage()
    : "¡Hola! Me gustaría saber más sobre sus productos.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`${
        isCartPage ? "w-full bg-blue-500 mt-4" : "fixed bottom-5 right-5 h-14 w-14"
      } bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out flex items-center justify-center z-50`}
      aria-label="Contactar por WhatsApp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <FaWhatsapp size={24} />
      {isCartPage && <span className="ml-2">Continuar compra vía WhatsApp</span>}
      {!isCartPage && isHovered && (
        <div className="absolute bottom-16 w-48 text-center left-1/2 transform -translate-x-[230px] translate-y-[52px] bg-white text-gray-600 py-1 px-3 rounded-md shadow-sm">
          Chatea con nosotros
        </div>
      )}
    </a>
  );
};

export default WhatsAppButton;
