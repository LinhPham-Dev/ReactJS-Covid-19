import React, { useState, useEffect } from "react";
import { sortBy } from "lodash";
import CountrySelector from "./components/CountrySelector";
import { getCountries, getReportByCountry } from "./apis";
import Summary from "./components/Summary";
import Highlight from "./components/Highlight";
import { Container, Typography } from "@material-ui/core";
import "@fontsource/roboto";
import moment from 'moment';
import "moment/locale/vi";

moment.locale('vi');

const App = () => {
	const [countries, setCountries] = useState([]);
	const [selectedCountryId, setSelectedCountryId] = useState("");
	const [report, setReport] = useState([]);

	useEffect(() => {
		getCountries().then((res) => {
      // Sort Countries by Alphabet
      const countries = sortBy(res.data, 'Country');
			setCountries(countries);
			setSelectedCountryId('vn');
		});
	}, []);

	const handleOnChange = (e) => {
		setSelectedCountryId(e.target.value);
	};

	// Reload Data
	useEffect(() => {
		if (selectedCountryId) {
			const selectedCountry = countries.find(
				(country) => country.ISO2.toLowerCase() === selectedCountryId
			);

			getReportByCountry(selectedCountry.Slug).then((res) => {
				// Remove last item
				res.data.pop();
				setReport(res.data);
			});
		}
	}, [selectedCountryId, countries]);

	return (
		<Container style={{ marginTop: 20, textAlign: "center" }}>
			<Typography variant="h3" style={{ color: '#ff3d00' }}>
				Số liệu COVID-19 - {moment().format("Y")}
			</Typography>
      <Typography variant="h5" style={{ color: '#651fff' }}>
				Author: Phạm Ngọc Linh
			</Typography>
			<Typography>Day: {moment().format("LLL")}</Typography>
			<CountrySelector
				handleOnChange={handleOnChange}
				countries={countries}
				value={selectedCountryId}
			/>
			<Highlight report={report} />
			<Summary selectedCountryId={selectedCountryId} report={report} />
		</Container>
	);
};

export default App;
