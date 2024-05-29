const OutputText = ({ data }: { data: string }) => {
  console.log(`data`, data);
  return (
    <div>
      {data.split("\n").map((x) => (
        <span style={{ display: "block" }}>{x}</span>
      ))}
    </div>
  );
};

export default OutputText;
