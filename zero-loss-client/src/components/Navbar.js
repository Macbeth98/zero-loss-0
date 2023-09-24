import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Modal, Button, Card, Popover, message, Row, Col, Tag, Typography } from 'antd';
import Icon from '@ant-design/icons';
const { Paragraph } = Typography;

const Navbar = () => {

    const content = (
        <div className="container">
            <Row gutter={20} style={{ width: "78vw", padding: "20px 0px" }}>
                <Col span={6}>
                    <h4 style={{ display: "flex", alignItems: "center" }}>
                        <Icon type="home" style={{ color: "blue" }} />
                        &nbsp;<span>Home</span>
                    </h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <Link to="/rule">
                        <button
                            className="btn btn-outline-secondary"
                            style={{
                                borderRadius: "50px",
                                fontSize: "12PX",
                                fontWeight: "500",
                                color: "primary"
                            }}
                        >
                            <i class="fas fa-chevron-right" />
                        </button>
                    </Link>
                </Col>
                <Col span={6}>
                    <h4 style={{ display: "flex", alignItems: "center" }}>
                        <Icon type="border-outer" style={{ color: "purple" }} />
                        &nbsp;<span>Game Rules</span>
                    </h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <Link to="/rule">
                        <button
                            className="btn btn-outline-secondary"
                            style={{
                                borderRadius: "50px",
                                fontSize: "12PX",
                                fontWeight: "500",
                                color: "primary"
                            }}
                        >
                            <i class="fas fa-chevron-right" />
                        </button>
                    </Link>
                </Col>
                <Col span={6}>
                    <h4 style={{ display: "flex", alignItems: "center" }}>
                        <Icon type="crown" style={{ color: "red" }} />
                        &nbsp;<span>Winners</span>
                    </h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <Link to="/result">
                        <button
                            className="btn btn-outline-secondary"
                            style={{
                                borderRadius: "50px",
                                fontSize: "12PX",
                                fontWeight: "500",
                                color: "primary"
                            }}
                        >
                            <i class="fas fa-chevron-right" />
                        </button>
                    </Link>
                </Col>
                <Col span={6}>
                    <h4 style={{ display: "flex", alignItems: "center" }}>
                        <Icon type="info-circle" style={{ color: "green" }} />
                        &nbsp;<span>About</span>
                    </h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <button
                        className="btn btn-outline-secondary"
                        style={{
                            borderRadius: "50px",
                            fontSize: "12PX",
                            fontWeight: "500",
                            color: "primary"
                        }}
                    >
                        <i class="fas fa-chevron-right" />
                    </button>
                </Col>
            </Row>
        </div>
    );

    return (
        <>
            <div className="container">
                <div className="row" style={{ paddingTop: "20px" }}>
                    <div
                        className="col-3"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start"
                        }}
                    >
                        <Popover
                            placement="bottomLeft"
                            // title={text}
                            content={content}
                            trigger="click"
                        >
                            {/* <Button>BL</Button> */}
                            <button className="btn" style={{ backgroundColor: "none" }}>
                                <i
                                    // onClick={e => setCross(!cross)}
                                    class="fa fa-bars"
                                    style={{
                                        fontSize: "25px",
                                        color: "white",
                                        cursor: "pointer"
                                    }}
                                />
                            </button>
                        </Popover>

                        <Link to="/">
                            <img src={require("../img/logo.jpg")} alt="" width="120px" />
                        </Link>
                    </div>
                    <div className="col-1" />
                    {/* accountAddr Code */}
                </div>
            </div>
        </>
    );
};

export default Navbar;
