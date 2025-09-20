"use client"
import styled from "styled-components"
import React from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import ReviewCard from "@/components/Cards/ReviewCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchReviews } from "@/state/actions/sanity.action"
import { AppDispatch, RootState } from "@/state"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"

interface ReviewsProp {
  type: "work_review" | "technical_writing_review"
}

const CardList = styled.ul`
  margin: 2rem 0;
  list-style: none;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-gap: 3rem 2rem;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: flex;
    flex-direction: column;
    grid-gap: 2rem 0;
  }
`

const Reviews = ({ type }: ReviewsProp) => {
  const { work_review, technical_writing_review } = useSelector(
    (state: RootState) => state.sanity
  )
  const dispatch: AppDispatch = useDispatch()

  React.useEffect(() => {
    ;(async () => {
      await dispatch(fetchReviews(type))
    })()
  }, [])

  if (type === "work_review") {
    if (!work_review) return null

    return (
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
        <Masonry gutter="1.5rem">
          {work_review.map(review => (
            <div key={review?._id}>
              <ReviewCard type={type} review={review} />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    )
  }

  if (type === "technical_writing_review") {
    if (!technical_writing_review) return null

    return (
      <CardList>
        {technical_writing_review.map((review, idx) => (
          <li key={idx}>
            <ReviewCard {...{ type, review }} />
          </li>
        ))}
      </CardList>
    )
  }

  return <></>
}

export default Reviews
