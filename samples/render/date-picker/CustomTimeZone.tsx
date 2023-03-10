/**
 * desc: setTimeZone 执行后，会改变全局默认的时区
 */

import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import moment from 'moment';
import Snake, { setTimeZone, getTimeZone } from '@bybit-fe/snake';

const schema = {
  type: 'date-picker',
  props: {
    format: 'YYYY-MM-DD HH:mm:ss',
    showTime: true,
  },
  onChange: (date, dateString) => {
    console.log('date-picker changed: ', date, date?.valueOf(), dateString);
  },
};

const CustomTimeZone = () => {
  const [time, setTime] = useState({
    zone: getTimeZone(),
    now: moment().format(),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime({
        zone: getTimeZone(),
        now: moment().format(),
      });
    }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <>
      <p>
        Time Zone: [{moment().utcOffset() / 60}: {getTimeZone()}], now: {time.now},
      </p>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setTimeZone('Etc/UCT')}>
          Set to Etc/UCT
        </Button>
        <Button type="primary" onClick={() => setTimeZone('Europe/London')}>
          Set to Europe/London
        </Button>
        <Button type="primary" onClick={() => setTimeZone('America/New_York')}>
          Set to America/New_York
        </Button>
        <Button type="primary" onClick={() => setTimeZone()}>
          Reset
        </Button>
      </Space>
      <Snake {...schema} />
    </>
  );
};

export default CustomTimeZone;
