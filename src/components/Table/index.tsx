import React, { useState } from 'react';
import { HeaderGroup, useSortBy, useTable } from 'react-table';

import { ModalDefault } from '@pages/Group/Manage';
import MoreButtonWithModal, {
  ModalContent,
} from '@pages/Group/Manage/MoreButtonWithModal';

import {
  StyledTable,
  TableBody,
  TableHead,
  TableHeadSection,
  TableRow,
  TableSection,
} from './index.styles';

// interface TableProps<P extends {}> {
//   columns: Column<P>[];
//   data: P[];
// }

interface TableProps {
  columns: any[];
  data: any[];
  formatRowProps?: (row: any) => object;
  formatCellProps?: (cell: any) => object;
  modalContents?: ModalContent[];
}

// const Table = <T extends {}>({ columns, data }: TableProps<T>) => {
const Table = ({
  columns,
  data,
  formatRowProps,
  formatCellProps,
  modalContents,
}: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({ columns, data }, useSortBy);

  const [modalDefault, setModalDefault] = useState<ModalDefault[]>(
    data.map((_, id) => ({ id, checked: false }))
  );

  /* 
    Header에 '', accessor에 'more'를 넣으면 modalContent 사용 가능
  */
  return (
    <StyledTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup: HeaderGroup, idx: number) => (
          <TableRow
            {...headerGroup.getHeaderGroupProps()}
            key={idx}
            className="tr"
          >
            {headerGroup.headers.map((column: any, index: number) => {
              const sortableProps =
                column.sortable && column.getSortByToggleProps();
              return (
                <TableHeadSection
                  {...column.getHeaderProps({
                    ...sortableProps,
                    style: {
                      maxWidth: `${column.maxWidth}px`,
                      flexBasis: `${column.flexBasis}%`,
                      justifyContent: column.align ? 'center' : 'flex-start',
                      flexGrow: `${column.flexBasis / 100}`,
                    },
                  })}
                  key={index}
                  className="th"
                >
                  {column.render('Header')}
                </TableHeadSection>
              );
            })}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row: any, index: number) => {
          prepareRow(row);
          return (
            <TableRow
              {...row.getRowProps(formatRowProps && formatRowProps(row))}
              key={index}
              style={{ alignItems: 'center' }}
              cell
            >
              {row.cells.map((cell: any, i: number) => (
                <TableSection
                  {...cell.getCellProps({
                    ...formatCellProps?.(cell),
                    style: {
                      flexBasis: `${cell.column.flexBasis}%`,
                      maxWidth: `${cell.column.maxWidth}px`,
                      textAlign: cell.column.align || 'left',
                      display: 'inline-block',
                      whiteSpace: 'break-spaces',
                      flexGrow: `${cell.column.flexBasis / 100}`,
                    },
                  })}
                  key={i}
                >
                  {cell.render('Cell')}

                  {cell.column.Header === '' && !row.original.more && (
                    <MoreButtonWithModal
                      modalIdx={index}
                      targetId={row.original.teamId}
                      modalContents={modalContents}
                      modalDefault={modalDefault}
                      setModalDefault={setModalDefault}
                    />
                  )}
                </TableSection>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </StyledTable>
  );
};

export default Table;
