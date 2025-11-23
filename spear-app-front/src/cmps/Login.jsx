import { Link } from "react-router";

export function Login(){

    return(
        <form className="flex column" >
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password">Password: </label>
            <input type="text" name="password" id="password" />
            <p>Not a user? <Link to="/register">Register now</Link></p>
        </form>
    )
}