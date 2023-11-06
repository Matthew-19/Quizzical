import React from "react";
import { Link } from "react-router-dom";

import bottomBlobs from "../assets/images/blobs-bottom.png";
import topBlobs from "../assets/images/blobs-top.png";

export default function Home() {
  return (
    <section className="home">
      <img src={topBlobs} className="top" />
      <img src={bottomBlobs} className="bottom" />
      <div className="home--container">
        <h1>Quizzical</h1>
        <Link to="questions">
          <button>Start quiz</button>
        </Link>
      </div>
    </section>
  );
}
