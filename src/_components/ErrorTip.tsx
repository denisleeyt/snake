import React from 'react';

export type ErrorTipProps = {
  type: string;
};

// @ts-ignore
const ErrorTip: React.FC<ErrorTipProps> = ({ type }) => {
  const errMsg = `Unmatched render type [${type}]`;
  console.warn(errMsg);
  return <span style={{ background: 'red', color: 'white' }}>{errMsg}</span>;
};

export default ErrorTip;
