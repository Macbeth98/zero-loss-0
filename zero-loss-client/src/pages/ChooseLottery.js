import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { CoinContext } from "../Context";
import { Spin } from "antd";
import * as Loader from "react-loader-spinner";
import { message } from "antd";

import {
  Statistic,
  Row,
  Col,
  Card,
  Modal,
  Tag,
  Button,
  Result,
  Typography,
  Tabs,
  Empty
} from "antd";
import axios from "axios";
import { chainId, raffleFactoryAddress } from '../ethereum/config';
import { raffleFactoryABI } from '../ethereum/RaffleFactory';
import { raffleABI } from '../ethereum/Raffle'
import { ethers } from 'ethers';

const { Meta } = Card;
const { TabPane } = Tabs;
const { Text } = Typography;

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; 

const ChooseLottery = (props) => {
  

  const [lotteries, setLotteries] = useState([]);
  
  const [showModalFlag, setShowModalFlag] = useState(false);
  const [raffle, setRaffle] = useState(null);
  

    const [showInvestModal, setShowInvestModal] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState("");

    const handleOpenInvestModal = () => {
        setShowInvestModal(true);
    };

    const handleCloseInvestModal = () => {
        setShowInvestModal(false);
    };

    const handleInvest = () => {

        setTimeout(() => {
          // Close the modal
          handleCloseInvestModal();
      
          // Show a success message
          message.success("Investment successful!");
        }, 2000); 
      };
      

    useEffect(() => {
        window.scrollTo(0, 0);
  
    async function checkNetwork() {
      if (window.ethereum.networkVersion !== chainId) {
        await window.ethereum
          .request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x' + chainId }],
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    checkNetwork();

    async function getLotteries() {
      const raffleFactory = new ethers.Contract(raffleFactoryAddress, raffleFactoryABI);
      const lotteries = await raffleFactory.getLotteries();
      setLotteries(lotteries);
      setRaffle(new ethers.Contract(lotteries[0], raffleABI));
    }
  }, []);

    

  return (
    <>
      <div className="hero-background1">
        <Navbar />
        <div className="container" style={{ color: 'white', marginTop: '10vh' }}>
          <div
            className="row"
            style={{ fontSize: '12px', margin: '20px 0px', cursor: 'pointer' }}
            onClick={(e) => window.history.back()}
          >
            <i className="fas fa-chevron-left" style={{ marginTop: '3px' }} />
            &nbsp;&nbsp;BACK
          </div>
          <div className="row" style={{ margin: '0px 0px' }}>
            <div className="col" style={{ padding: '0px' }}>
              <h3 style={{ color: 'white', margin: '0px' }}>Choose your Lottery for USDC</h3>
            </div>
            
                    </div>
                </div>
            </div>

            <div className="container" style={{ minHeight: "80vh" }}>
                <Modal
                    width="550px"
                    
                    title={
                        <>
                            <i className="fas fa-trophy " style={{ fontSize: "20px", color: "#186ab4", alignContent: "center" }}></i>
                            &nbsp;&nbsp;Winner List
                        </>
                    }
                    visible={showModalFlag}
                    centered={true}
                    footer={null}
                    onOk={(e) => setShowModalFlag(false)}
                    onCancel={(e) => setShowModalFlag(false)}
                >
                    <Row gutter={16}>
                        <Col span={2} style={{ fontWeight: "bold" }}>
                            #
                        </Col>
                        <Col span={18} style={{ fontWeight: "bold" }}>
                            Winner Address
                        </Col>
                        <Col span={4} style={{ fontWeight: "bold" }}>
                            Amount
                        </Col>
                    </Row>
                    <hr />

                </Modal>
                <Card
                    style={{
                        padding: "0px",
                        marginTop: "20px",
                        backgroundColor: "#f8f7f7"
                    }}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="ACTIVE LOTTERIES" key="1">
                            <Row gutter={16}>
                                
                                <>
                                    <Col span={8} style={{ marginTop: "20px" }}>
                                        <Card className="shadow" style={{ margin: "10px" }}>
                                            <p style={{ display: "root-flow" }}>
                                                <span style={{ float: "left" }}>
                                                    ABC
                                                </span>
                                                <span
                                                    style={{
                                                        float: "right",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    Price:
                                                    <Tag color="green">
                                                        100 USD
                                                    </Tag>
                                                </span>
                                            </p>
                                            <p style={{ marginTop: "-10px" }}>&nbsp;</p>
                                            <hr />

                                            <Row>
                                                <Col span={9}>
                                                    <Tag color="blue">Start Date:</Tag>
                                                </Col>
                                                <Col span={15}>
                                                    {new Date(1632441600 * 1000).toLocaleString()}
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingTop: "10px" }}>
                                                <Col span={9}>
                                                    <Tag color="green">Lock Date:&nbsp;</Tag>
                                                </Col>
                                                <Col span={15}>
                                                    {new Date(1633046400 * 1000).toLocaleString()}
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingTop: "10px" }}>
                                                <Col span={9}>
                                                    <Tag color="magenta">End Date:&nbsp;&nbsp;</Tag>
                                                </Col>
                                                <Col span={15}>
                                                    {new Date(1635561600 * 1000).toLocaleString()}
                                                </Col>
                                            </Row>

                                            <hr />
                                            <p style={{ display: "root-flow" }}>
                                                <span style={{ float: "left" }}>
                                                    <Text type="danger">
                                                        <span style={{ fontWeight: "bold" }}>
                                                            85
                                                        </span>{" "}
                                                        tickets sold till now
                                                    </Text>
                                                </span>

                                                <span style={{ float: "right" }}>
                                                    <Button onClick={handleOpenInvestModal}>Try your luck</Button>
                                                </span>
                                            </p>
                                        </Card>
                                    </Col>
                                </>
                                
                            </Row>
                            
                        </TabPane>

                       
                    </Tabs>
                </Card>
            </div>

            <Modal
                title="Invest in the Lottery"
                visible={showInvestModal}
                onCancel={handleCloseInvestModal}
                footer={[
                    <Button key="back" onClick={handleCloseInvestModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleInvest}>
                        Invest
                    </Button>,
                ]}
            >
                <div>
                    <label>Enter the amount(USDC): </label>
                    <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                    />
                </div>
            </Modal>


        </>
    );
};

export default ChooseLottery;
