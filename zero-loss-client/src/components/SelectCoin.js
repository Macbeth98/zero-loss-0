import React, { useContext } from 'react';
import '../css/main.css';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Avatar, Button, message } from 'antd';
import Icon from '@ant-design/icons';
import { CoinContext } from '../Context';
import axios from 'axios';
import erc20 from '../ethereum/erc20';
import { ethers } from 'ethers';

const { Meta } = Card;

const coins = [{ name: 'USDC', lottery: '1', enabled: false }];

const SelectCoin = () => {
  const value = useContext(CoinContext);

  const enableCoin = (coinName) => {
    let coinObject = value.coinAddresses.find((o) => o.coin === coinName);
    let coinContractObject = value.coinContracts.find((o) => o.coin === coinName);

    // Create a contract instance for USDC using the imported ABI
    const erc20Contract = new ethers.Contract(coinObject.address, erc20, value.web3Provider);

    message.loading('Transaction in progress...', 0);

    let ts = Date.now();
    let estTime;
    var options = {
      timeZone: 'America/New_York',
    };
    estTime = new Date(ts);
    let date = estTime.toLocaleString('en-US', options);
    console.log(coinContractObject.address);
    erc20Contract.approve(
      coinContractObject.address,
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
    
  };

  return (
    <>
      <div className="container">
        <p style={{ fontSize: '20px', color: 'white' }}>Select a Coin</p>

        <Row
          gutter={12}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          
          <Col>
            <Card
              className=""
              style={{ width: '250px', marginBottom: '10px' }}
              actions={[
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    color: '#66BB6A',
                  }}
                >
                  <Button size="small" type="dashed" style={{ fontSize: '11px' }}>
                    <Link
                      to={{
                        pathname: '/choose-lottery',
                        
                      }}
                    >
                      CHOOSE LOTTERY
                    </Link>
                  </Button>
                </div>,
              ]}
            >
              <Meta
                avatar={<Avatar src={require(`../img/cc/usdc.svg`)} />}
                title={<>{'usdc'.toUpperCase()}</>}
              />
            </Card>
          </Col>
          
        </Row>
      </div>
    </>
  );
};

export default SelectCoin;
