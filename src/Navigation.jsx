export default function Navigation(props) {
  return (
    <nav className={props.darkMode ? "dark" : ""}>
      <h1>TriviA</h1>
      <button
        onClick={props.toggleDarkMode}
        className={props.darkMode ? "dark" : ""}
      >
        {props.darkMode ? "Light Theme" : "Dark Theme"}
      </button>
    </nav>
  );
}
