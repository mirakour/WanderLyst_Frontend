import React from "react";
import { Link } from "react-router-dom";

export default function Inspiration() {
  const trips = [
    {
      group: "The Sun Chasers",
      names: "Liam, Emma, Noah",
      place: "Maldives",
      description: "7 days of pure relaxation and water adventures at luxurious overwater villas.",
      video: "https://res.cloudinary.com/dsz4gijyg/video/upload/v1752950262/vecteezy_luxury-water-houses-in-the-maldives_39304896_wtxqci.mp4"
    },
    {
      group: "The Spicy Nomads",
      names: "Sophie, Jake, Maya",
      place: "Phuket, Thailand",
      description: "5 days enjoying a vibrant flower parade, night markets, and island hopping.",
      video: "https://res.cloudinary.com/dsz4gijyg/video/upload/v1752950329/vecteezy_flower-parade-tradition-at-ban-saeng-pha-na-haeo-district_45704928_ft4iuu.mp4"
    },
    {
      group: "The Island Hoppers",
      names: "Olivia, Lucas, Mia",
      place: "Palawan, Philippines",
      description: "10 days of snorkeling, kayaking, and exploring hidden lagoons.",
      video: "https://res.cloudinary.com/dsz4gijyg/video/upload/v1752950464/vecteezy_tropical-paradise-beach_52003527_hj54vb.mp4"
    },
    {
      group: "The City Wanderers",
      names: "Ava, Ethan, Grace",
      place: "Brooklyn, New York",
      description: "3 days strolling the Brooklyn Bridge, art galleries, and foodie tours.",
      video: "https://res.cloudinary.com/dsz4gijyg/video/upload/v1752950284/vecteezy_new-york-us-03-03-2025-brooklyn-bridge-pedestrian-walkway_65333539_bqfvit.mp4"
    }
  ];

  return (
    <div className="inspiration-container">
      <h2 style={{ marginTop: "5rem" }}>Find Your Next Adventure</h2>
      <div className="inspiration-grid">
        {trips.map((trip, index) => (
          <div key={index} className="inspiration-box">
            <video src={trip.video} controls muted playsInline className="inspiration-video" />
            <h3>{trip.group}</h3>
            <p><strong>Members:</strong> {trip.names}</p>
            <p><strong>Location:</strong> {trip.place}</p>
            <p>{trip.description}</p>
          </div>
        ))}
      </div>
      <div className="cta">
        <h3>Feeling inspired? Let’s go and plan a memorable trip!</h3>
        <Link to="/users/register">
          <button className="join-now-btn">Join Now</button>
        </Link>
      </div>
    </div>
  );
}