import React from "react";
import IcomoonReact from "icomoon-react";
import iconSet from "./selection.json";

interface IIcon {
  className?: string;
  color?: string;
  icon: string;
  size: string | number;
}

function Icon({
  color = "",
  size = "100%",
  icon,
  className = "",
}: IIcon): JSX.Element {
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={color}
      size={size}
      icon={icon}
    />
  );
}

export default Icon;
