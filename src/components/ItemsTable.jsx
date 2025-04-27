import tableStyle from "../styles/table.module.css";

export default function ItemsTable({ items, sortDirection, onSort }) {
  return (
    <table className={tableStyle.table}>
      <thead>
        <tr className={tableStyle.tr}>
          <th className={tableStyle.th}>名稱</th>
          <th className={tableStyle.th}>類別</th>
          <th
            className={tableStyle.th}
            onClick={onSort}
            style={{ cursor: "pointer" }}
          >
            價格 {sortDirection === "asc" ? "↑" : "↓"}
          </th>
          <th className={tableStyle.th}>庫存狀態</th>
        </tr>
      </thead>
      <tbody className={tableStyle.tbody}>
        {items.length === 0 ? (
          <tr className={tableStyle.tr} key="empty">
            <td colSpan="4" className={`text-center fw-bold p-3`}>
              查無資料
            </td>
          </tr>
        ) : (
          items.map((item) => (
            <tr className={tableStyle.tr} key={item.name + item.price}>
              <td className={tableStyle.td} data-th="名稱">
                {item.name}
              </td>
              <td className={tableStyle.td} data-th="類別">
                {item.category}
              </td>
              <td className={tableStyle.td} data-th="價格">
                ${item.price}
              </td>
              <td className={tableStyle.td} data-th="庫存狀態">
                <span style={{ color: item.inStock ? "green" : "red" }}>
                  {item.inStock ? "有庫存" : "缺貨"}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
