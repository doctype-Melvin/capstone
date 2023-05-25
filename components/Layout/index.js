import Navigation from "../Navigation";
export default function Layout({ children }) {
  return (
    <section>
      {children}
      <Navigation />
    </section>
  );
}
