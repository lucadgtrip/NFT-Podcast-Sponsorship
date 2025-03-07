import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import Presentation from '../components/IndexSections/Presentation.js';
import Claim from '../components/IndexSections/Claim.js';
import Sponsorship from '../components/IndexSections/Sponsorship.js';
import {Header, Button} from 'semantic-ui-react';
//import web3 from '../ethereum/web3';
import {Router} from '../routes';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import styles from "../styles/pages/INDEX.module.scss";

//import * as UAuthWeb3Modal from "@uauth/web3modal";
//import UAuthSPA from "@uauth/js";

class MyDapp extends Component {
    state = {
        twitter: process.env.NEXT_PUBLIC_GEN_TWITTER,
        website: process.env.NEXT_PUBLIC_GEN_WEBSITE,
        discord: process.env.NEXT_PUBLIC_GEN_DISCORD,
        tripsCommunity: process.env.NEXT_PUBLIC_GEN_TRIPSCOMMUNITY,
        github: process.env.NEXT_PUBLIC_GEN_GITHUB,
        policy: process.env.NEXT_PUBLIC_GEN_POLICY,
        lnk_bondingCurve:process.env.NEXT_PUBLIC_GEN_LNK_BONDING_CURVE,
        lnk_airdrop:process.env.NEXT_PUBLIC_GEN_LNK_AIRDROP,
        lnk_how_to_access:process.env.NEXT_PUBLIC_GEN_LNK_HOW_TO_ACCESS,
        lnk_spnsr_read_more:process.env.NEXT_PUBLIC_GEN_LNK_SPONSOR_READ_MORE,
        lnk_learn_more:process.env.NEXT_PUBLIC_GEN_LNK_LEARN_MORE,

        web3Settings: {
            infura: process.env.NEXT_PUBLIC_WEB3SETTINGS_INFURA,
            isWeb3Connected: false,

            chains: [
                // {
                //   name:process.env.NEXT_PUBLIC_RINKEBY_NAME,
                //   id:parseInt(process.env.NEXT_PUBLIC_RINKEBY_ID),
                //   addr:process.env.NEXT_PUBLIC_RINKEBY_CONTRACT_ADDRESS,
                //   marketplace:process.env.NEXT_PUBLIC_RINKEBY_MARKETPLACE,
                //   marketCard:process.env.NEXT_PUBLIC_RINKEBY_MARKETCARD,
                //   coin:process.env.NEXT_PUBLIC_RINKEBY_COIN,
                //   buy:process.env.NEXT_PUBLIC_RINKEBY_BUY
                // },
                {
                  name:process.env.NEXT_PUBLIC_KILN_NAME,
                  id:parseInt(process.env.NEXT_PUBLIC_KILN_ID),
                  addr:process.env.NEXT_PUBLIC_KILN_CONTRACT_ADDRESS,
                  marketplace:process.env.NEXT_PUBLIC_KILN_MARKETPLACE,
                  marketCard:process.env.NEXT_PUBLIC_KILN_MARKETCARD,
                  coin:process.env.NEXT_PUBLIC_KILN_COIN,
                  buy:process.env.NEXT_PUBLIC_KILN_BUY
                },
                {
                  name:process.env.NEXT_PUBLIC_GNOSIS_NAME,
                  id:parseInt(process.env.NEXT_PUBLIC_GNOSIS_ID),
                  addr:process.env.NEXT_PUBLIC_GNOSIS_CONTRACT_ADDRESS,
                  marketplace:process.env.NEXT_PUBLIC_GNOSIS_MARKETPLACE,
                  marketCard:process.env.NEXT_PUBLIC_GNOSIS_MARKETCARD,
                  coin:process.env.NEXT_PUBLIC_GNOSIS_COIN,
                  buy:process.env.NEXT_PUBLIC_GNOSIS_BUY
                }
          ],
        }
    };

    constructor(props) {
        super(props);
    }

    update = async (nextState) => {
        console.log("nextState: " + JSON.stringify(nextState));
        this.setState(nextState);
    }

    disconnect = (event) => {
        console.log("disconnect");
        var web3Settings = this.state.web3Settings;
        web3Settings.isWeb3Connected = false;
        this.setState({web3Settings: web3Settings});
    }

