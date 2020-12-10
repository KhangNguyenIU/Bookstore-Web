import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
/**
* @author
* @function Footer
**/

const FooterNav = (props) => {
    return (
        <React.Fragment>
            <div className='container-fluid footer'>
                <div className="row pt-5 pb-5 mt-5">
                    <div className="col-md-3 col-sm-6 text-center">
                        <p className="footer-heading">Publishers</p>
                        <ul style={{listStyle:'none',textAlign:'center'}}>
                            <li>
                                <a>Bestsellers</a>
                            </li>
                            <li>
                                <a>Author story</a>
                            </li>
                            <li>
                                <a>Help(FAQ)</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-6 text-center">
                        <p className="footer-heading">Contact</p>
                        <p className="custom-text">Stay in touch with everything Us, follow us on social media and learn about new promotions.</p>
                        <div className="d-flex justify-content-center">
                            <TwitterIcon color="secondary" style={{ margin: '20px 10px' }} />
                            <YouTubeIcon color="secondary" style={{ margin: '20px 10px' }} />
                            <InstagramIcon color="secondary" style={{ margin: '20px 10px' }} />
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 text-center">
                        <p className="footer-heading">News & Update</p>
                        <p className="custom-text ">We’d love it if you subscribed to our newsletter! You’ll love it too.</p>
                    </div>
                    <div className="col-md-3 col-sm-6 text-center">
                        <p className="footer-heading">About us</p>
                        <ul style={{listStyle:'none',textAlign:'center'}}>
                            <li>
                                <p className="custom-text m-0">Nguyen Duy Khang</p>
                            </li>
                            <li>
                                <p className='custom-text m-0'>Huynh Anh Kiet</p>
                            </li>
                            <li>
                                <p className='custom-text m-0'>Mai Minh Hoang</p>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>
            <div style={{ backgroundColor: 'black',width:'100%',margin:'0px' }}>
                <p 
                className="m-0 text-center custom-text p-3" 
                style={{color:'white'}}>MADE by KHANG KIET HOANG   @copyright 2020</p>
            </div>
        </React.Fragment>
    )

}

export default FooterNav

