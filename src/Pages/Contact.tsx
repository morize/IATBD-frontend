import { StH1, StH3, StP, StSection } from "../Utils/HTMLComponents";
import BaseButton from "../Components/Button/BaseButton";
import BaseInput from "../Components/Input/BaseInput";
import Textarea from "../Components/Input/TextArea";

const Contact = () => (
  <>
    <StSection>
      <StH1>Contact</StH1>
      <StP>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus,
        felis laoreet dignissim pharetra, nulla quam ullamcorper eros, ac
        pellentesque metus odio quis massa.
      </StP>
    </StSection>

    <StSection>
      <StH3>Stuur ons een mail</StH3>
      <BaseInput label="Uw naam:" />
      <Textarea label="Uw bericht:" placeholder="Dit werkt nog niet" />
      <BaseButton label="Stuur bericht" type="submit" />
    </StSection>
  </>
);

export default Contact;
