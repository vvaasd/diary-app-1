import React from 'react';
import { svgComponents } from './Svg';
import { IconNameType } from '@/types';

type IconProps = React.SVGProps<SVGSVGElement> & {
  name: IconNameType;
};

const Icon: React.FC<IconProps> = (props) => {
  const { name, ...otherProps } = props;

  const SvgComponent = svgComponents[name] || <svg></svg>;

  return <SvgComponent {...otherProps} />;
};

export default Icon;
