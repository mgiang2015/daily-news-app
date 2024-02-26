"use client"
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';

export default function DownloadButton({ data }) {
    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
        saveAs(blob, "data.xlsx");
    };
    
    return (
        <button onClick={() => downloadExcel(data)}>Download as Excel</button>
    )
}
