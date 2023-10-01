import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import * as React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box } from "@mui/material";

const style = {
	backdrop: {
		backdropFilter: "blur(12px)",
	},
	box: {
		color: "#ECECEC",
		position: "absolute" as "absolute",
		top: "10%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "90vw",
		paddingTop: "30px",
		maxWidth: "1250px",
		outline: 0,
	},
	close: {
		position: "absolute",
		padding: "10px",
		top: 0,
		right: 0,
		borderRadius: "50%",
		height: "30px",
		width: "30px",
		"&:hover": {
			backgroundColor: "rgba(255, 255, 255, 0.1)",
			cursor: "pointer",
			transition: "linear 200ms",
		},
	},
};

export const FullScreenModal = ({
	open,
	setModalOpen,
	children,
}: {
	open: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}) => {
	const handleClose = () => setModalOpen(false);

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				// slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
				sx={style.backdrop}>
				<Fade in={open}>
					<Box sx={style.box}>
						<CloseRoundedIcon
							fontSize='large'
							sx={style.close}
							onClick={handleClose}
						/>
						<div>{children}</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};
