import {auth} from "../firebase.ts";

export default function Home() {
    const logout = async () => {
        await auth.signOut();
    }
    return (
        <h1>
            <button onClick={logout}>Logout</button>
        </h1>
    )
}