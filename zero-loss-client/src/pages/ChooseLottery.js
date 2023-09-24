import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
// import Circles from "../components/Circles";
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
// import fetchurl from "../url";
// import lottery from "../ethereum/lottery.js";

const { Meta } = Card;
const { TabPane } = Tabs;
const { Text } = Typography;

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

const ChooseLottery = (props) => {

    //   const value = useContext(CoinContext);
    //   const { coin } = props.location.state ? props.location.state : { coin: localStorage.getItem("coin") };
    //   localStorage.setItem("coin", coin);

    //   const [lotteries, setLotteries] = useState([]);
    //   const [lotteriesDetails, setLotteriesDetails] = useState([]);
    //   const [fetchingDelay, setFetchingDelay] = useState(false);
    //   const [coinLotteryDetails, setCoinLotteryDetails] = useState({});
    //   const [selectedCoin, setSelectedCoin] = useState(coin);
    //   const [activeLotteries, setActiveLotteries] = useState([]);
    //   const [closedLotteries, setClosedLotteries] = useState([]);
    const [showModalFlag, setShowModalFlag] = useState(false);
    //   const [winners, setWinners] = useState([]);
    //   const [winnerAmount, setWinnerAmount] = useState(0);
    //   const [activeLotteryNames, setActiveLotteryNames] = useState([]);
    //   const [closedLotteryNames, setClosedLotteryNames] = useState([]);

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
    }, []);

    //   useEffect(() => {
    //     axios.post(fetchurl.url + "get_coins_lotteries").then((res) => {
    //       let coin_lottery = res.data.payload.find((o) => o.coin == coin);
    //       setLotteries(coin_lottery.lottery_list.reverse());
    //       setCoinLotteryDetails(coin_lottery);

    //       let lotteryContract = lottery(coin_lottery.coin_lottery_addr);
    //       let temp_ary = [];

    //       let tempActiveArray = [];
    //       let tempClosedArray = [];
    //       let tempActiveNamesArray = [];
    //       let tempClosedNamesArray = [];

    //       coin_lottery.lottery_list.map((lottery) => {
    //         lotteryContract.methods
    //           .lotteries(lottery)
    //           .call()
    //           .then((resp) => {
    //             console.log(resp);
    //             let temp = {};
    //             temp.start_time = resp.start_time;
    //             temp.lotteryName = lottery;
    //             temp.freeze_timestamp = resp.freeze_timestamp;
    //             temp.end_time = resp.end_time;
    //             temp.price_per_ticket = resp.price_per_ticket;
    //             temp.ticket_count = resp.ticket_count;
    //             // console.log(temp);
    //             temp_ary.push(temp);
    //             let now = Date.now();
    //             if (now > resp.end_time * 1000) {
    //               tempClosedArray.push(temp);
    //               tempClosedNamesArray.push(lottery);
    //             }
    //             if (now < resp.end_time * 1000) {
    //               tempActiveArray.push(temp);
    //               tempActiveNamesArray.push(lottery);
    //             }

    //             if (lottery == coin_lottery.lottery_list[coin_lottery.lottery_list.length - 1]) {
    //               setLotteriesDetails(temp_ary);
    //               setClosedLotteries(tempClosedArray);
    //               setActiveLotteries(tempActiveArray);
    //               setClosedLotteryNames(tempClosedNamesArray);
    //               setActiveLotteryNames(tempActiveNamesArray);
    //             }
    //           });
    //       });
    //       setTimeout(() => {
    //         setFetchingDelay(true);
    //       }, 2000);
    //     });
    //   }, []);

    // const menu = (
    //   <Menu>
    //     {value.coinsLotteries.map((item, index) => {
    //       return (
    //         <Menu.Item key={index} onClick={e => setSelectedCoin(item.coin)}>
    //           <span>
    //             <img
    //               src={require(`../img/cc/${item.coin.toLowerCase()}.svg`)}
    //               width="20px"
    //             />
    //           </span>
    //           &nbsp;&nbsp;<span>{item.coin.toUpperCase()}</span>
    //         </Menu.Item>
    //       );
    //     })}
    //   </Menu>
    // );

    //   let winnerModalHandler = async (lotteryName) => {
    //     console.log(lotteryName);

    //     let lotteryContract = lottery(coinLotteryDetails.coin_lottery_addr);
    //     lotteryContract.methods
    //       .get_lucky_winners(lotteryName)
    //       .call()
    //       .then((res) => {
    //         console.log(res);

    //         lotteryContract.methods
    //           .get_winners_amount(lotteryName)
    //           .call({ from: value.login })
    //           .then((resp) => {
    //             setWinners(res);
    //             if (res.length == 1) {
    //               setWinnerAmount((resp / 10 ** 18).toPrecision(2));
    //             }
    //             if (res.length > 1) {
    //               setWinnerAmount((resp / res.length / 10 ** 18).toPrecision(2));
    //             }
    //             setShowModalFlag(true);
    //           });
    //       });
    //   };

    return (
        <>
            <div className="hero-background1">
                <Navbar />
                <div className="container" style={{ color: "white", marginTop: "10vh" }}>
                    <div className="row" style={{ fontSize: "12px", margin: "20px 0px", cursor: "pointer" }} onClick={(e) => window.history.back()}>
                        <i className="fas fa-chevron-left" style={{ marginTop: "3px" }} />
                        &nbsp;&nbsp;BACK
                    </div>
                    <div className="row" style={{ margin: "0px 0px" }}>
                        <div className="col" style={{ padding: "0px" }}>
                            <h3 style={{ color: "white", margin: "0px" }}>
                                Choose your Lottery for USDC
                            </h3>
                        </div>
                        {/* <Dropdown overlay={menu} trigger={["click"]}>
              <Button>
                {selectedCoin ? (
                  <>
                    <img
                      src={require(`../img/cc/${selectedCoin.toLowerCase()}.svg`)}
                      width="20px"
                    />{" "}
                    {selectedCoin.toUpperCase()} <Icon type="down" />
                  </>
                ) : (
                  <>
                    Choose Coin <Icon type="down" />
                  </>
                )}
              </Button>
            </Dropdown> */}
                    </div>
                </div>
            </div>

            <div className="container" style={{ minHeight: "80vh" }}>
                <Modal
                    width="550px"
                    bodyStyle={
                        {
                            // padding: "0px"
                        }
                    }
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
                            {/* {fetchingDelay ? ( */}
                            <Row gutter={16}>
                                {/* {activeLotteries.length > 0 ? (
                    activeLotteryNames.map((item) => { */}
                                {/* let temp = "ABC" */}
                                {/* return ( */}
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
                                {/* ); */}
                                {/* }) */}
                                {/* ) : (
                    <Result
                      status="403"
                      title=""
                      subTitle="Sorry,currently there are no active lotteries for this coin."
                    />
                  )} */}
                            </Row>
                            {/* //   ) : ( */}
                            {/* //     <div
            //       style={{
            //         display: "flex",
            //         justifyContent: "center",
            //         alignItems: "center",
            //         height: "60vh"
            //       }}
            //     >
            //       <Loader
            //         type="ThreeDots"
            //         color="#186ab4"
            //         height={100}
            //         width={100}
            //       />
            //     </div>
            //   )} */}
                        </TabPane>

                        {/* <TabPane tab="CLOSED LOTTERIES" key="2">
              {fetchingDelay ? (
                <Row gutter={16}>
                  {closedLotteries.length > 0 ? (
                    closedLotteryNames.map((item) => {
                      let temp = closedLotteries.find((o) => o.lotteryName == item);
                      return (
                        <>
                          <Col span={8} style={{ marginTop: "20px" }}>
                            <Card className="shadow" style={{ margin: "10px" }}>
                              <p style={{ display: "root-flow" }}>
                                <span style={{ float: "left" }}>
                                  {temp.lotteryName.toUpperCase()}
                                </span>
                                <span style={{ float: "right", fontWeight: "bold" }}>
                                  Price:{" "}
                                  <Tag color="green">
                                    {temp.price_per_ticket / 10 ** 18} {coin}
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
                                  {new Date(temp.start_time * 1000).toLocaleString()}
                                </Col>
                              </Row>
                              <Row style={{ paddingTop: "10px" }}>
                                <Col span={9}>
                                  <Tag color="green">Lock Date:&nbsp;</Tag>
                                </Col>
                                <Col span={15}>
                                  {new Date(temp.freeze_timestamp * 1000).toLocaleString()}
                                </Col>
                              </Row>
                              <Row style={{ paddingTop: "10px" }}>
                                <Col span={9}>
                                  <Tag color="magenta">End Date:&nbsp;&nbsp;</Tag>
                                </Col>
                                <Col span={15}>
                                  {new Date(temp.end_time * 1000).toLocaleString()}
                                </Col>
                              </Row>
                              <hr />
                              <p style={{ textAlign: "center", margin: "0px" }}>
                                <span>
                                  <Text type="danger">
                                    Total Tickets Sold:{" "}
                                    <span style={{ fontWeight: "bold" }}>
                                      {temp.ticket_count}
                                    </span>{" "}
                                  </Text>
                                  <br /> <br />
                                </span>
                              </p>
                              <button className="btn btn-block btn-primary shadow-lg rounded">
                                View Winners
                              </button>
                            </Card>
                          </Col>
                        </>
                      );
                    })
                  ) : (
                    <Result
                      status="403"
                      title=""
                      subTitle="Sorry,currently there are no active lotteries for this coin."
                    />
                  )}
                </Row>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh"
                  }}
                >
                  <Loader
                    type="ThreeDots"
                    color="#186ab4"
                    height={100}
                    width={100}
                  />
                </div>
              )}
            </TabPane> */}

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
