import { NavLink } from "react-router-dom";
import styled from "styled-components";

import {
  StH1,
  StH2,
  StP,
  StSection,
  StArticle,
} from "../Assets/HTMLComponents";
import CardButton from "../Components/Card/CardButton/CardButton";

const StCardFigure = styled.figure`
  width: 100%;
  height: 450px;
  margin: 32px 0;

  & figcaption {
    font-size: 20px;
  }
`;

const Home = () => (
  <StArticle>
    <StH1>Home</StH1>
    <StSection>
      <StH2>Hoe werkt het?</StH2>
      <StP>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus,
        felis laoreet dignissim pharetra, nulla quam ullamcorper eros, ac
        pellentesque metus odio quis massa.
      </StP>

      <StP>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus,
        felis laoreet dignissim pharetra, nulla quam ullamcorper eros, ac
        pellentesque metus odio quis massa, nulla quam ullamcorper eros, ac
        pellentesque.
      </StP>

      <NavLink to="overzicht/opassers">
        <StCardFigure>
          <CardButton
            src="https://dogtime.com/assets/uploads/2018/10/how-to-get-pet-sitter-job.jpg"
            buttonText="Neem een kijk naar onze opassers!"
          />
        </StCardFigure>
      </NavLink>
    </StSection>

    <StSection>
      <StH2>Wie zijn wij?</StH2>
      <StP>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus,
        felis laoreet dignissim pharetra, nulla quam ullamcorper eros, ac
        pellentesque metus odio quis massa. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. In cursus, felis laoreet dignissim
        pharetra, nulla quam ullamcorper eros, ac pellentesque metus odio quis
        massa. Nulla quam ullamcorper eros, ac pellentesque metus odio quis
        massa, nulla quam ullamcorper eros, ac pellentesque.
      </StP>
    </StSection>

    <StSection>
      <StH2>Contact</StH2>
      <StP>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus,
        felis laoreet dignissim pharetra, nulla quam ullamcorper eros, ac
        pellentesque metus odio quis massa. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. In cursus, felis laoreet dignissim
        pharetra, nulla quam ullamcorper eros, ac pellentesque metus odio quis
        massa.
      </StP>
    </StSection>
  </StArticle>
);

export default Home;
