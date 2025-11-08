import Hero from "../components/Hero";
import AboutImg from "../assets/assets/night.jpg";
import Trip from "../components/Trip";
function Service() {
  return (
    <>
      {" "}
      <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="Service"
        url="/tourpackage"
        btnclass="hide"
      />
      <Trip />
    </>
  );
}

export default Service;
