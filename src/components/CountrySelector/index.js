import {
	FormControl,
	FormHelperText,
	InputLabel,
	NativeSelect,
} from "@material-ui/core";
import React from "react";

export default function CountrySelector({ value, handleOnChange, countries }) {
	return (
		<FormControl style={{ margin: 20 }}>
			<InputLabel htmlFor="country-selector" shrink>
				Countries :
			</InputLabel>
			<NativeSelect
				value={value}
				onChange={handleOnChange}
				inputProps={{
					name: "country",
					id: "country-selector",
				}}
			>
				{countries.map((country, index) => {
					return (
						<option key={index} value={country.ISO2.toLowerCase()}>
							{country.Country}
						</option>
					);
				})}
			</NativeSelect>
			<FormHelperText>Lựa chọn quốc gia !</FormHelperText>
		</FormControl>
	);
}
