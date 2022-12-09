import { useState, useMemo } from "react";

const PaginationComponent = ({
  totalPage,
  page,
  setPage,
  setSkip,
  setTake,
}) => {
  const [pagination, setPagination] = useState([]);

  useMemo(() => {
    for (let i = 0; i < totalPage; i++) {
      const number = i + 1;
      const find = pagination.find((element) => element === number);
      if (!find) setPagination((prevArray) => [...prevArray, number]);
    }
    // eslint-disable-next-line
  }, [totalPage]);

  const pagePagination = (pg) => {
    setPage(pg);
    const init = pg * 20;
    setTake(pg * 20);
    setSkip(init - 20);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pagination?.length
          ? pagination.map((data, i) => (
              <li
                className={`page-item ${data === page ? "active" : ""}`}
                key={i}
                aria-current="page"
                onClick={() => pagePagination(data)}
              >
                {/* eslint-disable-next-line */}
                <a className={`page-link`} href="#">
                  {data}
                </a>
              </li>
            ))
          : null}
      </ul>
    </nav>
  );
};

export default PaginationComponent;
