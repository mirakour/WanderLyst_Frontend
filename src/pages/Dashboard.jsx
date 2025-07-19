import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Animated tagline */}
      <motion.h2
        className="dashboard-tagline"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        Where your journeys begin — and never truly end.
      </motion.h2>

      {/* Video section */}
      <div className="dashboard-box large-media">
        <video width="100%" height="auto" controls autoPlay muted loop>
          <source src="/videos/vecteezy_summer-car-trip-and-young-family-on-vacation_19966801.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Why WanderLyst */}
      <h3>Why WanderLyst?</h3>
      <p>
        Planning a group trip shouldn’t feel like herding cats. WanderLyst helps friends turn chaotic group chats into organized adventures. With shared itineraries, assigned tasks, and real-time updates, everyone stays in sync from planning to takeoff.
      </p>

      {/* Jules story */}
      <div className="dashboard-box large-media">
        <h4>Meet Jules.</h4>
        <img src="/images/vecteezy_tourist-woman-with-camera-in-city-square_47205418.jpg" alt="Jules at the beach" />
        <p>
          Jules is that friend who ends up planning every trip — not because she loves logistics, but because if she doesn’t, it never gets done. WanderLyst changed everything: shared trip boards, deadlines, voting on ideas, and a stress-free way to keep everyone in sync.
          After their last adventure, WanderLyst became a memory keeper too: storing notes, locations, and inside jokes so their journey lives on.
        </p>
      </div>

      {/* Call to action */}
      <h4>Start planning today.</h4>
      <p>Make travel simple, together — with WanderLyst.</p>
      <Link to="/users/register">
        <button className="join-button">Join Now</button>
      </Link>
    </div>
  );
}