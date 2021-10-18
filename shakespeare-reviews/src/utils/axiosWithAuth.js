import axios from 'axios';

 const axiosWithAuth = () => {
	const token = process.env.REACT_APP_TOKEN
    const URL = process.env.REACT_APP_API
	return axios.create({
		headers: {
			"X-API-Key": token,
		},
		baseURL: URL,
	});
};

export default axiosWithAuth;
