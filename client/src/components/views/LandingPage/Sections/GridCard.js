import React from "react";
import { Col } from "antd";

function GridCard(props) {
  if (props.actor) {
    return (
      <div>
        <Col lg={6} md={8} xs={24}>
          <div style={{ position: "relative" }}>
              <img
                style={{ width: "100%", height: "320px" }}
                src={props.image}
                alt="img"
              />
          </div>
        </Col>
      </div>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              src={props.image}
              alt="img"
            />
          </a>
        </div>
      </Col>
    );
  }
}

export default GridCard;
