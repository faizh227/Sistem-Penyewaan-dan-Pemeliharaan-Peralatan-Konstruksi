import { getDate, getMonth, getYear } from "date-fns";

export function formatTanggalDDMMYY(tanggal) {
    const hari = getDate(new Date(tanggal));
    const bulan = getMonth(new Date(tanggal));
    const tahun = getYear(new Date(tanggal));
    let result = '';
    result = hari + '/' + bulan + '/' + tahun;
    return result; 
} 