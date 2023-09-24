import React from "react";
import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";
import { Link } from "react-router-dom";
import Play from "../components/Play";
import SelectCoin from "../components/SelectCoin";

const Home = () => {
    return (
        <>
            <div className="hero-background">
                <Navbar />
                <div style={{ padding: "25px 0px", height: "80vh" }}>
                    <Play />
                    <HowItWorks />
                </div>
                <SelectCoin />
            </div>
        </>
    );
};

export default Home;
