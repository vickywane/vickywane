import styled from "styled-components";
import { ContentLayout, Flex, Text } from "@/styles";
import { Gallery as GalleryType } from "@/data/schema";
import Image from "next/image";
import { ImageLoader } from "@/utils/Cloudinary";
import Layout from "@/styles/Layout";

const MasonryList = styled.div`
  // TODO: implement a masonry layout here.... later
  //display: inline-block;
  //width: 100%;
  //column-count: auto;
  //column-width: 15rem;
  //column-gap: 50px;
  //row-gap: 50px;
  //overflow: hidden;
  ////gap: 40px 50px;

  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
`;

interface HomeMasonryProps {
  galleryItems: GalleryType;
}

const ImageContainer = styled.div`
  //width: 300px;
  //height: 300px;
  position: relative;
  margin: 10px;
  //ma

  img {
    //background: red;
    width: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`;
const HomeMasonry = ({ galleryItems }: HomeMasonryProps) => {
  return (
    <Layout>
      {/*<Flex justify={"center"}>*/}
      {/*    <Text> HOME MASONRY COMPONENT </Text>*/}
      {/*</Flex>*/}

      <MasonryList className={"images-list"}>
        {galleryItems?.images.map((item, idx) => {
          return (
            <li key={idx}>
              {item?.public_id && (
                <ImageContainer>
                  <img
                    // fill
                    src={`${item?.secure_url}`}
                    alt={`Gallery - ${idx}`}
                  />
                </ImageContainer>
              )}
            </li>
          );
        })}
      </MasonryList>
    </Layout>
  );
};
export default HomeMasonry;
