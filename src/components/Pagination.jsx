import styles from "../styles/pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const range = 2;
  const start = Math.max(1, currentPage - range);
  const end = Math.min(totalPages, currentPage + range);

  const pageNumbers = [];
  if (start > 1) {
    pageNumbers.push(1);
    if (start > 2) pageNumbers.push("ellipsis");
  }
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }
  if (end < totalPages) {
    if (end < totalPages - 1) pageNumbers.push("ellipsis");
    pageNumbers.push(totalPages);
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.btn}
      >
        <span className="d-none d-lg-inline-block">上一頁</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-left d-lg-none"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
      </button>

      {pageNumbers.map((page, idx) => {
        if (page === "ellipsis") {
          return <span key={page + idx}>...</span>;
        }
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${styles.btn} ${
              page === currentPage ? styles.active : ""
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.btn}
      >
        <span className="d-none d-lg-inline-block">下一頁</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-right d-lg-none"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </button>
    </div>
  );
}
