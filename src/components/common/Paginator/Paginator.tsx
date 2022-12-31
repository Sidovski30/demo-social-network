import React from "react";

import { Pagination, PaginationProps } from "antd";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    portionSize?: number
}
const Paginator: React.FC<PropsType> = ({totalItemsCount, currentPage, onPageChanged}) => {
    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        onPageChanged(pageNumber)
      };

    return <Pagination 
        simple
        onChange={onChange}
        defaultCurrent={currentPage} 
        total={totalItemsCount} 
    />;
}

export default Paginator