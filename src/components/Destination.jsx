import Mountain1 from "../assets/pic-2.jpg";
import Mountain2 from "../assets/pic-7.jpg";
import Mountain3 from "../assets/pic-3.jpg";
import Mountain4 from "../assets/pic-4.jpg";
import Mountain5 from "../assets/pic-5.jpg";
import Mountain6 from "../assets/pic-6.jpg";
import "./Destination.css";
import DestinationData from "./DestinationData";
function Destination() {
  return (
    <>
      <div className="destination">
        <h1>Popular Destination</h1>
        <p>Tours give you the opportunity to see a lot, within a time frame</p>
      </div>
      <DestinationData
        className="first-des"
        heading="Exploring the Eiffel Tower: Paris’ Iconic Landmark"
        text="The Eiffel Tower, located in Paris, France, is one of the world’s most recognizable landmarks. Standing at 330 meters tall, it was constructed between 1887 and 1889 by Gustave Eiffel for the 1889 World’s Fair. Visitors can explore the tower via stairs or elevators, enjoy breathtaking panoramic views of Paris from its platforms, and experience the magical evening light show. Planning ahead with online tickets and visiting during less crowded hours ensures a memorable and smooth experience."
        img1={Mountain1}
        img2={Mountain2}
      />
      <DestinationData
        className="first-des-reverse"
        heading="Exploring Northern Italy: Scenic Landscapes and Historic Towns"
        text="Northern Italy is a region full of charm, combining breathtaking landscapes with rich history. From the serene lakes of Como and Garda to the snow-capped Alps, and from the artistic cities of Milan and Turin to quaint medieval towns, there is something for every traveler. Visitors can enjoy world-renowned cuisine, vibrant markets, and architectural marvels, making Northern Italy a perfect destination for culture, nature, and culinary experiences."
        img1={Mountain3}
        img2={Mountain4}
      />
    </>
  );
}

export default Destination;
