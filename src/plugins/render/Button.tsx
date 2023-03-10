import React, { useMemo, useState } from 'react';
import { Button } from 'antd';
import type { SnakeApi } from '../../type';
import type { SchemaComponentType } from '../type';
import { useEvent } from '../hooks';

const SchemaButton: React.FC<SchemaComponentType> = ({
  api,
  ctx,
  children = null,
  onClick,
  props = {},
  withDisabled = false,
  withLoading = false,
}) => {
  const [disabled, setDisabled] = useState(props?.disabled);
  const [loading, setLoading] = useState(props?.loading);
  const handleClick = useEvent(async () => {
    try {
      if (withDisabled) setDisabled(true);
      if (withLoading) setLoading(true);
      await onClick?.();
    } finally {
      if (withDisabled) setDisabled(false);
      if (withLoading) setLoading(false);
    }
  });

  const childrenDom = useMemo(() => {
    // @ts-ignore
    return api.renderSchemas(ctx, children);
  }, [children, ctx]);
  return (
    <Button onClick={handleClick} disabled={disabled} loading={loading} {...props}>
      <span>{childrenDom}</span>
    </Button>
  );
};

export default function ButtonRenderPlugin(api: SnakeApi) {
  api.registerRender('button', (args, ctx) => {
    return <SchemaButton api={api} ctx={ctx} {...args} />;
  });
}
