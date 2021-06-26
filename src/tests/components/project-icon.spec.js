 import React from 'react'
 import renderer from 'react-test-renderer'
 
 import ProjectIcon from '../../components/projectIcons'
 
 describe("Project Stack Icons", () => {
     it('It displays the correct icon based on `icon` prop', function () {
         let tree = renderer.create(<ProjectIcon icon="graphql" />).toJSON()
        
         expect(typeof tree).toBe('object')
         expect(typeof tree.props.id).toBe('string')         
         expect(tree.props.id).toBe('graphql')
     });

     it('It displays the correct icon based on `size` prop', function () {
        let tree = renderer.create(<ProjectIcon icon="graphql" size={20} />).toJSON()
       
        expect(typeof tree).toBe('object')
        expect(typeof tree.props.size).toBe('number')         
        expect(tree.props.size).toBe(20)         
    });

    it('It displays a default fallback icon', function () {
        let tree = renderer.create(<ProjectIcon />).toJSON()
       
        expect(tree.props.id).toBe("fallback-icon")
    });
 })
 