import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import Presentation from '../components/IndexSections/Presentation.js';
import Claim from '../components/IndexSections/Claim.js';
import Sponsorship from '../components/IndexSections/Sponsorship.js';
// import {Header, Button} from 'semantic-ui-react';
import {Header, Form,Field,Input,Message,Button,Container,Checkbox,Card,Icon} from 'semantic-ui-react';
//import web3 from '../ethereum/web3';
import {Router} from '../routes';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import styles from "../styles/components/Layout.module.scss"; // Styles
import styles__footer from "../styles/components/Footer.module.scss"; // Styles


//import * as UAuthWeb3Modal from "@uauth/web3modal";
//import UAuthSPA from "@uauth/js";

class MyDapp extends Component {
    state = {
        twitter: process.env.NEXT_PUBLIC_GEN_TWITTER,
        podcast: process.env.NEXT_PUBLIC_GEN_PODCAST,
        website: process.env.NEXT_PUBLIC_GEN_WEBSITE,
        discord: process.env.NEXT_PUBLIC_GEN_DISCORD,
        tripsCommunity: process.env.NEXT_PUBLIC_GEN_TRIPSCOMMUNITY,
        github: process.env.NEXT_PUBLIC_GEN_GITHUB,
        github2: process.env.NEXT_PUBLIC_GEN_GITHUB2,
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
                // {
                //   name:process.env.NEXT_PUBLIC_KILN_NAME,
                //   id:parseInt(process.env.NEXT_PUBLIC_KILN_ID),
                //   addr:process.env.NEXT_PUBLIC_KILN_CONTRACT_ADDRESS,
                //   marketplace:process.env.NEXT_PUBLIC_KILN_MARKETPLACE,
                //   marketCard:process.env.NEXT_PUBLIC_KILN_MARKETCARD,
                //   coin:process.env.NEXT_PUBLIC_KILN_COIN,
                //   buy:process.env.NEXT_PUBLIC_KILN_BUY
                // },
                // {
                //   name:process.env.NEXT_PUBLIC_GOERLI_NAME,
                //   id:parseInt(process.env.NEXT_PUBLIC_GOERLI_ID),
                //   addr:process.env.NEXT_PUBLIC_GOERLI_CONTRACT_ADDRESS,
                //   marketplace:process.env.NEXT_PUBLIC_GOERLI_MARKETPLACE,
                //   marketCard:process.env.NEXT_PUBLIC_GOERLI_MARKETCARD,
                //   coin:process.env.NEXT_PUBLIC_GOERLI_COIN,
                //   buy:process.env.NEXT_PUBLIC_GOERLI_BUY
                // }

                // {
                //     name:process.env.NEXT_PUBLIC_MUMBAI_NAME,
                //     id:parseInt(process.env.NEXT_PUBLIC_MUMBAI_ID),
                //     addr:process.env.NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS,
                //     marketplace:process.env.NEXT_PUBLIC_MUMBAI_MARKETPLACE,
                //     marketCard:process.env.NEXT_PUBLIC_MUMBAI_MARKETCARD,
                //     coin:process.env.NEXT_PUBLIC_MUMBAI_COIN,
                //     buy:process.env.NEXT_PUBLIC_MUMBAI_BUY
                //   }

                //   {
                //     name:process.env.NEXT_PUBLIC_SEPOLIA_NAME,
                //     id:parseInt(process.env.NEXT_PUBLIC_SEPOLIA_ID),
                //     addr:process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS,
                //     marketplace:process.env.NEXT_PUBLIC_SEPOLIA_MARKETPLACE,
                //     marketCard:process.env.NEXT_PUBLIC_SEPOLIA_MARKETCARD,
                //     coin:process.env.NEXT_PUBLIC_SEPOLIA_COIN,
                //     buy:process.env.NEXT_PUBLIC_SEPOLIA_BUY
                //   }

                // {
                //     name:process.env.NEXT_PUBLIC_GANACHE_NAME,
                //     id:parseInt(process.env.NEXT_PUBLIC_GANACHE_ID),
                //     addr:process.env.NEXT_PUBLIC_GANACHE_CONTRACT_ADDRESS,
                //     marketplace:process.env.NEXT_PUBLIC_GANACHE_MARKETPLACE,
                //     marketCard:process.env.NEXT_PUBLIC_GANACHE_MARKETCARD,
                //     coin:process.env.NEXT_PUBLIC_GANACHE_COIN,
                //     buy:process.env.NEXT_PUBLIC_GANACHE_BUY
                //   }

                // {
                //     name:process.env.NEXT_PUBLIC_ARBITRUMGOERLI_NAME,
                //     id:parseInt(process.env.NEXT_PUBLIC_ARBITRUMGOERLI_ID),
                //     addr:process.env.NEXT_PUBLIC_ARBITRUMGOERLI_CONTRACT_ADDRESS,
                //     marketplace:process.env.NEXT_PUBLIC_ARBITRUMGOERLI_MARKETPLACE,
                //     marketCard:process.env.NEXT_PUBLIC_ARBITRUMGOERLI_MARKETCARD,
                //     coin:process.env.NEXT_PUBLIC_ARBITRUMGOERLI_COIN,
                //     buy:process.env.NEXT_PUBLIC_ARBITRUMGOERLI_BUY
                //   }

                {
                    name:process.env.NEXT_PUBLIC_ARBITRUM_NAME,
                    id:parseInt(process.env.NEXT_PUBLIC_ARBITRUM_ID),
                    addr:process.env.NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS,
                    marketplace:process.env.NEXT_PUBLIC_ARBITRUM_MARKETPLACE,
                    marketCard:process.env.NEXT_PUBLIC_ARBITRUM_MARKETCARD,
                    coin:process.env.NEXT_PUBLIC_ARBITRUM_COIN,
                    buy:process.env.NEXT_PUBLIC_ARBITRUM_BUY
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
        const begin = address.substring(0, 3).concat("...");
        const end = address.substring(address.length - 3);
        return begin + end;
    }

    render() {
        return (
            <Layout state={this.state}>
                <div id="connectWallet">
                    {
                        this.state.web3Settings.isWeb3Connected
                            ? (
                                <a className={`px-4`}>
                                    <button className={`btn btn__wallet`} onClick={this.disconnect}>
                                        {this.truncateAddress(this.state.web3Settings.account)}
                                    </button>
                                </a>
                            )
                            : (
                                  
                                <a href="#Claim" className={`px-4`}>



{/* <img src="../img/chains/polygon.webp" alt="Polygon"></img> */}




                                    <button id = "btnHome"  className={`btn btn__wallet`} onClick={this.connect} alt="">| Connect wallet 
                                    
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
                            <div id="Sponsorship" className="bg-trips-4">
                              <Sponsorship disconnect={this.disconnect} connect={this.connect} state={this.state}/>
                            </div>
                          :
                            <div id="Claim" className="bg-trips-1">
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
