import * as React from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

const TaskDialog = (props) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className="visible sm:hidden">
			<Button
				color="secondary"
				className="rounded-0 m-4 justify-center"
				variant="contained"
				onClick={handleClickOpen}
			>
				Tasks
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Tasks</DialogTitle>
				<DialogContent>
					<Card className="min-w-64 md:min-w-175 rounded m-9 min-h-79 max-w-175">
						<CardContent>
							<Typography className="text-md" color="text.primary" gutterBottom>
								Task Returned To me
							</Typography>
							<Typography variant="h5" component="div" align="center">
								20
							</Typography>
						</CardContent>
					</Card>

					<Divider variant="middle" />

					<Card className="min-w-64 md:min-w-175 rounded m-9 min-h-79 max-w-175">
						<CardContent>
							<Typography className="text-md" color="text.primary" gutterBottom>
								Task Returned By me
							</Typography>
							<Typography variant="h5" component="div" align="center">
								41
							</Typography>
						</CardContent>
					</Card>
				</DialogContent>
			</Dialog>
		</div>
	);
};
export default TaskDialog;
