import React from 'react';
import styled from 'styled-components';
import { media } from '../.././media_style'

const Header = styled.h4`
	text-align: center;
`;

const Div = styled.div`
	 background-color : #141E64;
	 color : white;
	 width : 100%;
	 border-radius : 5px;
	 height : 60vh;
`;

export default function update() {
	return (
		<Div>
			<Header> Blog </Header>
		</Div>
	);
}
