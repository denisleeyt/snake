import React, { useCallback, useRef, useState } from 'react';
import { dynamic } from 'umi';
import { Space, Button, Drawer, notification } from 'antd';
import { BugOutlined } from '@ant-design/icons';

import './index.less';

export default dynamic({
  loader: async function () {
    // webpackChunkName tells webpack create separate bundle for HugeA
    const { default: MonacoEditor } = await import(
      /* webpackChunkName: "monaco" */ 'react-monaco-editor'
    );
    return ({ schema, onChange }): JSX.Element => {
      const [visible, setVisible] = useState(false);
      const editorRef = useRef(null);

      const handleSubmit = useCallback(() => {
        if (editorRef?.current) {
          try {
            const content = editorRef?.current?.editor?.getValue();
            onChange?.(JSON.parse(content));
            setVisible(false);
          } catch (e) {
            console.error(e);
            notification.error({
              message: 'Invalid schema',
              description: e?.message,
            });
          }
        }
      }, [schema]);

      return (
        <>
          <Button type="primary" icon={<BugOutlined />} onClick={() => setVisible(true)}>
            Try <BugOutlined />
          </Button>
          <Drawer
            visible={visible}
            closable={false}
            className="try-drawer"
            title="Try to update the Schema"
            extra={
              <Space>
                <Button onClick={() => setVisible(false)} type="dashed">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} type="primary">
                  Submit
                </Button>
              </Space>
            }
          >
            <MonacoEditor
              className="try-editor"
              language="json"
              theme="vs-dark"
              value={JSON.stringify(schema, null, 2)}
              ref={editorRef}
              options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                // readOnly: true,
                // cursorStyle: 'line',
                automaticLayout: true,
              }}
            />
          </Drawer>
        </>
      );
    };
  },
});
