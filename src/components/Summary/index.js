import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import HighMap from "../../Charts/HighMap";
import LineChart from "../../Charts/LineChart";

export default function Summary({ report, selectedCountryId }) {
    const [mapData, setMapData] = useState({});

	useEffect(() => {
		// 'vn'. 'us'
		if (selectedCountryId) {
			import(
				`@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
			).then(res => setMapData(res));
		}
	}, [selectedCountryId]);

	return (
		<Grid container spacing={5} style={{ marginTop: 30 }}>
			{/* Charts */}
			<Grid item sm={8} xs={12}>
				<LineChart data={report}></LineChart>
			</Grid>
			{/* Map */}
			<Grid item sm={4} xs={12}>
                <HighMap mapData={mapData} />
            </Grid>
		</Grid>
	);
}
