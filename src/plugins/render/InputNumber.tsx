import { useRef } from 'react';
import { InputNumber } from 'antd';
import { RenderModes } from '../constants';
import type { SnakeApi } from '../../type';
import { _formatThousands } from '../_utils/normalize';

// @ts-ignore
function FiatInputNumber({ precision, ...restProps }) {
  const rcInputNumberRef = useRef<{ value?: string | null }>();
  const rcInputNumberFocus = useRef(false);

  return (
    <InputNumber
      // @ts-ignore
      ref={rcInputNumberRef}
      onBlur={() => {
        rcInputNumberFocus.current = false;
        // case when delete before `.`
        // if (rcInputNumberRef.current?.value.startsWith('.')) {
        //   onChange(value);
        // }
      }}
      onFocus={() => {
        rcInputNumberFocus.current = true;
      }}
      onKeyPress={(e) => {
        // illegal words
        if (/[^(\d|.)]/.test(e.key)) {
          e.preventDefault();
          return;
        }

        // prevent enter '.' when precision is 0
        if (precision === 0 && ['.'].includes(e.key)) {
          e.preventDefault();
          return;
        }

        // precision
        // @ts-ignore
        const { selectionStart, selectionEnd } = e.target;
        if (precision && selectionStart === selectionEnd) {
          const pos = rcInputNumberRef.current?.value?.indexOf('.') ?? 0;
          if (
            pos >= 0 &&
            selectionStart > pos &&
            (rcInputNumberRef.current?.value?.length ?? 0) - pos > precision
          ) {
            e.preventDefault();
          }
        }
      }}
      precision={precision}
      formatter={(val) => {
        // console.log('formatter', value, val, rcInputNumberRef.current?.value);
        // case when delete before `.` or ends with `0`, eg: '0.00'
        if (
          rcInputNumberFocus.current &&
          (rcInputNumberRef.current?.value?.startsWith('.') ||
            (Number(val) === 0 && rcInputNumberRef.current?.value?.endsWith('0')))
        ) {
          return rcInputNumberRef.current?.value;
        }
        return _formatThousands(Number(val));
      }}
      // @ts-ignore
      parser={(val) => {
        // console.log('parser', val, rcInputNumberRef.current?.value);
        return val?.replace(/\$\s?|(,*)/g, '');
      }}
      {...restProps}
    />
  );
}

export default function InputNumberRenderPlugin(api: SnakeApi) {
  api.registerRender('input-number', ({ mode = RenderModes.ADD, value, onChange, props }) => {
    if (mode === RenderModes.VIEW) {
      return <span>{_formatThousands(value)}</span>;
    }

    // @ts-ignore
    return <FiatInputNumber value={value} onChange={onChange} {...props} />;
  });
}
