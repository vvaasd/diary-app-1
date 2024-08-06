import React from 'react';
import { LogoSvg, EditSvg, NoDataSvg } from './Svg';

const svgComponents = {
  logo: LogoSvg,
  edit: EditSvg,
  noData: NoDataSvg,
} as const;

export type IconNameType = keyof typeof svgComponents;

type IconProps = React.SVGProps<SVGSVGElement> & {
  name: IconNameType;
};

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const SvgComponent = svgComponents[name] || <svg></svg>;
  return <SvgComponent {...props} />;
};

export default Icon;
