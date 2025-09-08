import React from "react";
import "./TableComponent.css"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper

} from "@mui/material";


type TableComponentProps = {
    tableheader: string[],
    tabledata: Record<string, any>[]
}
const TableComponent: React.FC<TableComponentProps> = ({
    tableheader, tabledata
}) => {
  
    console.log("Table Component ");
    return (
        <>
            <TableContainer component={Paper} className="tableContainer">
                <Table className="table">
                    <TableHead className="tableheader">
                        <TableRow >
                            {tableheader.map((header, index) => (
                                <TableCell key={index} className="header">{header}</TableCell>
                            )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody className="tablebody">
                        {tabledata.map((data, rowIndex) => {
                            return (
                                <TableRow key={rowIndex} >
                                    {tableheader.map((head, colIndex) => {
                                        return (
                                        <TableCell key={colIndex} className="data">{data[head]}</TableCell>)
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

            </TableContainer>

        </>
    )




}


export default TableComponent