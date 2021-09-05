import React from "react";
import _ from "lodash";
function Pagination(props) {
  const { currentPage, pageSize, itemSize, onPageChange } = props;
  const pageCount = Math.ceil(itemSize / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1); // this will return the array
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a
              style={{ cursor: "pointer" }}
              onClick={() => onPageChange(page)}
              className="page-link"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
