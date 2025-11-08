import "./Trip.css";
import TripData from "./TripData";
import Trip1 from "../assets/assets/2.jpg";
import Trip2 from "../assets/assets/3.jpg";
import Trip3 from "../assets/assets/4.jpg";
function Trip() {
  return (
    <div className="trip">
      <h1>Recent Trips</h1>
      <p>You can discover unique destinations using Google Maps</p>
      <div className="tripcard">
        <TripData
          image={Trip1}
          heading="Trip in Indonesia"
          text="Indonesia, officially the Reoublic of Indonesia, is a country in outheast Asia and Oceania between the  Indian and Pacific ocean.it consists of over 17000 island,including sumatra,java,sulawesi, and parts of borneo and new guinea"
        />
        <TripData
          image={Trip2}
          heading="Trip in France"
          text="France, one of the world’s most popular travel destinations, is renowned for its rich history, art, and gastronomy. From the romantic streets of Paris, featuring the Eiffel Tower and Louvre Museum, to the sun-kissed vineyards of Bordeaux and Burgundy, the country offers a diverse experience for every traveler. Visitors can explore the stunning French Riviera, medieval towns in Alsace, and the majestic castles of the Loire Valley"
        />
        <TripData
          image={Trip3}
          heading="Trip in Sri Lanka"
          text="Sri Lanka, often called the “Pearl of the Indian Ocean,” is a captivating island nation renowned for its lush landscapes, golden beaches, and rich cultural heritage. From the ancient rock fortress of Sigiriya and the sacred city of Kandy to the scenic tea plantations of Nuwara Eliya, the country offers diverse experiences for travelers. Wildlife enthusiasts can explore national parks like Yala and Udawalawe, home to elephants, leopards, and exotic birds."
        />
      </div>
    </div>
  );
}

export default Trip;
