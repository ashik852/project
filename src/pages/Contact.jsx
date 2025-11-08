import Hero from "../components/Hero";
import AboutImg from "../assets/assets/4.jpg";

import ContactForm from "../components/ContactForm";
function Contact() {
  return (
    <>
      <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="Contact"
        url="/tourpackage"
        btnclass="hide"
      />
      <ContactForm />
    </>
  );
}

export default Contact;
