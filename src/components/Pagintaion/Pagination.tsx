import React from "react";
import { PaginationRequestType } from "../../types";

import { PaginationWrapper, PagintionItem } from "./style";

interface IPaginationProps {
  onPageClick: (paginatioArg: PaginationRequestType) => void;
  pagination: PaginationRequestType & {
    pageIndex: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<
      PaginationRequestType & {
        pageIndex: number;
      }
    >
  >;
}

const pagesArray = Array.from(Array(10).keys());

export const Pagination: React.FC<IPaginationProps> = ({
  onPageClick,
  pagination,
  setPagination,
}) => {
  const handlePageClick = (pageIndex: number) => {
    const offset = pageIndex * 25;
    setPagination((prevState) => {
      return { ...prevState, offset, pageIndex };
    });
    onPageClick({ count: pagination.count, offset });
  };

  const paginationItemToRender = pagesArray.map((page) => (
    <PagintionItem
      onClick={() => handlePageClick(page + 1)}
      className={pagination.pageIndex === page + 1 ? "active" : ""}
      key={page}
    >
      {page + 1}
    </PagintionItem>
  ));
  paginationItemToRender.unshift(
    <PagintionItem
      onClick={() => handlePageClick(pagination.pageIndex - 1)}
      key={"previous"}
    >
      Previous
    </PagintionItem>
  );
  paginationItemToRender.push(
    <PagintionItem
      onClick={() => handlePageClick(pagination.pageIndex + 1)}
      key={"next"}
    >
      Next
    </PagintionItem>
  );

  return <PaginationWrapper>{paginationItemToRender}</PaginationWrapper>;
};
