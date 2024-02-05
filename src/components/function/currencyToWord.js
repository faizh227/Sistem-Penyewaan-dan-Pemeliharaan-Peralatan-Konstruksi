export function currencyToWord(number) {
    const units = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
    const teens = ['Sepuluh', 'Sebelas', 'Dua Belas', 'Tiga Belas', 'Empat Belas', 'Lima Belas', 'Enam Belas', 'Tujuh Belas', 'Delapan Belas', 'Sembilan Belas'];
    const tens = ['', 'Sepuluh', 'Dua Puluh', 'Tiga Puluh', 'Empat Puluh', 'Lima Puluh', 'Enam Puluh', 'Tujuh Puluh', 'Delapan Puluh', 'Sembilan Puluh'];

    const toWords = (n) => {
        if (n < 10) return units[n];
        else if (n < 20) return teens[n - 10];
        else {
            const digitOne = n % 10;
            const digitTen = Math.floor(n / 10);
            return tens[digitTen] + ' ' + units[digitOne];
        }
    };

    if (number === 0) return 'Nol Rupiah';

    const billion = Math.floor(number / 1000000000);
    const hundredMillion = Math.floor((number % 1000000000) / 100000000);
    const million = Math.floor((number % 100000000) / 1000000);
    const hundredThousand = Math.floor((number % 1000000) / 100000);
    const thousand = Math.floor((number % 100000) / 1000);
    const hundred = Math.floor((number % 1000) / 100);
    const remainder = Math.floor((number % 100) / 1);

    let result = '';

    if (billion > 0) {
      result += toWords(billion) + ' Miliar ';
    }

    if (hundredMillion > 0) {
        if (hundredMillion === 1) {
            result += ' Seratus ';
            if (million > 0) {
                result += toWords(million) + ' Juta ';
            }
        }
        else {
            result += toWords(hundredMillion) + ' Ratus ';
            if (million > 0) {
                result += toWords(million) + ' Juta ';
            }
        }
    } else {
        if (million > 0) {
          result += toWords(million) + ' Juta ';
        }
    }


    if (hundredThousand > 0) {
        if (hundredThousand === 1) {
            result += ' Seratus ';
            if (thousand > 0) {
                result += toWords(thousand) + ' Ribu ';
            }
        }
        else {
            result += toWords(hundredThousand) + ' Ratus ';
            if (thousand > 0) {
                result += toWords(thousand) + ' Ribu ';
            }
        }
    } else {
        if (thousand > 0) {
            result += toWords(thousand) + ' Ribu ';
        }
    }

    if (hundred > 0) {
        if (hundred === 1) {
            result += ' Seratus ';
            if (remainder > 0) {
                result += toWords(remainder);
            }
        }
        else {
            result += toWords(hundred) + ' Ratus ';
            if (remainder > 0) {
                result += toWords(remainder);
            }
        }
    }
    return result + ' Rupiah ';
}