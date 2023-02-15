import React, {Component} from 'react';
import styles from "../../styles/components/Presentation.module.scss";
import {Container} from 'semantic-ui-react';
import Claim from './Claim.js';


class Presentation extends Component {
    constructor(props) {
        super(props);
        //
    }

    

    render() {
        return (

            <div className={`${styles.hero__img}`}>
                <div className={styles.presentation__content}>
                    <div className={`${styles.text__content}`}>

                    


                    <br /> <br /><br />
                        <h1 className={`${styles.title} text-trips-1 text-center textbg__presentation_title`}>The Podcast Support NFT</h1>
                        <h3 className={`${styles.title} text-trips-4 text-center textbg__presentation_title`}>By <a href="https://www.linkedin.com/in/luca-de-giglio/" target="_blank" className="${styles__footer.link} a__link__secondary" >Luca De Giglio</a> from the <a href="https://open.spotify.com/show/1zHW4cpCLMfxdcqaydqPKa" target="_blank" className="${styles__footer.link} a__link__secondary" >Web3 in Travel Podcast 🎙️</a>
                        </h3>
                        <br /><br /><br />
                        <div align="center">
                        <iframe width="840" height="472" src="https://www.youtube.com/embed/YrB59ihDw-w" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                        <br /><br /><br />
                        <div align="center">
                        <h3 className={`${styles.title} text-trips-4 text-center textbg__presentation_title`}>Listen to the <a href="https://anchor.fm/luca-de-giglio/episodes/I-created-a-Podcast-Donation-and-Sponsorship-NFT-e1tbk6r" target="_blank" className="${styles__footer.link} a__link__secondary" >Web3 in Travel 🎙️ Podcast episode</a> <br />where I explain this more in detail
                        </h3>
                        </div>


                        <div className={`${styles.text__description} text-trips-1 text-center `}>
                        
                      

                    
                        
                    
<div>
                       
 <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br /> 
                        <div>
                            <a href="#Claim">
                                <button id="btnClaim" className={`btn btn__primary`}  onClick={this.props.connect}>
                                ❤️ Mint & Donate!
                                </button>
                                
                            </a></div>
                            
                        <h2 className="text-center textbg__presentation_title">Donate to the 🎙️ <a href="https://www.tripluca.com/podcast" target="_blank" className="a__link__secondary ">"<i>Web3 in Travel Podcast"</i></a><br />and ✨get an NFT✨ as proof<br /></h2>
                      

                        {/* <div className={`${styles.button__component}`}> */}
                       
                        <br />  <br />  <br />  <br />  <br />  <br /> 

<div>
                        <a href="#Sponsorship">
                                <button id = "btnSponsorship" className={`btn btn__alternative`}  onClick={this.props.connect}>
                                🎩 Sponsor!                                </button>
                            </a>
                        </div>
                        <h2 className="text-center textbg__presentation_title">Your company's name will be published 📜<br /> on all NFTs and mentioned 🗣️ in the Podcast</h2>
                       
                        {/* <div className={`${styles.button__component}`}> */}
                        

                       
                       </div>

                        </div>
                    </div>

                    
                        <div className={`${styles.social__component}`}>
                            
                             
                            
                         <a
                                href={this.props.state.twitter}
                                target="_blank">
                                <img className={`btn btn__secondary`} src="../img/social/twitter.svg" alt="Twitter"/>
                            </a>&nbsp;&nbsp;

                            <a
                                href="https://opensea.io/collection/web3-in-travel-podcast-donation"
                                target="_blank">
                                <img className={`btn btn__secondary`} src="../img/social/opensea.svg" alt="marketplace"/>
                                </a>   &nbsp;&nbsp;
                            
                            
                            <a
                                href={this.props.state.podcast}
                                target="_blank">
                             <img className={`btn btn__secondary`} src="../img/podcast.svg" alt="Podcast"/>
                            </a>
                            <br /> <br /> <br /> <br />
                        </div>



                </div>
            </div>
            
        )
        
    };
}

export default Presentation;
