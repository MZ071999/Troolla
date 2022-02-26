/* eslint-disable react/jsx-key */
import { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import classes from "./table.module.css";

function BasicTable({ props }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => props, []);
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className={classes.wrapper}>
      <table className={classes.tbl} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className={classes.th} {...column.getHeaderProps()}>
                  {" "}
                  {column.render("Header")}{" "}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className={classes.tr} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className={classes.td} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BasicTable;
