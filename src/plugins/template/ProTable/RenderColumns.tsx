
import { Column } from './types';
import { CustomColumnType } from './constants';

/**
 * Packaging Columns, add some limitation for dataIndex, cloumn will be fixed when dataIndex is ‘options’
 * @param list same as ProColumns，add searchSpan to adjust the width of search bar
 * @returns return new ProColumns
 */
export const RenderColumns = <Row,>(colmns: Column<Row>[]): Column<Row>[] => {
  return colmns.map((item) => {
    let resItem: typeof item = {};

    resItem.fixed = item.dataIndex === 'options' ? 'right' : undefined;
    resItem.hideInSearch = true;
    resItem.initialValue = '';

    if (typeof item.dataIndex === 'string') {
      switch (item.CustomColumnType) {
        // case CustomColumnType.DateTime:
        //   if (item.renderText === undefined && item.dateInfo)
        //     resItem = {
        //       renderText: (text) => <span>{transferTimeString(text, item.dateInfo?.dateFormatter, item.dateInfo?.dateType)}</span>,
        //       renderFormItem: () => {
        //         return <Form.Item name={item.dateInfo?.name}>
        //           <DatePicker />
        //         </Form.Item>
        //       },
        //     };
        //   break;
        // case CustomColumnType.Switch:
        //   resItem = {
        //     render: (...args) => {
        //       const row = args[1];
        //       return (
        //         <OpBtn onClick={item.CustomItemContent?.operationFunc?.[0](row)}>
        //           {item.CustomItemContent?.key &&
        //           row[item.CustomItemContent?.key] ? (
        //             <span className="redHighlight">
        //               {item.CustomItemContent?.options[0]}
        //             </span>
        //           ) : (
        //             <span>{item.CustomItemContent?.options[1]}</span>
        //           )}
        //         </OpBtn>
        //       );
        //     },
        //   };
        //   break;
        case CustomColumnType.SwitchStatus:
          resItem = {
            render: (text, row) => (
              <span
                className={
                  item.CustomItemContent?.key && row[item.CustomItemContent?.key]
                    ? ''
                    : 'redHighlight'
                }
              >
                {item.CustomItemContent?.title}
              </span>
            ),
          };
          break;
        default:
      }
    }

    return {
      ...resItem,
      ...item,
    };
  });
};

export default RenderColumns;