    connect = async (event) => {
      let myId = event.target.id.split("btn")[1];
      this.setState({selectedSection:myId});
      console.log(myId);
      if (this.state.web3Settings.isWeb3Connected)
        return false;

        var providerOptions = {
            injected: {
                display: {
                    name: "Default",
                    description: "Connect with the provider in your Browser"
                },
                package: null
            },
            walletconnect: {
                display: {
                    name: "Mobile",
                    description: "Scan qrcode with your mobile wallet"
                },
                package: WalletConnectProvider,
                options: {
                    infuraId: this.state.web3Settings.infura // required
                }
            }
        }

        var web3Modal = new Web3Modal({
            network: "rinkeby", // optional
            cacheProvider: false, // optional
            providerOptions // required
        });

        var provider;
        web3Modal.clearCachedProvider();
        try {
            provider = await web3Modal.connect();
            console.log("provider",provider);
        } catch (e) {
            console.log("Could not get a wallet connection", e);
            return;
        }

        var web3 = new Web3(provider);

        provider.on('accountsChanged', function (accounts) {
            console.log("account changed " + accounts[0]);
            window.location.reload();
        })

        provider.on('chainChanged', function (networkId) {
            console.log("chain changed: reloading page");
            window.location.reload();
        })

        provider.on("disconnect", function () {
            console.log("disconnecting");
            try{
              provider.disconnect();
              web3Modal.clearCachedProvider();
              provider = null;
            }
            catch(err){
              console.log(err);
            }
        }
        );

        this.setState({web3: web3});
        //console.log(this.state.web3);
        const networkId = await this.state.web3.eth.net.getId();
        const accounts = await this.state.web3.eth.getAccounts();
        //console.log("account:"+ accounts[0]);

        const ethBalance = await this.state.web3.eth.getBalance(accounts[0]) / 10 ** 18;
        // console.log(this.state.web3Settings.isWeb3Connected);
        var web3Settings = this.state.web3Settings;
        web3Settings.account = accounts[0];
        web3Settings.networkId = networkId;
        web3.eth.net.getNetworkType()
            .then((value) => {
                web3Settings.networkName = value;
                this.forceUpdate();
            });

        web3Settings.ethBalance = ethBalance;
        web3Settings.isWeb3Connected = accounts.length > 0;
        this.setState({web3Settings: web3Settings});


        console.log("web3connected:",this.state.web3Settings.isWeb3Connected);

        document.getElementById(this.state.selectedSection).scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    truncateAddress(address) {
        const begin = address.substring(0, 6).concat("...");
        const end = address.substring(address.length - 6);
        return begin + end;
    }

    render() {
        return (
            <Layout state={this.state}>
                <div id="connectWallet">
                    {
                        this.state.web3Settings.isWeb3Connected
                            ? (
                                <a className={`px-5`}>
                                    <button className={`btn btn__wallet`} onClick={this.disconnect}>
                                        {this.truncateAddress(this.state.web3Settings.account)}
                                    </button>
                                </a>
                            )
                            : (
                                <a href="#Claim" className={`px-5`}>
                                    <button id = "btnHome" className={`btn btn__wallet`} onClick={this.connect}>
                                        Connect wallet
                                    </button>
                                </a>
                            )
                    }
                </div>
                <div id="Home">
                  <Presentation disconnect={this.disconnect} connect={this.connect} state={this.state} />
                  {
                    this.state.web3Settings.isWeb3Connected
                    ?(
                      <div>
                        {
                          this.state.selectedSection=="Sponsorship"
                          ?
                            <div id="Sponsorship" className="bg-trips-5">
                              <Sponsorship disconnect={this.disconnect} connect={this.connect} state={this.state}/>
                            </div>
                          :
                            <div id="Claim" className="bg-trips-5">
                              <Claim disconnect={this.disconnect} connect={this.connect} state={this.state}/>
                            </div>
                        }


                      </div>
                    )
                    :(
                      <div>
                      </div>
                    )
                  }
              </div>
            </Layout>
        )
    }
}

export default MyDapp;
