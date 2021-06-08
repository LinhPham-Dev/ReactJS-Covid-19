import React from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import CountUp from 'react-countup';

const useStyles = makeStyles({
    wrapper: (props) => {
      if (props.type === 'confirmed') return { border: '5px solid #e7de3a' };
      if (props.type === 'recovered') return { border: '5px solid #28a745' };
      else return { border: '5px solid #c9302c' };
    },
    title: { fontSize: 18, marginBottom: 5 },
    count: { fontWeight: 'bold', fontSize: 18 },
  });

export const HighlightCart = ({ title, count, type}) => {
    const styles = useStyles({type});

	return (
		<div>
			<Card className={styles.wrapper}>
				<CardContent>
					<Typography component="p" variant="body2" className={styles.title}>
						{ title }
					</Typography>
					<Typography component="span" variant="body2"  className={styles.count}>
						<CountUp end={ count || 0 } duration={2} separator=' ' />  
						{/* { count } */}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};
