import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
    const { user } = useSelector(state => state.profile);
    const navigate = useNavigate();



    useEffect(() => {
        if (user) navigate('/dashboard/my-profile');
        // eslint-disable-next-line
    }, [user]);

    return children;
}

export default OpenRoute;