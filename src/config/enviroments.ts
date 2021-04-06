export const paths = {
	configUsers: (): string => {
		const USERS_PATH = `http://${process.env.USERS_HOST}:${process.env.USERS_PORT}/api`;
		return USERS_PATH;
	},

	configComplaint: (): string => {
		const COMPLAINT_PATH = `http://${process.env.COMPLAINTS_HOST}:${process.env.COMPLAINTS_PORT}/api`;
		return COMPLAINT_PATH;
	},

	configReport: (): string => {
		const REPORT_PATH = `http://${process.env.REPORTS_HOST}:${process.env.REPORTS_PORT}/api`;
		return REPORT_PATH;
	},
};
