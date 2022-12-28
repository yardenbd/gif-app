import React from "react";
import { usePagination } from "../../hooks/usePagination";
import { IPaginationState, PaginationRequestType } from "../../types";

import { PaginationWrapper, PagintionItem } from "./style";

interface IPaginationProps {
  onPageClick: (paginatioArg: PaginationRequestType) => void;
  pagination: IPaginationState;
  setPagination: React.Dispatch<React.SetStateAction<IPaginationState>>;
}

export const Pagination: React.FC<IPaginationProps> = ({
  onPageClick,
  pagination,
  setPagination,
}) => {
  const { pageIndex, total, count } = pagination;

  const paginationRange = usePagination({
    currentPage: pageIndex,
    totalCount: total - count,
    siblingCount: 1,
    pageSize: count,
  });

  const handlePageClick = (desiredPageIndex: number) => {
    if (desiredPageIndex < 1 || desiredPageIndex > Math.floor(total / count))
      return;
    const offset = desiredPageIndex * count;
    setPagination((prevState) => {
      return { ...prevState, offset, pageIndex: desiredPageIndex };
    });

    const lastPageIndex = offset === total;
    onPageClick({ count, offset: lastPageIndex ? offset - 25 : offset });
  };

  const paginationItemToRender = paginationRange?.map((page) => {
    if (typeof page === "string") {
      return (
        <PagintionItem key={"id" + Math.random().toString(16).slice(2)}>
          {page}
        </PagintionItem>
      );
    } else
      return (
        <PagintionItem
          onClick={() => handlePageClick(page)}
          className={pageIndex === page ? "active" : ""}
          key={page}
        >
          {page}
        </PagintionItem>
      );
  });

  paginationItemToRender?.unshift(
    <PagintionItem
      onClick={() => handlePageClick(pagination.pageIndex - 1)}
      key={"previous"}
    >
      Previous
    </PagintionItem>
  );

  paginationItemToRender?.push(
    <PagintionItem
      onClick={() => handlePageClick(pagination.pageIndex + 1)}
      key={"next"}
    >
      Next
    </PagintionItem>
  );

  return <PaginationWrapper>{paginationItemToRender}</PaginationWrapper>;
};
