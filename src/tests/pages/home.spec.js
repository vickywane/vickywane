/**
 * @jest-environment jsdom
 */
import React from 'react'
import renderer from 'react-test-renderer'


const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>

describe('Portfolio Home page',  () => {
    it('It displays home page', function () {
        const tree = renderer.create(<Title />).toJSON()

        expect(tree).toMatchSnapshot()
    });
});

