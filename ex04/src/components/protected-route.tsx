import type {ReactNode} from "react";
import {auth} from "../firebase.ts";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children}: {children: ReactNode}) {

    const user = auth.currentUser;

    return !!user ? children : <Navigate to="/login" />;
}