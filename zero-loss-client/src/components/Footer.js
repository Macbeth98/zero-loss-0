import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const Footer = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="hero">
            <footer className="footer" style={{ position: "relative", bottom: "0" }}>
                <hr />
                <div className="container">
                    <div className="row" style={{ color: "white", textAlign: "center" }}>
                        <div className="col-12">
                            <span style={{ display: "inline-block", marginRight: "20px" }}>
                                <Link style={{ color: "white", textDecoration: "none" }} to="/">
                                    Home
                                </Link>
                            </span>
                            <span style={{ display: "inline-block", marginRight: "20px" }}>
                                <Link style={{ color: "white", textDecoration: "none" }} to="/result">
                                    Results
                                </Link>
                            </span>
                            <span style={{ display: "inline-block", marginRight: "20px" }}>
                                <Link style={{ color: "white", textDecoration: "none" }} to="/rule">
                                    How to Play
                                </Link>
                            </span>
                            <span
                                style={{ cursor: "pointer", display: "inline-block" }}
                                onClick={e => setVisible(true)}
                            >
                                Terms of Use
                            </span>
                        </div>
                    </div>
                </div>
                <br />
            </footer>
            <Modal
                title={
                    <>
                        <span style={{ fontFamily: "Lexend Deca" }}>Terms of Use</span>
                    </>
                }
                visible={visible}
                footer={null}
                onCancel={e => setVisible(false)}
            >
                <p style={{ fontFamily: "Lexend Deca" }}>
                    Zero-Loss-O is distributed in the hope that it will be useful, but WITHOUT
                    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
                    FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
                    for more details.
                </p>
            </Modal>
        </div>
    );
};

export default Footer;
