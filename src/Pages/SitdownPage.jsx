import React, { useState } from "react";
import SitdownPerson from "../Components/StandSitdown/SitdownPerson";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import StandPerson from "../Components/StandSitdown/StandPerson";
import SitModal from "../Components/Modal/SitModal";
const SitdownPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [isSit, setIsSit] = useState(false);
  return (
    <>
      <Header />

      {isSit ? (
        <StandPerson isSit={isSit} setIsSit={setIsSit} />
      ) : (
        <SitdownPerson
          isSit={isSit}
          setIsSit={setIsSit}
          isModal={isModal}
          setIsModal={setIsModal}
        />
      )}
      {isModal && <SitModal isModal={isModal} setIsModal={setIsModal} />}

      <Footer />
    </>
  );
};
export default SitdownPage;
