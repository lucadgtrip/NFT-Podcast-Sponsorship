import React, {Component} from 'react';
import {Form,Field,Input,Message,Button,Container,Checkbox,Card,Image, Icon} from 'semantic-ui-react';
import Conference from '../../../ethereum/build/Conference.sol.json';
import styles from "../../../styles/components/Web3Sections/SponsorshipForm.module.scss";
import confetti from 'canvas-confetti';



class SponsorshipForm extends Component{
  state = {
    account:"",
    loading:0,
    errorMessage:"",
    warningMessage:"",
    successMessage:'',
    chain:{},
    sponsorPrice:0,
    checked:true,
    buttonLabel: "Sponsor!",
    sponsorQuote:"",
    element:{image:"",header:""},
    ethUsdPrice: null,
    all:[]
  }
  constructor(props){
    super(props);
  }

  async componentDidMount(){
    var myChain = this.props.state.web3Settings.chains
      .filter(chain => chain.id === this.props.state.web3Settings.networkId);

    const accounts= await this.props.state.web3.eth.getAccounts();
    this.setState({chain:myChain[0], account:accounts[0]});
    this.fetchInitialInfo();

    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      // 'price.json'
    );
    const data = await response.json();
    this.setState({ ethUsdPrice: data.ethereum.usd });

  }

  happyShalala(){
    const confetti = require('canvas-confetti').default;

    var duration = 10 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 100 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    
  }

 

  async fetchInitialInfo() {
      console.log("fetching ticket price");
      this.setState({loading: this.state.loading + 1, errorMessage: ''});
      try {
          const instance = new this.props.state.web3.eth.Contract(Conference.Web3InTravelPodcastNFT.abi, this.state.chain.addr);
          let sponsorPrice = this.props.state.web3.utils.fromWei(await instance.methods.sponsorshipPrice().call());
          let currentSponsor = this.props.state.web3.utils.fromWei(await instance.methods.sponsorPayment().call());
          let paused = await instance.methods.paused().call();
          if (paused){
            console.log("minting paused");
            this.setState({sponsorPrice,currentSponsor,buttonLabel:"Paused",loading: this.state.loading + 1, errorMessage:"The sponsorship program has been paused. Come back later!"});
            return false;
          }

          if (sponsorPrice > this.props.state.web3Settings.ethBalance){
            console.log("You do not have enough money");
            this.setState({sponsorPrice,currentSponsor,loading: this.state.loading +1,
              errorMessage:`Becoming the new sponsor requires ${sponsorPrice} $${this.state.chain.coin} and in your address there are only ${this.props.state.web3Settings.ethBalance} $${this.state.chain.coin} right now.`});
            return false;
          }

          let totalSupply = parseInt(await instance.methods.totalSupply().call());
          let maxSupply = parseInt(await instance.methods.MAX_ID().call());

          let uri = await instance.methods.tokenURI(0).call()
          .then((result)=> {
            return JSON.parse(window.atob(result.split(',')[1]));
          })
          .catch((error)=>{
            console.log(error);
          });

          let element = {"header":"EXAMPLE","image":uri.image};
          this.setState({element});

          if (totalSupply >= maxSupply){
            console.log("minting finished");
            this.setState({buttonLabel:"Time ended",loading:this.state.loading + 1});
            return false;
          }

          this.setState({totalSupply,maxSupply,sponsorPrice,currentSponsor,loading: this.state.loading - 1, errorMessage: ""});
          return sponsorPrice;
      } catch (err) {
        console.log(err);
          this.setState({loading: this.state.loading - 1, errorMessage: err.message});
          return false;
      }

      this.setState({loading: this.state.loading - 1, errorMessage: ""});
      return true;
  }

  onSponsorship = async (event) => {
    event.preventDefault();
    console.log("Sponsorship");

    this.setState({loading:this.state.loading+1, errorMessage:'', warningMessage: "Please confirm the transaction on your wallet and then wait for the blockchain to perform its magic 🪄...", successMessage:""})
    try{
      console.log("Sponsorship1");
      const instance = new this.props.state.web3.eth.Contract(Conference.Web3InTravelPodcastNFT.abi, this.state.chain.addr );
      console.log("Sponsorship2");
      await instance.methods.sponsorship(this.state.sponsorQuote.toString()).send({from:this.state.account, value:this.props.state.web3.utils.toWei(this.state.sponsorPrice.toString(),"ether")});
      console.log("Sponsorship3");
      this.setState({successMessage:"✨👍❤️‍🔥🥂🎉 SPONSORSHIP SUCCESSFULL! YOU MADE IT!🥳❤️🥹🔥✨"});
      console.log("Sponsorship4Success");
      this.happyShalala();
      
    
    }
    catch(err){
      //console.log(err);
      this.setState({errorMessage: err.message,warningMessage:"",successMessage:''});
    }
    //this.fetchInitialInfo();
    this.fetchNFTList();
    this.setState({loading:this.state.loading-1, warningMessage:""});
  }

  replaceText(svg,string){
    let image = svg.split(',');
    let temp = window.atob(image[1]);
    return image[0] + "," + window.btoa(temp.replace(/(?<=SPONSOR: )(.*?)(?=<)/, string));
  }

  fetchNFTList = async () => {
      this.setState({loading:this.state.loading+1, errorMessage:''})
      try{
        const instance = new this.props.state.web3.eth.Contract(Conference.Web3InTravelPodcastNFT.abi, this.state.chain.addr );
        let totalSupply = parseInt(await instance.methods.totalSupply().call());
        let all = [];
        for (let index = 1; index <= totalSupply && index <= 15; index++){
          let uri = await instance.methods.tokenURI(index).call()
          .then((result)=> {
            return JSON.parse(window.atob(result.split(',')[1]));
          })
          .catch((error)=>{
            console.log(error);
          });

          //console.log("test"+uri);
          let element = {
            "key": uri.name,
            "header": <div className="text-center">{uri.name}</div>,
            "image":uri.image,
            "extra":<div className="text-center"><a target="_blank" href={this.state.chain.marketCard.replace("[PH_ADDR]",this.state.chain.addr).replace("[PH_ID]",uri.name.replace("Ticket #",""))}>View on OpenSea</a></div>,
          };
          all.push(element);
          this.setState({all:all});
        }

      }catch(err){
        this.setState({errorMessage: err.message});
      }
      this.setState({loading:this.state.loading-1});

    }

  handleChange = (e, { value }) => {
    const result = value.replace(/[^a-z0-9 _.,:;!?$()\[\]{}\-\+\*]/gi, '');
    this.setState({ sponsorQuote:result});
    try{
        let temp = this.replaceText(this.state.element.image,result);
        let element = {"header": this.state.element.header,"image":temp};
        this.setState({element});
    }catch(err){
      //this.setState({errorMessage: err.message});
      console.log(err.message);
    }
  }

  setChecked = (e, data) => {
    this.setState({understood:data.checked});
  }

