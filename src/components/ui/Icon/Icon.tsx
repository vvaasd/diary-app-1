import React from 'react';
import {
  LogoSvg,
  EditSvg,
  NoDataSvg,
  CalendarSvg,
  EmojiSvg,
  ImageSvg,
  NotAllowedSvg,
  XMarkSvg,
  ArrowDownSvg,
} from './Svg';

const svgComponents = {
  logo: LogoSvg,
  edit: EditSvg,
  noData: NoDataSvg,
  calendar: CalendarSvg,
  emoji: EmojiSvg,
  image: ImageSvg,
  notAllowed: NotAllowedSvg,
  xMark: XMarkSvg,
  arrowDown: ArrowDownSvg,
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
