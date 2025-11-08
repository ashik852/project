// import { useAuth } from "../contex/AuthContext";
import Trip from "../components/Trip";
import Destination from "../components/Destination";
import Hero from "../components/Hero";
export default function Home() {
  // const { user } = useAuth();
  return (
    <>
      <Hero
        cName="hero"
        heroImg="https://images.unsplash.com/photo-1702048685632-ca55bd918e31?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Your Journey Your Story"
        text="Chosen Your Favourite Destination"
        buttonText="Travel Plan"
        url="/tourpackage"
        btnclass="show"
      />
      <Destination />
      <Trip />
    </>
  );
}
