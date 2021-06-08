import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highchart from "highcharts";
import moment from 'moment';
import { Button, ButtonGroup } from "@material-ui/core";

const generateOptions = (data, currentCountry) => {
    const categories = data.map((item) => moment(item.Date).format('DD/MM/YY'));
    return {
        chart: {
            height: 500,
        },
        title: {
            text: (currentCountry !== 'Quốc gia không có ca mắc COVID_19' ? ('Biểu đồ số ca mắc COVID-19 theo ngày tại ' + currentCountry) : currentCountry ),
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ["#F3585B"],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
        },
        tooltip: {
            headerFormat:
                '<span style="font-size: 10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color: {series.color}; padding: 0">{series.name}: </td>' +
                '<td style="padding: 0"><b>{point.y} ca</b></td><tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            colum: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Ca nhiễm',
                data: data.map((item) => item.Confirmed)
            },
        ],
    };
};

const LineChart = ({ data }) => {
    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState('all');

    useEffect(() => {

        // Handler Select Days
        let customData = [];
        // Change Views
        switch(reportType) {
            case 'all': 
            customData = data;
            break;
            // 30 days
            case '30': 
            customData = data.slice(data.length - 30);
            break;
            // 7 days
            case '7':
            customData = data.slice(data.length - 7)
            break;
            // Default
            default: 
            customData = data;
            break;
        }

        setOptions(generateOptions(customData, (customData[0] ? customData[0].Country : 'Quốc gia không có ca mắc COVID_19')));

    }, [data, reportType]);

	return (
		<div>
            <ButtonGroup size='small' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button color={reportType === 'all' ? 'secondary' : ''} onClick={() => setReportType('all')}>Tất cả</Button>
                <Button color={reportType === '30' ? 'secondary' : ''} onClick={() => setReportType('30')}>30 ngày</Button>
                <Button color={reportType === '7' ? 'secondary' : ''} onClick={() => setReportType('7')}>7 ngày</Button>
            </ButtonGroup>
			<HighchartsReact
				highcharts={Highchart}
				options={options}
			/>
		</div>
	);
}

export default React.memo(LineChart);