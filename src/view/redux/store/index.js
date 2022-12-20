import { configureStore } from '@reduxjs/toolkit' //配置store库
import counterSlice from './counter' // 导入创库

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer  //设置仓库和store的连接
  }
})

export default store;