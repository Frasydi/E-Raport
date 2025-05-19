import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Laki-Laki' },
            { id: 1, value: 15, label: 'Perempuan' },
          ],
        },
      ]}
      width={250}
      height={250}
      className='mt-5'
    />
  );
}
