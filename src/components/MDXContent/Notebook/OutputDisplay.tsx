import Image from "../Image";

const OutputDisplay = ({ data }: { data: string }) => {
  return (
    <div>
      <img src={`data:image/png;base64,${data}`} />
    </div>
  );
};

export default OutputDisplay;
