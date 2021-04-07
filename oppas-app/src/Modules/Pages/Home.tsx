import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { StH1, StH2, StP, StSection } from "../../Utils/HTMLComponents";
import CardButton from "../../Components/Card/CardButton/CardButton";

const StHomeArticle = styled.article`
  width: 800px;
  margin: 0 auto;
`;

const StFigure = styled.figure`
  width: 100%;
  height: 450px;
  margin: 32px 0;

  & figcaption {
    font-size: 1.5rem;
  }
`;

const Home = () => (
  <StHomeArticle>
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
        <StFigure>
          <CardButton
            src="https://dogtime.com/assets/uploads/2018/10/how-to-get-pet-sitter-job.jpg"
            buttonText="Neem een kijk naar onze opassers!"
          />
        </StFigure>
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
  </StHomeArticle>
);

export default Home;
