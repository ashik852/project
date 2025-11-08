import Hero from "../components/Hero";
import AboutImg from "../assets/assets/2.jpg";
import AboutUs from "../components/AboutUs";
function About() {
  return (
    <>
      <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="About"
        url="/tourpackage"
        btnclass="hide"
      />
      <AboutUs />
    </>
  );
}

export default About;
