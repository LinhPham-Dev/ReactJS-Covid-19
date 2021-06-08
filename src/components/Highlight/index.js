import React from "react";
import { Grid } from "@material-ui/core";
import { HighlightCart } from "./HighlightCart";

export default function Highlight({ report }) {
	const data = report && report.length ? report[report.length - 1] : [];

	const summary = [
		{
			title: "Số Ca Nhiễm",
			count: data.Confirmed,
			type: "confirmed",
		},
		{
			title: "Số Ca Khỏi",
			count: data.Recovered,
			type: "recovered",
		},
		{
			title: "Số Ca Tử vong",
			count: data.Deaths,
			type: "death",
		},
	];

	return (
		<Grid container spacing={3}>
			{summary.map((item) => (
				<Grid item sm={4} xs={12} key={item.type}>
					<HighlightCart
						title={item.title}
						count={item.count}
						type={item.type}
					/>
				</Grid>
			))}
		</Grid>
	);
}
