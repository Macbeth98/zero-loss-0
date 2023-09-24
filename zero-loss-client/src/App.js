import React, { useEffect, useState, useContext } from 'react';
import { HashRouter, BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { ethers } from 'ethers';
import { CoinContext } from './Context';

import './App.css';

import Home from './pages/Home';

import ChooseLottery from './pages/ChooseLottery';

import Footer from './components/Footer';
import { chainId } from './ethereum/config';

const App = () => {
  const [login, setLogin] = useState('Unlock Metamask');
  const [loginFlag, setLoginFlag] = useState(false);
  const [metamaskModal, setMetamaskModal] = useState(false);
  const [coinsEnabled, setCoinsEnabled] = useState([]);

  const [coinAddresses, setCoinAddresses] = useState([
    {
      coin: 'usdc',
      address: '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b',
    },
  ]);

  const [coinContracts, setCoinContracts] = useState([
    {
      coin: 'usdc',
      address: '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b',
    },
  ]);

  const [check, setCheck] = useState(false);

  const [toolTip, setToolTip] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function connectMetamask() {
      // Check if MetaMask is installed and connected
      if (typeof window.ethereum !== 'undefined') {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

        console.log('web3Provider: ', web3Provider);

        // Request access to the user's MetaMask account
        await web3Provider.send('eth_requestAccounts', []);
        web3Provider
          .listAccounts()
          .then((accounts) => {
            console.log('Accounts: ', accounts);
            if (accounts.length > 0) {
              setCheck(true);
            } else {
              setCheck(false);
            }
          })
          .catch((error) => {
            console.error('Error connecting to MetaMask:', error);
            setCheck(false);
          });
      } else {
        setCheck(false);
      }
    }

    connectMetamask();
  }, []);

  return (
    <div className="App">
      <HashRouter basename="/">
        <div className="hero">
          {check ? (
            <Routes>
              <Route path="/" element={<Home />}></Route>

              <Route path="/choose-lottery" element={<ChooseLottery />}></Route>
            </Routes>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
              }}
            >
              <div className="card shadow-sm" style={{ padding: '20px' }}>
                <h1 className="display-4">Dear User!</h1>
                <p className="lead">
                  Install MetaMask in order to use the Zero-Loss-0 App. <br />
                  If already installed, click <b>Connect</b> button in the MetaMask pop-up that appears.
                </p>
                <hr className="my-4" />
                <p>Please click the button below to install MetaMask:</p>
                <a
                  className="btn btn-primary btn-lg"
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                  target="_blank"
                  role="button"
                >
                  <i className="fas fa-external-link-alt"></i> Install MetaMask
                </a>
              </div>
              &nbsp;&nbsp;
              {toolTip ? <img src={require('./img/metamask.png')} alt="MetaMask Logo" width="19%" /> : null}
            </div>
          )}
          <Footer />
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
