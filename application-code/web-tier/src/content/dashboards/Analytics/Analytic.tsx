import { Grid, Card, CardHeader, Box, useTheme, useMediaQuery, Divider, Tabs, Tab, Alert, CardContent, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import useApiService from 'src/hooks/useApiService';
import { OptionsHttpMethods } from 'src/models/optionsValues';
import Plot from 'src/components/Plot/Plot';
import { PlotSeries } from 'src/models/seriesPlot';

const dummyData: PlotSeries[] = [
  {
    "name": "Bicep",
    "data":[
      {"y":54,"x": new Date("2024-09-28T07:00:00.000Z")},
      {"y":53.5,"x":new Date("2024-07-06T07:00:00.000Z")},
      {"y":43,"x":new Date("2023-07-29T07:00:00.000Z")},
      {"y":53,"x":new Date("2022-11-19T08:00:00.000Z")},
      {"y":52,"x":new Date("2022-08-06T07:00:00.000Z")},
      {"y":52,"x":new Date("2022-05-21T07:00:00.000Z")},
      {"y":52,"x":new Date("2022-02-12T08:00:00.000Z")}
    ]
  },
    {
      "name":"Forearm",
      "data":[
        {"y":49,"x":new Date("2024-09-28T07:00:00.000Z")},
        {"y":48,"x":new Date("2024-07-06T07:00:00.000Z")},
        {"y":48,"x":new Date("2023-07-29T07:00:00.000Z")},
        {"y":48,"x":new Date("2022-11-19T08:00:00.000Z")},
        {"y":47,"x":new Date("2022-08-06T07:00:00.000Z")},
        {"y":47,"x":new Date("2022-05-21T07:00:00.000Z")},
        {"y":47,"x":new Date("2022-02-12T08:00:00.000Z")}
      ]
  }
]

function AnalyticsPlots() {
  const theme = useTheme();
  const { httpRequest } = useApiService();
  const contentHeightLg = 400;
  const contentWidthtLg = 350;
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const [matches, setMatches] = useState<any[]>([]);
  const [armMeasureTabSelection, setArmMeasureTabSelection] = useState('right');
  const [weightSeries, setWeightSeries] = useState([]);
  const [leftArmMeasurementsSeries, setLeftArmMeasurementsSeries] = useState([]);
  const [rightArmMeasurementsSeries, setRightArmMeasurementsSeries] = useState([]);
  const [victoriesSeries, setVictoriesSeries] = useState([]);

  useEffect(() => {
    setMatches([]);
    getPullerMatches();
  }, [])

  const handleArmMeasureTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setArmMeasureTabSelection(newValue);
  };

  const getPullerMatches = () => {
    const address = `http://localhost:8080/matches/search?pullerId=`;
    httpRequest(OptionsHttpMethods.GET, address).then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
        console.log(error);
    }).finally(() => window.scrollTo(0, 0));
  }

  return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={mobile? 1 : 2}
      >
        <Grid item xs={12} md={6}>
          {/* {matches.length > 0 && <Card sx={{ height: "100%" }}> */}
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Weight Change Over Time" sx={{ pb: 2 }} />
            <Divider />
            <Box pr={2}>
              {dummyData &&
                <Plot
                  series={dummyData}
                  plotConfig={{
                    xLabelType: "datetime",
                    showDataLabels: false,
                    type: "area",
                    metric: "kg"
                  }}
                  height={contentHeightLg - 5} />
              }
            </Box>
          </Card>
          {/* } */}
          {/* {matches.length === 0 && <Skeleton variant="rectangular" sx={{ height: contentHeightLg }} />} */}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* {matches.length > 0 && <Card sx={{ p: 1, height: "100%" }}> */}
          <Card sx={{ p: 1, height: "100%" }}>
            <Tabs
              variant="fullWidth"
              value={armMeasureTabSelection}
              onChange={handleArmMeasureTabChange}
            >
              <Tab value="right" label="Right Arm Measurement" />
              <Tab value="left" label="Left Arm Measurement" />
            </Tabs>
            <Divider sx={{ mt: 1 }} />
            <Box>
                <Plot
                  series={dummyData}
                  plotConfig={{
                    xLabelType: "datetime",
                    showDataLabels: false,
                    type: "area",
                    metric: "cm"
                  }}
                  height={contentHeightLg - 15}
                />
            </Box>
          </Card>
          {/* } */}
          {/* {matches.length === 0 && <Skeleton variant="rectangular" sx={{ height: contentHeightLg }} />} */}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* {matches.length > 0 && <Card sx={{ p: 1, height: "100%" }}> */}
          <Card sx={{ p: 1, height: "100%" }}>
            <Tabs
              variant="fullWidth"
              value={armMeasureTabSelection}
              onChange={handleArmMeasureTabChange}
            >
              <Tab value="right" label="Right Arm Measurement" />
              <Tab value="left" label="Left Arm Measurement" />
            </Tabs>
            <Divider sx={{ mt: 1 }} />
            <Box>
                <Plot
                  series={dummyData}
                  plotConfig={{
                    xLabelType: "datetime",
                    showDataLabels: false,
                    type: "area",
                    metric: "cm"
                  }}
                  height={contentHeightLg - 15}
                />
            </Box>
          </Card>
          {/* } */}
          {/* {matches.length === 0 && <Skeleton variant="rectangular" sx={{ height: contentHeightLg }} />} */}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* {matches.length > 0 && <Card sx={{ p: 1, height: "100%" }}> */}
          <Card sx={{ p: 1, height: "100%" }}>
            <Tabs
              variant="fullWidth"
              value={armMeasureTabSelection}
              onChange={handleArmMeasureTabChange}
            >
              <Tab value="right" label="Right Arm Measurement" />
              <Tab value="left" label="Left Arm Measurement" />
            </Tabs>
            <Divider sx={{ mt: 1 }} />
            <Box>
                <Plot
                  series={dummyData}
                  plotConfig={{
                    xLabelType: "datetime",
                    showDataLabels: false,
                    type: "area",
                    metric: "cm"
                  }}
                  height={contentHeightLg - 15}
                />
            </Box>
          </Card>
          {/* } */}
          {/* {matches.length === 0 && <Skeleton variant="rectangular" sx={{ height: contentHeightLg }} />} */}
        </Grid>
        {/* <Grid item xs={12} md={6}>
          {matches.length > 0 && <Card sx={{ height: "100%" }}>
            <CardHeader title="Match Record" sx={{ pb: 2 }} />
            <Divider />
            <Box pr={2}>
              {victoriesSeries &&
                <Plot
                  series={victoriesSeries}
                  plotConfig={{
                    xLabelType: "numeric",
                    showDataLabels: true,
                    type: "bar",
                    metric: ""
                  }}
                  height={contentHeightLg - 5} />
              }
            </Box>
          </Card>}
          {matches.length === 0 && <Skeleton variant="rectangular" sx={{ height: contentHeightLg }} />}
        </Grid> */}
    </Grid>
  );
}

export default AnalyticsPlots;
