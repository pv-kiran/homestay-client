import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = ({ headers, data, fileName = "report.xlsx", sheetName = "Report" }) => {
    // Convert data to an array format with custom headers
    const formattedData = [headers, ...data?.map((item) => Object.values(item))];

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(formattedData);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Write the workbook and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(excelFile, fileName);
};
