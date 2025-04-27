import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useMemo, Fragment } from "react";
import FilterControls from "./components/FilterControls";
import ItemsTable from "./components/ItemsTable";
import Pagination from "./components/Pagination";
import items from "./data/items.json";

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isInStockOnly, setIsInStockOnly] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const allCategories = Array.from(new Set(items.map((item) => item.category)));

  const filteredItems = useMemo(() => {
    let result = items;

    if (search.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    if (isInStockOnly) {
      result = result.filter((item) => item.inStock);
    }

    result = result
      .slice()
      .sort((a, b) =>
        sortDirection === "asc" ? a.price - b.price : b.price - a.price
      );

    return result;
  }, [search, selectedCategories, isInStockOnly, sortDirection]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginated = useMemo(
    () => filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filteredItems, page, itemsPerPage]
  );

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setPage(1);
  };

  const handleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setPage(1);
  };

  return (
    <Fragment>
      <FilterControls
        search={search}
        onSearchChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        allCategories={allCategories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        isInStockOnly={isInStockOnly}
        onStockChange={(e) => {
          setIsInStockOnly(e.target.checked);
          setPage(1);
        }}
        sortDirection={sortDirection}
        onSortChange={(e) => {
          setSortDirection(e.target.value);
          setPage(1);
        }}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(e) => {
          setItemsPerPage(parseInt(e.target.value, 10));
          setPage(1);
        }}
      />

      <div className="mb-3">共 {filteredItems.length} 筆資料</div>

      <ItemsTable
        items={paginated}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Fragment>
  );
}

export default App;
