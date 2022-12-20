import React from 'react'
import './index.scss'
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;
export default function index() {
  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };

  return (
    <div className='datepage'>
      <div className='datepage-left'>
        <div className='letf-infaction'></div>
        <button className='button'>RESERVATION</button>
      </div>
      <div className='datepage-right'>
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD"
          onChange={onChange}
          onOk={onOk}
          open
          placement={"bottomLeft"}
          inputReadOnly={true}
          showNow={true}
        />
      </div>
    </div>
  )
}
