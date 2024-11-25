import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const SliderTooltipHorizontal = () => {
  const { Handle } = Slider;
  const handle = (props) => {
    const { value, index, ...restProps } = props;
    return (
      <div prefixCls="rc-slider-tooltip" overlay={`${value} %`} visible placement="bottom" key={index}>
        <Handle value={value} {...restProps} />
      </div>
    );
  };

  return (
    <>
      <Slider min={0} max={20} defaultValue={3} handle={handle} />
    </>
  );
};

export const SliderTooltipVertical = () => {
  const { Handle } = Slider;
  const handle = (props) => {
    const { value, index, ...restProps } = props;
    return (
      <SliderTooltip prefixCls="rc-slider-tooltip" overlay={`${value} %`} visible placement="right" key={index}>
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  return (
    <>
      <Slider vertical min={0} max={20} defaultValue={3} handle={handle} />
    </>
  );
};
