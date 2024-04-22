// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Loader from "../layout/Loader";

// const ProtectedRoute = ({ children, isAdmin = false, isSecretary = false, isMechanic = false }) => {
//     const { isAuthenticated, loading, user } = useSelector(state => state.authUser);

//     if (loading === false) {
//         if (isAuthenticated === false) {
//             return <Navigate to='/login' />
//         }
//         if (isAdmin === true && user.role !== 'admin') {
//             return <Navigate to='/' />
//         }
//         if (isSecretary === true && user.role !== 'secretary') {
//             return <Navigate to='/' />
//         }
//         if (isMechanic === true && user.role !== 'mechanic') {
//             return <Navigate to='/' />
//         }
//         return children
//     }
//     return <Loader />
// }

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";

const ProtectedRoute = ({ children, isAdmin = false, isSecretary = false, isMechanic = false }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.authUser);

    if (loading === false) {
        if (isAuthenticated === false) {
            return <Navigate to='/login' />;
        }
        if (isAdmin === true && (!user || user.role !== 'admin')) {
            return <Navigate to='/' />;
        }
        if (isSecretary === true && (!user || user.role !== 'secretary')) {
            return <Navigate to='/' />;
        }
        if (isMechanic === true && (!user || user.role !== 'mechanic')) {
            return <Navigate to='/' />;
        }
        return children;
    }
    return <Loader />;
}

export default ProtectedRoute;
