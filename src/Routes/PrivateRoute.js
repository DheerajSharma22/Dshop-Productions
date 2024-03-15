import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user } = useSelector(state => state.profile);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login');
        // eslint-disable-next-line
    }, [user]);

    return children;
}

export default PrivateRoute;