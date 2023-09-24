import React from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <>
      <div
        className="container"
        style={{
          padding: "0px 30px"
        }}
      >
        <div
          className="row"
          style={{ padding: "20px 10px", marginTop: "10px" }}
        >
          <div className="col howHover">
            <i
              className="fab fa-ethereum"
              style={{ fontSize: "50px", color: "yellow", padding: "0px 50px" }}
            />
            <p
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold"
              }}
            >
              1. Select Coin
            </p>
          </div>
          <div className="col howHover">
            <i
              className="fas fa-hand-pointer"
              style={{ fontSize: "50px", color: "yellow", padding: "0px 60px" }}
            />
            <p
              style={{
                color: "white",
                fontSize: "20px",

                fontWeight: "bold"
              }}
            >
              2. Choose Lottery
            </p>
          </div>
          <div className="col howHover">
            <i
              className="fas fa-ticket-alt"
              style={{ fontSize: "50px", color: "yellow", padding: "0px 30px" }}
            />
            <p
              style={{
                color: "white",
                fontSize: "20px",

                fontWeight: "bold"
              }}
            >
              3. Buy Ticket
            </p>
          </div>
          <div className="col howHover">
            <i
              className="fas fa-trophy"
              style={{ fontSize: "50px", color: "yellow", padding: "0px 60px" }}
            />
            <p
              style={{
                color: "white",
                fontSize: "20px",

                fontWeight: "bold"
              }}
            >
              4. Win / Get Refund
            </p>
          </div>
        </div>
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <button
            onClick={e => window.scrollTo(0, 600)}
            className="btn btn-light btn-lg pulse-button"
            style={{ borderRadius: "25px" }}
          >
            <i className="fas fa-dice-five"></i>{" "}
            <span style={{ fontWeight: "bold" }}>PLAY NOW</span>
          </button>
          &nbsp;&nbsp;{" "}
          <Link to="/rule">
            <button
              className="btn btn-outline-light"
              style={{
                borderRadius: "25px",
                padding: "0.6rem 1rem"
              }}
            >
              <i className="far fa-question-circle"></i>{" "}
              <span>Learn how to play</span>
            </button>
          </Link>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default HowItWorks;
