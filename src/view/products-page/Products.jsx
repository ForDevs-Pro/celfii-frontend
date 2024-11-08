import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartFavs, loadProducts } from "../../redux/actions";

import Cards from "../../components/cards/Cards";
import Filter from "../../components/filter/Filter";
import SearchBar from "../../components/filter/SearchBar";
import Pagination from "../../components/pagination/Pagination";

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { products, totalItems, loading } = useSelector((state) => state.products);
  const { favourites } = useSelector((state) => state.cartFavs);

  const [searchParams, setSearchParams] = useState({
    page: parseInt(query.get("page")) || 1,
    perPage: 54,
    name: query.get("name") || "",
    category: localStorage.getItem("selectedCategory") || query.get("category") || "",
    sort: localStorage.getItem("sortOrder") || "newest",
    minPrice: localStorage.getItem("minPrice") || "",
    maxPrice: localStorage.getItem("maxPrice") || "",
  });

  const updateSearchParams = (newParams) => {
    setSearchParams((prevParams) => {
      const resetPage = "page" in newParams ? newParams.page : 1;
      const updatedParams = { ...prevParams, page: resetPage, ...newParams };

      if (newParams.category !== undefined)
        localStorage.setItem("selectedCategory", newParams.category);
      if (newParams.sort !== undefined) localStorage.setItem("sortOrder", newParams.sort);
      if (newParams.minPrice !== undefined) localStorage.setItem("minPrice", newParams.minPrice);
      if (newParams.maxPrice !== undefined) localStorage.setItem("maxPrice", newParams.maxPrice);

      return updatedParams;
    });
  };

  const handleSearch = (searchTerm) => {
    setSearchParams({
      page: 1,
      perPage: 54,
      name: searchTerm,
      category: "",
      sort: "newest",
      minPrice: "",
      maxPrice: "",
    });
    localStorage.removeItem("selectedCategory");
    localStorage.removeItem("sortOrder");
    localStorage.removeItem("minPrice");
    localStorage.removeItem("maxPrice");
  };

  useEffect(() => {
    dispatch(loadProducts(searchParams));
    dispatch(loadCartFavs("favorites"));
  }, [dispatch, searchParams]);

  const totalPages = Math.ceil(totalItems / searchParams.perPage);

  const handlePageChange = (newPage) => {
    updateSearchParams({ page: newPage });
  };

  return (
    <div className="container">
      <SearchBar value={searchParams.name} onSearch={handleSearch} />
      <div className="flex">
        <aside>
          <Filter updateSearchParams={updateSearchParams} searchParams={searchParams} />
        </aside>
        <main>
          {loading ? (
            <p>Cargando productos...</p>
          ) : products.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            <>
              <Cards products={products} favourites={favourites} />
              <Pagination
                currentPage={searchParams.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
