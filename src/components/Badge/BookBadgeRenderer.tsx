import React from 'react';
import { DisplayType } from 'src/types/sections';
import styled from '@emotion/styled';
import { RIDI_WAIT_FREE_ICON_URL } from 'src/constants/icons';

interface BookBadgeRendererProps {
  isWaitFree?: boolean;
  isRentable?: boolean;
  discountPercentage?: number;
  type: DisplayType;
}

const Rentable = styled.span`
  position: relative;
  font-weight: bold;
  font-size: 13px;
  line-height: 14px;
  color: #ffffff;
  z-index: 2;
`;
const Badge = styled.div<{ backgroundColor: string }>`
  width: 34px;
  height: 34px;
  border-radius: 34px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: ${(props) => props.backgroundColor};
`;

const DiscountPercentage = styled.span`
  top: 1.6px;
  transform: scale(0.92);
  font-weight: bold;
  margin-left: 0.7px;
  font-size: 11px;
  position: relative;
  line-height: 9px;
`;

const DiscountBadge = styled(Badge)`
  position: relative;
  color: white;
`;

const DiscountNumber = styled.span`
  font-size: 16px;
  mix-blend-mode: normal;
  font-weight: bold;
  line-height: 14px;
  opacity: 0.99;
`;

const WaitFree = styled.img`
  position: relative;
  left: 1px;
  z-index: 2;
  width: 20px;
  height: 18px;
`;

const BookBadgeRenderer: React.FC<BookBadgeRendererProps> = (props) => {
  const { isWaitFree, discountPercentage, isRentable } = props;
  if (isRentable) {
    return (
      <Badge className="badge" backgroundColor="#1abc9c">
        <Rentable>대여</Rentable>
      </Badge>
    );
  }
  if (isWaitFree) {
    return (
      <Badge className="badge" backgroundColor="#1f8ce6">
        <WaitFree src={RIDI_WAIT_FREE_ICON_URL} alt="리디 기다리면 무료" />
      </Badge>
    );
  }
  if (discountPercentage && discountPercentage >= 10) {
    return (
      <DiscountBadge
        className="badge"
        backgroundColor="#70808f"
        role="img"
        aria-label={`${discountPercentage}% 할인`}
      >
        <DiscountNumber>{discountPercentage}</DiscountNumber>
        <DiscountPercentage>%</DiscountPercentage>
      </DiscountBadge>
    );
  }
  return null;
};

export default BookBadgeRenderer;
