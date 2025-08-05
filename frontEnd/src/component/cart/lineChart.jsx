import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Paper, Typography } from "@mui/material";
import TitleDashboard from "../dashboard/Title";
import { faChartGantt } from "@fortawesome/free-solid-svg-icons";

export default function PesertaLine({ data }) {
    const xLabels = data.map((item) => item?.tahun_ajaran);
    const yValues = data.map((item) => item?.total_peserta_didik);

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
                width: "100%",
            }}
        >
            <TitleDashboard icon={faChartGantt}>Tren Peserta Didik dalam 10 Tahun Terakhir</TitleDashboard>

            <Box sx={{ width: "100%", height: 350 }}>
                <LineChart
                    xAxis={[
                        {
                            scaleType: "point",
                            data: xLabels,
                        },
                    ]}
                    series={[
                        {
                            data: yValues,
                            label: "Peserta Didik",
                            area: true, // area di bawah garis
                            color: "#1976d2", // warna MUI primary
                        },
                    ]}
                    height={350}
                    // Tambah margin supaya label kanan & bawah tidak terpotong
                    margin={{ left: 30, right: 40, top: 20, bottom: 50 }}
                    sx={{
                        "& .MuiLineElement-root": {
                            strokeWidth: 3,
                        },
                        "& .MuiAreaElement-root": {
                            fillOpacity: 0.2,
                        },
                        "& .MuiMarkElement-root": {
                            stroke: "#1976d2",
                            fill: "#fff",
                            strokeWidth: 2,
                        },
                    }}
                />
            </Box>
        </Paper>
    );
}
