import { getDate, getYear } from "date-fns";
import getMonth from "date-fns/getMonth";
import { getNameMonth } from "./getNameMonth";

export function formatTanggalIntoWord(tanggal) {
    const Bulan = getMonth(new Date(tanggal))
    const Tahun = getYear(new Date(tanggal))
    const Tanggal = getDate(new Date(tanggal))
    let result = '';
    result = Tanggal + ' ' + getNameMonth(Bulan) + ' ' + Tahun;
    return result;
}