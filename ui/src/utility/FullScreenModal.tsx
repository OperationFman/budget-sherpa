import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box } from "@mui/material";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import * as React from "react";
import styles from "./FullScreenModal.module.scss";

export const FullScreenModal = ({
	open,
	setModalOpen,
	children,
}: {
	open: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}) => {
	const handleClose = () => {
		setModalOpen(false);
	};

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
				className={styles.backdrop}
				sx={{ fontFamily: "Inter, sans-serif" }}>
				<Fade in={open}>
					<Box className={styles.box}>
						<CloseRoundedIcon
							fontSize='large'
							className={styles.close}
							onClick={handleClose}
						/>
						<div>{children}</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};
