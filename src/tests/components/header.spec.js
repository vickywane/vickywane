/**
 * @jest-environment jsdom
 */
import React from 'react'
import renderer from 'react-test-renderer'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from '../../components/header'

describe("Id displays the header element", () => {
    it('It displays home page', function () {
        const tree = renderer.create(<Header />).toJSON()

        expect(tree).toMatchSnapshot()
    });
})
