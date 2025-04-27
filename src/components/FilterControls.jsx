import { Row, Col, Form } from "react-bootstrap";

export default function FilterControls({
  search,
  onSearchChange,
  allCategories,
  selectedCategories,
  onCategoryChange,
  isInStockOnly,
  onStockChange,
  sortDirection,
  onSortChange,
  itemsPerPage,
  onItemsPerPageChange,
}) {
  return (
    <div className="p-3 rounded-3 border bg-light mb-3">
      <Row className="g-3">
        <Col md={6}>
          <Form.Group controlId="search">
            <Form.Label>搜尋</Form.Label>
            <Form.Control
              type="text"
              placeholder="搜尋名稱"
              value={search}
              onChange={onSearchChange}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>類別</Form.Label>
            <div>
              {allCategories.map((category) => (
                <Form.Check
                  key={category}
                  inline
                  type="checkbox"
                  id={`category-${category}`}
                  label={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryChange(category)}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Check
            type="checkbox"
            checked={isInStockOnly}
            id="in-stock-only"
            onChange={onStockChange}
            label="只顯示有庫存的商品"
          />
        </Col>

        <Col md={6}>
          <Form.Group controlId="sortDirection">
            <Form.Label>價格排序</Form.Label>
            <Form.Select value={sortDirection} onChange={onSortChange}>
              <option value="asc">價格由低到高</option>
              <option value="desc">價格由高到低</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="itemsPerPage">
            <Form.Label>顯示筆數</Form.Label>
            <Form.Select value={itemsPerPage} onChange={onItemsPerPageChange}>
              <option value={10}>每頁 10 筆</option>
              <option value={20}>每頁 20 筆</option>
              <option value={50}>每頁 50 筆</option>
              <option value={100}>每頁 100 筆</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
