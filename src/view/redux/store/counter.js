import { createSlice } from '@reduxjs/toolkit' //初始化仓库使用

const counterSlice = createSlice({
  name: 'counter',
  initialState: { counter: 0 }, //状态变量的初始化
  reducers: {
    increment(state) {  //修改状态变量的方法
      state.counter++;
    },
    decrement(state) { //修改状态变量的方法
      state.counter--;
    },
    addBy(state, action) { //修改状态变量的方法，在页面中传入了值就会到action参数上
      state.counter += action.payload;
    }
  }
})

export const actions = counterSlice.actions;  //导入actions方便页面使用
export default counterSlice;  //导入仓库方便store使用