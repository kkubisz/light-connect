import { Client2 } from '../clients/model/Client';

export function getPreviousYearClient(data: Client2[], selectedYear: number) {
  return data.filter((client) => {
    const date = new Date(client.date.seconds * 1000);

    return date.getFullYear() === selectedYear - 1;
  });
}
