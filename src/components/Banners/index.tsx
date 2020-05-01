import React from "react";
import styled from "@emotion/styled";
import { BannerObj } from "context/banners";
import { Banner } from "components/Banners/Banner";

interface BannersProps {
  banners: BannerObj[];
  removeBanner: (bannerId: string) => void;
}

export const Banners: React.FC<BannersProps> = ({ banners, removeBanner }) => {
  return (
    <BannersWrapper>
      {banners &&
        banners.map(({ id, type, message }) => (
          <Banner {...{ id, type, removeBanner }}>{message}</Banner>
        ))}
    </BannersWrapper>
  );
};

const BannersWrapper = styled.div`
  & > :not(:last-child) {
    margin-bottom: 8px;
  }
`;