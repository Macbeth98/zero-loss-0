import React from "react";
import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="hero-background">
                <Navbar />
                <div style={{ padding: "25px 0px" }}>
                    {/* <Play /> */}
                    <HowItWorks />
                </div>
                {/* <SelectCoin />{" "} */}
            </div>
        </>
    );
};

export default Home;
