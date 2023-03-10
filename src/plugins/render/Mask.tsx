import React, { useState } from 'react';
import { RenderModes } from '../constants';
import type { SnakeApi } from '../../type';

export type ViewInputProps = {
  value: string;
};

// @ts-ignore
const ViewInput: React.FC<ViewInputProps> = ({ value }) => {
  const [showValue, setShowValue] = useState('*******');
  return (
    <span
      title={value}
      onMouseOver={() => {
        setShowValue(value);
      }}
      onMouseOut={() => {
        setShowValue('*******');
      }}
    >
      {showValue}
    </span>
  );
};

export default function MaskRenderPlugin(api: SnakeApi) {
  api.registerRender('mask-input', ({ mode = RenderModes.ADD, value, onChange, props }) => {
    if (mode === RenderModes.VIEW) {
      return <ViewInput value={value} />;
    }

    return api.render('input', {
      value,
      mode,
      onChange,
      props: { ...(props ?? {}) },
    });
  });

  api.registerRender('mask-textarea', ({ mode = RenderModes.ADD, value, onChange, props }) => {
    if (mode === RenderModes.VIEW) {
      return <ViewInput value={value} />;
    }
    return api.render('textarea', {
      value,
      mode,
      onChange,
      props: { ...(props ?? {}) },
    });
  });
}
