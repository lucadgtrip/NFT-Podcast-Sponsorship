import React, {Component} from 'react';
import styles from "../styles/components/Layout.module.scss"; // Styles
import styles__footer from "../styles/components/Footer.module.scss"; // Styles

class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
           
        
           <div className={`${styles__footer.section__footer}`}>


                <div className={`${styles.footer} `}>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> Built by
                    <a target="_blank" href={this.props.state.tripsCommunity} className={`${styles__footer.link} a__link__secondary`}>
                        <span> Tripluca.com  </span>
                    </a>
                    {/* On
                    <div className={`${styles__footer.img}`} >
                      <a href="https://arbitrum.io" target="_blank"><img src="../img/arbitrum.jpeg" alt="Arbitrum" /></a>
                    </div> */}
                    <br /><br />
                    <div>
                   
                    Website and Smart Contract's code are <a target="_blank" rel="noopener noreferrer" href={this.props.state.github} className={`${styles__footer.link} a__link__secondary`}> open-source </a>
                    and licensed under MIT license. 
                    Original code by <a target="_blank" rel="noopener noreferrer" href={this.props.state.github2} className={`${styles__footer.link} a__link__secondary`}> Jacmos3</a>.
                    </div>
                    
                    <div>
                    The background images are created with  <a target="_blank" rel="noopener noreferrer" href="https://playgroundai.com/post/clbie3ko8152ls601lg6hl0el" className={`${styles__footer.link} a__link__secondary`}>PlaygroundAI on Stable Diffusion</a> 
                    </div>
                    <br />
                    <div>
                    <a target="_blank" rel="noopener noreferrer" href={this.props.state.policy} className={`${styles__footer.link} a__link__secondary`}>
                        Privacy policy
                    </a>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    </div>

                    <a href="https://anchor.fm/luca-de-giglio" target="_blank"><img src="../img/podcast.png" alt="Web3 in Travel Podcast" /></a>
                </div>

                
            </div>

            
        );
    }
}

export default Footer;
