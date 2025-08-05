import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";

export default function BasicPie({ data }) {
    const total = (data?.laki_laki || 0) + (data?.perempuan || 0);

    // Jika kosong, buat dummy data abu-abu 100%
    const chartData =
        total === 0
            ? [
                  {
                      id: 0,
                      value: 1,
                      label: "Data tidak tersedia",
                      color: "#cfd8dc", // Abu-abu
                  },
              ]
            : [
                  {
                      id: 0,
                      value: data.laki_laki,
                      label: `Laki-laki (${(
                          (data.laki_laki / total) *
                          100
                      ).toFixed(0)}%)`,
                      color: "#42a5f5",
                  },
                  {
                      id: 1,
                      value: data.perempuan,
                      label: `Perempuan (${(
                          (data.perempuan / total) *
                          100
                      ).toFixed(0)}%)`,
                      color: "#ef5350",
                  },
              ];

    return (
        <Box
            width={"100%"}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={2}
            borderRadius="8px"
        >
            <PieChart
                series={[
                    {
                        data: chartData,
                        highlightScope: {
                            faded: "global",
                            highlighted: "item",
                        },
                        faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                        },
                    },
                ]}
                width={250}
                height={200}
                legend={
                    total === 0
                        ? undefined // Legend tidak perlu saat data kosong
                        : {
                              direction: "column",
                              position: {
                                  vertical: "middle",
                                  horizontal: "right",
                              },
                              padding: 4,
                              itemMarkWidth: 12,
                              itemGap: 8,
                              labelStyle: {
                                  fontSize: 12,
                              },
                          }
                }
            />

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }} // Margin atas biar agak turun
            >
                jumlah keseluruhan: {total}
            </Typography>
        </Box>
    );
}
