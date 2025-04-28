import tableStyle from "../styles/table.module.css";

export default function Table({ columns, data, rowKey = "id" }) {
  return (
    <table className={tableStyle.table}>
      <thead>
        <tr className={tableStyle.tr}>
          {columns.map((col) => (
            <th
              className={tableStyle.th}
              key={`${col.dataIndex}-${col.title}`}
              onClick={col.onClick}
              style={col.style}
              scope="col"
            >
              {col.title}
              {col.sortIcon}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={tableStyle.tbody}>
        {data.length === 0 ? (
          <tr className={tableStyle.tr}>
            <th
              scope="row"
              colSpan={columns.length}
              className={`text-center fw-bold p-3`}
            >
              查無資料
            </th>
          </tr>
        ) : (
          data.map((row) => (
            <tr className={tableStyle.tr} key={row[rowKey]}>
              {columns.map((column, index) => {
                const Cell = index === 0 ? "th" : "td";
                return (
                  <Cell
                    className={tableStyle.td}
                    data-th={column.title}
                    key={column.dataIndex}
                    scope={index === 0 ? "row" : undefined}
                  >
                    {column.render
                      ? column.render(row[column.dataIndex], row)
                      : row[column.dataIndex]}
                  </Cell>
                );
              })}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
