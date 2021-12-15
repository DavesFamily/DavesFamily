import React from "react";
//import { Container, Row, Col } from "react-bootstrap";
import FooterNav from './footer-nav';
import FooterSocial from './footer-nav-social';
import Link from "./link";

const Footer = () => {

	return (
		<div className="footer_main">
			<div className="footer_wrap">
				<div className="footer_top">
					<div className="footer_top_wrap container">
						<div className="footer_top_inner row">
							<div className="footer_top_left">
								<FooterNav />
							</div>
							<div className="footer_top_right">
								<FooterSocial />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
