import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Loadable from 'react-loadable';

// 这是实现当在加载页面的使用出现网络慢展示的页面
function Loading() {
  return <div>loading....</div>
}


//下面是导入需要懒加载的页面的方法
const Subpage_1 = Loadable({
  loader() {
    return import('./Subpage_1');
  }, //导入页面
  loading: Loading, //配置网络慢展示的页面
  delay: 500,//设置延迟加载：就是当网络不是很快和很慢的使用使用，加载的页面会出现一闪的效果，这也用户体验不好，设置这时间就是让在500ms内都是加载的页面
});
const Subpage_2 = Loadable({
  loader() {
    return import('./Subpage_2');
  },
  loading: Loading
});


export default function react_loadable_loading() {
  return (
    <div>
      <h1>react_loadable实现懒加载</h1>
      <button><Link to='/react_loadable/supage_1'>supage_1</Link></button>
      <button><Link to='/react_loadable/supage_2'>supage_2</Link></button>
      <Switch>
        <Route path='/react_loadable/supage_1' component={Subpage_1} />
        <Route path='/react_loadable/supage_2' component={Subpage_2} />
      </Switch>
    </div>
  )
}
