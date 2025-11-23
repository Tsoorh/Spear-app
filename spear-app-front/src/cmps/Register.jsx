export function Register() {
    return(
        <form className="register-form">
            <label htmlFor="fname">First name: </label>
            <input type="text" name="fname" id="fname"/>
            <label htmlFor="lname">Surname: </label>
            <input type="text" name="lname" id="lname"/>
            <label htmlFor="bdate">Birth date: </label>
            <input type="date" name="bdate" id="bdate"/>
            <label htmlFor="username"></label>
            <input type="text" />
        </form>

    )
}