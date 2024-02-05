import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async() => {
        try {
            await axios.get("http://localhost:3001/api/user/refreshtoken", {
                withCredentials: true
            })
            .then((res) => {
                setAuth((prev) => {
                console.log(JSON.stringify(prev));
                console.log(res.data.data.token.accessToken);
                return {
                    ...prev, 
                    username: res.data.data.user.username,
                    userLevel: res.data.data.user.level,
                    accessToken: res.data.data.token.accessToken};
                });
                return res.data.data.token.accessToken;
            })
            .catch((err) => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }

    return refresh; 
}

export default useRefreshToken;