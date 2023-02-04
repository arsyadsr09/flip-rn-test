export function convertBankName(value: string) {
  return value.length < 5
    ? value.toUpperCase()
    : value[0].toUpperCase() + value.substring(1);
}

export function convertAmount(value: number) {
  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });
}

export function convertDate(value: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const date = new Date(value);

  return date.toLocaleDateString('id-ID', options);
}
