import "./App.css";
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({
  itemsPerPage,
  totalItems,
  currPage,
  setCurrPage,
}) => {

  const THRESHOLD = 22;
  const PAGE_LIST_SIZE_FOR_ABOVE_THRESHOLD_CONDIION = 22;
  const TOTAL_PAGES = Math.ceil(totalItems / itemsPerPage);

  const setFixedButtons = (pages) => {
    pages.unshift(
      <Pagination.Prev
        onClick={() => handlePageChange(currPage - 1)}
        disabled={currPage === 1}
      />
    );

    pages.unshift(
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={currPage === 1}
      />
    );

    pages.push(
      <Pagination.Next
        onClick={() => handlePageChange(currPage + 1)}
        disabled={currPage === TOTAL_PAGES}
      />
    );
    pages.push(
      <Pagination.Last
        onClick={() => handlePageChange(TOTAL_PAGES)}
        disabled={currPage === TOTAL_PAGES}
      />
    );
  };

  const getPagesBelowThreshold = () => {
    const pages = [];
    for (let i = 1; i <= TOTAL_PAGES; i++) {
      pages.push(
        <Pagination.Item
          active={currPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    setFixedButtons(pages);
    return pages;
  };

  const correctPrefixPageNumbersIfRequired = (pages) => {
    if (pages[0].key !== "1") {
      for (let i = 0; i < 3; i++) {
        pages[i] = (
          <Pagination.Item
            onClick={() => handlePageChange(i + 1)}
            disabled={currPage === i + 1}
            key={(i + 1).toString()}
          >
            {i + 1}
          </Pagination.Item>
        );
      }
      if (pages[3].key !== "4") {
        pages[3] = <Pagination.Ellipsis disabled={true} />;
      }
    }
  };

  const correctSuffixPageNumbersIfRequired = (pages) => {
    if (
      pages[pages.length - 1].key !==
      PAGE_LIST_SIZE_FOR_ABOVE_THRESHOLD_CONDIION.toString()
    ) {
      for (let i = 3; i > 0; i--) {
        pages[pages.length - i] = (
          <Pagination.Item
            onClick={() => handlePageChange(TOTAL_PAGES - i + 1)}
            active={currPage === TOTAL_PAGES - i + 1}
            key={(TOTAL_PAGES - i + 1).toString()}
          >
            {TOTAL_PAGES - i + 1}
          </Pagination.Item>
        );
      }
      if (pages[pages.length - 4].key !== (TOTAL_PAGES - 3).toString()) {
        pages[pages.length - 4] = <Pagination.Ellipsis disabled={true} />;
      }
    }
  };

  const checkAndAddEllipses = (pages) => {
    let prev = "0";
    for (let i = 1; i < PAGE_LIST_SIZE_FOR_ABOVE_THRESHOLD_CONDIION; i++) {
      if (pages[i].key !== (parseInt(pages[i - 1].key) + 1).toString()) {
        pages[i] = <Pagination.Ellipsis disabled={true} />;
        break;
      }
      prev = i;
    }
  };

  const getPagesAboveThreshold = (totalPages, currPage) => {
    const pages = [];
    const start = Math.max(1, currPage - THRESHOLD / 2);
    const end = Math.min(TOTAL_PAGES, currPage + THRESHOLD / 2);
    for (let i = start; i <= end; i++) {
      pages.push(
        <Pagination.Item
          active={currPage === i}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    if (end - start != PAGE_LIST_SIZE_FOR_ABOVE_THRESHOLD_CONDIION) {
      let diff = PAGE_LIST_SIZE_FOR_ABOVE_THRESHOLD_CONDIION - (end - start);
      if (start !== 1) {
        for (let i = diff; i >= 1; i--) {
          pages.unshift(
            <Pagination.Item
              onClick={() => handlePageChange(i)}
              key={i}
              active={currPage === i}
            >
              {i}
            </Pagination.Item>
          );
        }
      } else {
        for (let i = TOTAL_PAGES - diff + 1; i <= TOTAL_PAGES; i++) {
          pages.push(
            <Pagination.Item
              onClick={() => handlePageChange(i)}
              key={i}
              active={currPage === i}
            >
              {i}
            </Pagination.Item>
          );
        }
      }
    }
    checkAndAddEllipses(pages);
    correctPrefixPageNumbersIfRequired(pages);
    correctSuffixPageNumbersIfRequired(pages);
    return pages;
  };

  const handlePageChange = (targetPage) => {
    setCurrPage(targetPage);
    // getPagesBelowThreshold();
  };

  return (
    <div style={{ marginLeft: "65px" }}>
      <Pagination>
        {TOTAL_PAGES <= THRESHOLD
          ? getPagesBelowThreshold(TOTAL_PAGES, currPage).map((ele) => ele)
          : getPagesAboveThreshold(TOTAL_PAGES, currPage).map((ele) => ele)}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
