import React from 'react';
import styled from 'styled-components';
import { Carousel, Card } from 'react-bootstrap';
import Img from 'react-image';
import { media } from '../../pages/media_style';

import withStyles from '@material-ui/core/styles/withStyles';
import Header from './header';
import Parallax from './parallax';
import componentsStyle from './style';

class all extends React.Component {
	render() {
		const { classes, ...rest } = this.props;
		const Banner = styled(Img)`
			width: 100%;
		`;
		const CardContainer = styled.div`
			margin-left: 10%;
			margin-right: 10%;
			text-align: center;
		`;
		const CardText = styled.p`
			${media.tablet`
      margin-left: 2%
      margin-right: 2%
      font-size: 1.3em
      `}
			${media.phone`
		font-size: 1.1em
		`}
		font-size: 1.3em
		`;

		return (
			<div>
				<Header
					brand="Material Kit React"
					fixed
					color="transparent"
					changeColorOnScroll={{
						height: 350,
					}}
					{...rest}
				/>

				<Parallax>
					<Carousel>
						<Carousel.Item>
							<Banner
								class="d-block w-100"
								src={'https://res.cloudinary.com/dkfptto8m/image/upload/v1556654670/img.jpg'}
								alt="First slide"
							/>
						</Carousel.Item>
						<Carousel.Item>
							<Banner
								class="d-block w-100"
								src={
									'https://res.cloudinary.com/dkfptto8m/image/upload/v1557942816/Mongodb%20hackathon%20project/2017-chevrolet-bolt-ev.jpg'
								}
								alt="Third slide"
							/>
						</Carousel.Item>
						<Carousel.Item>
							<Banner
								class="d-block w-100"
								src={
									'https://res.cloudinary.com/dkfptto8m/image/upload/v1557942816/Mongodb%20hackathon%20project/tesla.jpg'
								}
								alt="Third slide"
							/>
						</Carousel.Item>
					</Carousel>
				</Parallax>


				<CardContainer>
					<Card class="shadow p-3 mb-5 bg-white rounded">
						<Card.Body>
							<CardText>
								Recent surveys in the Automobile field has shown the surging amount of individuals
								switching to Electric Battery Drive Vehicles. In view of meeting climate goals and other
								sustainabilty targets, several developed countries are making and adjusting exisiting
								policies to encourage the use of Electric Vehicles . Germany will stop the sale of all
								new petrol and diesel cars from 2030, Scotland from 2032, and France and the UK from
								2040. According to the <a href="https://www.iea.org/gevo2018/#"> GEVO 2018 </a> report,{' '}
								<q>
									<b> numbers of electric cars could hit 220 million by 2030 </b>
								</q>
								.
							</CardText>{' '}
							<br />
							<CardText>
								Inorder to facilitate the growth of Electric Vehicles, several efforts are being put in
								place to reduce the limitations of these vehicles. The increased availabilty of charging
								outlets and replacement batteries has been part of these efforts . In the year 2017, we
								had 3 million private chargers worldwide and also 430 000 publicly accessible chargers
								of which one quater were fast chargers.
							</CardText>
						</Card.Body>
					</Card>
				</CardContainer>
			</div>
		);
	}
}

export default withStyles(componentsStyle)(all);