render(){
  return (
          <Container>
          {
            !this.state.successMessage
            ? <div>
          <h1 className="text-center">Sponsor the Web3 in Travel Podcast!</h1>
          <div className={`${styles.text__description}  text-center border-solid border-2 border-green-400 `}>
                 <h3 className="text-center text-trips-1">How it works</h3>
            <p className="text-black">
              <strong>The sponsorship is an ongoing auction.</strong>
            </p>
            <p className= "text-black">By sponsoring, <strong>you can write a sentence </strong> (usually your company name) into the Donation NFT.
            </p>

            <div className={`${styles.centerCard}`}>
                  {this.state.element.header.length > 0
                    ? <Card >
                    <Image src={this.state.element.image} wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>{this.state.element.header}</Card.Header>
                        </Card.Content>
                    </Card>
                    :<span></span>
                  }
              </div>
              
            <p className= "text-black">Your Company name will be spoken 🗣️ by me (Luca),  <strong>in every episode of the podcast</strong> until someone pays 20% more than you. <br />
            Once mentioned, your name will be in the podcast <strong>forever</strong>.
            </p>
<br />
            <img className={`btn btn__spotify`} src="../img/podcast_spotify.png" alt="Spotify"/>
            <br />


            <p className= "text-black">
              When someone decides to pay 20% more, they will overwrite your text <strong>in all the Donation NFTs </strong> and become the new Sponsor.
            </p>
            <p className="text-black">Here's what happens then:<br />
            {/* <br /><strong>✅ You will get a full 100% refund automatically and immediately</strong><br /> */}
              <br /><strong>✅ Your Sponsorship text will be removed from all NFTs</strong><br />
              <br /><strong>✅ The spoken mentions in the Podcast will remain forever</strong><br />
              
            </p>

            {/* <p className="text-black"><strong>The refund 🤑 happens automatically</strong>, in the same transaction of the new Sponsor payment.
            </p>
            <p className="text-black">That means you got <strong>100% free exposure</strong>.
            </p> */}

            <p className="text-trips-3">If someone replaces you before the next episode, <strong>I will mention you anyway!</strong><br />
            So, mentions are guaranteed for at least one episode.
            </p>

            <p className="text-trips-2"><strong>THE MENTION</strong><br />
            <br /><strong> 1) I will mention you at the beginning of the Podcast. I will say:</strong><br /><br /></p>

            <p className="text-trips-2 italic-text"><strong>"This episode is sponsored by [the text you added to the NFT] who paid to be mentioned in this episode in the podcast NFT.
            <br />Their website is [your website]"</strong></p><br /><br />
            <p className="text-trips-2"><strong> 2) I will add your website link in the description of the episode.</strong></p>

          
            
        

          <br /> <br /> <br />
           <h3 className="text-center text-trips-1">DEADLINE</h3>
             <p className="text-black">
               The auction ends on <strong>🗓️ Saturday Dec 31 2023 18:00:59 UTC</strong>
               <br /> <br />
             </p>
            
          </div>
          <h2 id="Sponsorize" className="text-center">Publish your Sponsor Text Now!</h2>
              <Form error={!!this.state.errorMessage} warning={!!this.state.warningMessage} className= {`${styles.form}`}>
                    <Form.Field>
                    <h3 className="text-center">Sponsorship price now: {this.state.sponsorPrice} {this.state.chain.coin} (${(this.state.sponsorPrice * this.state.ethUsdPrice).toFixed(2) })</h3>
                   
                    {this.state.currentSponsor != 0
                      ? <h5 className="text-center">The previous sponsor paid {this.state.currentSponsor} {this.state.chain.coin}</h5>
                      : <div></div>
                    }

{/* <a href ="#Sponsorize"> */}

              <Checkbox
                 className={`${styles.checkbox}` }
                 label='👈 You understand the rules and want to sponsor the podcast!?'
                 onChange={this.setChecked}
               />
               {/* </a> */}

               {/* <div align="center"><img src="../img/capiche.png" alt="capiche"/></div> */}

                    <Input
                        className = {`${styles.padding}`}
                        error = {true}
                        placeholder='[Insert your sponsor sentence. Max 32 charachters]'
                        onChange={this.handleChange}
                        maxLength="32"
                        value = {this.state.sponsorQuote}
                        disabled = {!this.state.understood}
                    />
                    </Form.Field>
                    <Form.Field>
                      <Message error header="Oops!">
                       {this.state.errorMessage}
                       {this.state.sponsorPrice > this.props.state.web3Settings.ethBalance
                         ?
                          <a className={`text-black a__underline__secondary`}
                            target="_blank"
                            href={this.state.chain.buy}> Buy ${this.state.chain.coin} here!
                          </a>
                        : <div></div>
                       }

                      </Message>
                      <Message warning icon >
                        <Message.Content>
                          <Message.Header>Pending confirmation...</Message.Header>
                          {this.state.warningMessage}
                        </Message.Content>
                        <Icon name='circle notched' loading />
                      </Message>

                      <div className={`${styles.centerCard}`}>
                  {this.state.element.header.length > 0
                    ? <Card >
                    <Image src={this.state.element.image} wrapped ui={false} />
                      {/* <Card.Content>
                        <Card.Header>{this.state.element.header}</Card.Header>
                        </Card.Content> */}
                    </Card>
                    :<span></span>
                  }
              </div>


                    </Form.Field>

                  
                    <div className="text-center">
                  
                    
                      By clicking the button below you will:
                      <br />1. Pay <strong><a href="https://www.coingecko.com/en/coins/ethereum" target="_blank" className="btn__secondary">&nbsp;&nbsp;{this.state.sponsorPrice} {this.state.chain.coin} (${(this.state.sponsorPrice * this.state.ethUsdPrice).toFixed(2) })&nbsp;&nbsp;</a></strong> for the Sponsorship
                      <br />2. Be mentioned in the podcast
                      <br />3. Rewrite all NFTs immediately!
                      <button onClick = {this.onSponsorship} className={`btn btn__primary`} disabled={this.state.loading > 0 || this.state.sponsorQuote.length == 0 || this.state.sponsorQuote.length > 35 || !this.state.understood}>
                        {this.state.buttonLabel}
                      </button>
                      
                    </div>
                  </Form>
                  </div>
        :
          <div>



            <Message
              success
              header="Success!"
              className="text-center">
              {this.state.successMessage}
            </Message>

           {/* redirect to the middle of the page */}
           <script type="text/javascript">
            window.onload = function() { window.scrollTo(0, 2000) }
            </script>

           


            
            <h1 className="text-center">
            ✨👍❤️‍🔥🥂🎉🥳❤️🥹🔥✨<br />You are the new Sponsor<br />congratulations! 
            <br />
          </h1>

        

            <h2 className="text-center">
              I will mention your sponsorship in the next episode of the Web3 in Travel podcast I record!*
            </h2>
              <h3>Note:</h3>
              <p>(*) Not on the next published one, which has probably already been recorded, but on the next I record, so it may take a few weeks before you can hear it.</p>
              <br />
              <p>1. You modified all the NFTs (but no new NFT has been minted)</p>
              <p>2. Until you remain the current sponsor, all past and future NFTs will include your Sponsor text</p>
              <p>3. If someone else wants to become new Sponsor, they need to pay 20% more, and their text will replace yours</p>
              <p>5. Your address is: {this.state.account}</p>
              <br />  <br />
              <h3 className="text-center">Here is the list of the Donation NFTs you modified:</h3>
              <br /> <br />
            <div style={{padding:"15px"}}>
               <Card.Group itemsPerRow={3} stackable={true} doubling={true} centered items={this.state.all} />
            </div>
            <div className="text-center">
              <a className={`a__underline__primary`} target="_blank" href={this.state.chain.marketplace}>Click here to see the full collection</a>
            </div>
          </div>
        }
        </Container>
  )
}

};


export default SponsorshipForm;
