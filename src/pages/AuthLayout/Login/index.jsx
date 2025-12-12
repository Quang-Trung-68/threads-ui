export default function Login() {
  return (
    <>
      <h1>Đăng nhập vào F8</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input required id="username" type="text" name="username"></input>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input required id="password" type="password" name="password"></input>
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </>
  );
}
