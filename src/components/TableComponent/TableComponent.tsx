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
  
    return (
        <>
            <TableContainer component={Paper} className="basicMUITableContainer">
                <Table className="basicMUITable">
                    <TableHead className="basicTableHeader">
                        <TableRow >
                            {tableheader.map((header, index) => (
                                <TableCell key={index} className="basicMUITableHeader">{header}</TableCell>
                            )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody className="basicMUITableBody">
                        {tabledata.map((data, rowIndex) => {
                            return (
                                <TableRow key={rowIndex} >
                                    {tableheader.map((head, colIndex) => {
                                        return (
                                        <TableCell key={colIndex} className="basicMUITableData">{data[head]}</TableCell>)
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