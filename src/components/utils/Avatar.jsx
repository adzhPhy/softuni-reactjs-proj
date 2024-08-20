import { Avatar } from "@material-tailwind/react";

function AvatarComp({ author }) {
  return (
    <Avatar
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "100%",
        border: "1.5px solid",
        backgroundColor: "whitesmoke",
        marginLeft: "1rem",
      }}
      src={`https://robohash.org/${author}.png`}
      alt={`${author}-image`}
    />
  );
}

export default AvatarComp;
