import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useMemo, Fragment } from "react";
import FilterControls from "./components/FilterControls";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import items from "./data/items.json";
import useDebounce from "./hook/useDebounce";

function App() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isInStockOnly, setIsInStockOnly] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const debouncedSearch = useDebounce(search, 300);
  const debouncedMinPrice = useDebounce(minPrice, 300);
  const debouncedMaxPrice = useDebounce(maxPrice, 300);

  const allCategories = Array.from(new Set(items.map((item) => item.category)));

  const filteredItems = useMemo(() => {
    let result = items;

    if (debouncedSearch.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    if (debouncedMinPrice !== "") {
      result = result.filter((item) => item.price >= Number(debouncedMinPrice));
    }
    if (debouncedMaxPrice !== "") {
      result = result.filter((item) => item.price <= Number(debouncedMaxPrice));
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
  }, [
    debouncedSearch,
    selectedCategories,
    isInStockOnly,
    sortDirection,
    debouncedMinPrice,
    debouncedMaxPrice,
  ]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const dataPaginated = useMemo(
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

  const columns = [
    { title: "名稱", dataIndex: "name" },
    { title: "類別", dataIndex: "category" },
    {
      title: "價格",
      dataIndex: "price",
      render: (value) => `$${value}`,
      onClick: handleSort,
      style: { cursor: "pointer" },
      sortIcon: sortDirection === "asc" ? "↑" : "↓",
    },
    {
      title: "庫存狀態",
      dataIndex: "inStock",
      render: (value) => (
        <span style={{ color: value ? "green" : "red" }}>
          {value ? "有庫存" : "缺貨"}
        </span>
      ),
    },
  ];

  return (
    <Fragment>
      <FilterControls
        search={search}
        onSearchChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={(value) => {
          setMinPrice(value);
          setPage(1);
        }}
        onMaxPriceChange={(value) => {
          setMaxPrice(value);
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

      <Table columns={columns} data={dataPaginated} rowKey="name" />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Fragment>
  );
}

export default App;
