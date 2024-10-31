import { Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const OptionalNavBar = () => {
  const { pathname } = useLocation();

  const categories = [
    {
      name: "Accesorios",
      link: "/productos?category=Accesorio",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQk9VQwgAicbc2qfmTG-9_4A4IEWPS7v50fw&s",
    },
    {
      name: "Repuestos",
      link: "/productos?category=Repuesto",
      image:
        "https://static.landkit.engeni.com/assets/2649/7a51a2c2-be1f-407f-ac9d-50d8cf89af35/1e3194e2acff4a5399c6.jpg",
    },
    {
      name: "Equipos",
      link: "/productos?category=Equipos",
      image: "https://www.cronista.com/files/image/419/419139/61d3378d218ac.jpg",
    },
    {
      name: "Otros",
      link: "/productos?category=Otros",
      image:
        "https://electronicaonline.net/wp-content/uploads/2024/05/Historia-de-la-Electronica.jpg",
    },
  ];
  return (
    pathname === "/" && (
      <div className="w-2/3 px-10 absolute left-1/2 transform -translate-x-1/2 bg-white shadow-md h-16 rounded-[10px] hidden lg:flex lg:items-center lg:justify-between z-50">
        <ul className="flex gap-x-4">
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                to={category.link}
                className="pr-4 font-medium transition-all duration-200 border-r text-md text-secondary hover:text-primary"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <form className="relative flex gap-x-[10px]">
          <label className="flex items-center justify-center group">
            <Search />
          </label>
          <input
            type="text"
            placeholder="Buscar..."
            className="outline-none w-[100px] focus:w-[180px] focus:border-b-2 focus:border-accent placeholder:italic placeholder:text-base transition-all duration-200"
          />
        </form>
      </div>
    )
  );
};
export default OptionalNavBar;