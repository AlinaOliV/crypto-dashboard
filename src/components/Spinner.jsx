import { BarLoader } from "react-spinners";

const override = {
  display: "block",
  marginInline: "auto",
};

const Spinner = ({ color = "blue", size = "150" }) => {
  return (
    <div>
      <BarLoader 
      color={color} 
      size={size} 
      data-testid="loader"
      cssOverride = {override}
      />
    </div>
  );
};

export default Spinner;
