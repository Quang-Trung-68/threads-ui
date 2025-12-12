export default function Register() {
  return (
    <>
      <h1>Đăng ký tài khoản mới</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input required id="username" type="text" name="username"></input>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input required id="password" type="password" name="password"></input>
        </div>
        <div>
          <label htmlFor="reEnterPassword">Enter password again:</label>
          <input required id="reEnterPassword" type="password" name="reEnterPassword"></input>
        </div>
        <button type="submit">Đăng ký</button>
      </form>
    </>
  );
}
