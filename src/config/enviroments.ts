export const paths = {
    configUsers: (): string => {
        const USERS_PATH = `http://localhost:5002/api`;
        return USERS_PATH;
    },

    configComplaint: (): string => {
        const COMPLAINT_PATH = `http://localhost:5001/api`;
        return COMPLAINT_PATH;
    },
};