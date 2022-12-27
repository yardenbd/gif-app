import React, { useState } from "react";
import { PaginationRequestType } from "../../types";

import { PaginationWrapper, PagintionItem } from "./style";

interface IPaginationProps {
  onPageClick: (paginatioArg: PaginationRequestType) => void;
}

const pagesArray = Array.from(Array(10).keys());
const initialState = {
  count: 25,
  offset: 0,
  pageIndex: 1,
};
export const Pagination: React.FC<IPaginationProps> = ({ onPageClick }) => {
  const [pagination, setPagination] = useState<
    PaginationRequestType & { pageIndex: number }
  >(initialState);
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
