import { render, screen } from "@testing-library/react";
import TableComponent from "./TableComponent";


describe("Table Component ", () => {
    const tableheaders = ["Name", "Age", "Country"];
    const tabledata = [
        { Name: "Arun", Age: 23, Country: "India" },
        { Name: "Ajay", Age: 25., Country: "England" },
        { Name: "John", Age: 28, Country: "USA" },
        { Name: "Alice", Age: 24, Country: "UK" },
    ];
    beforeEach(
        () => { render(<TableComponent tableheader={tableheaders} tabledata={tabledata}></TableComponent>); }
    )

    test("renders the table headers ", () => {
        tableheaders.map((header) => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });
    });

    test("renders the table data properly ", () => {
        tabledata.map((data) => {
            expect(screen.getByText(data["Name"])).toBeInTheDocument();
            expect(screen.getByText(String(data["Age"]))).toBeInTheDocument();
            expect(screen.getByText(data["Country"])).toBeInTheDocument();

        })
    });

    test("renders correct number of cells per row", () => {
        const rows = screen.getAllByRole("row");
        rows.forEach((row) => {
            const cells = row.querySelectorAll("td, th");
            expect(cells.length).toBe(tableheaders.length);
        });
    });



});


describe("Table Component with No data", () => {
    const tableheaders = ["Name", "Age", "Country"];

    test("renders only header row when no data", () => {
        render(<TableComponent tableheader={tableheaders} tabledata={[]} />);
        const rows = screen.getAllByRole("row", { hidden: true });
        expect(rows).toHaveLength(1);
    });
});