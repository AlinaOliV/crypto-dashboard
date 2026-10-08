import { Link } from "react-router-dom";

const styles = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#ccc",
  },
  title: {
    fontSize: "72px",
    marginBottom: "40px",
  },
  message:{
    fontSize: "24px",
    marginBottom: "40px"
  },
  link: {
    color: "#61dafb",
    textDecoration: "none",
    fontSize: "18px",
  },
};

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Not Found</h1>
      <p style={styles.message}>The page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
