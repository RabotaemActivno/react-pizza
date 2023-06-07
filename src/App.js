import './scss/app.scss'
import { Header } from './components/Header';
import { Sort } from './components/Sort';
import { Categories } from './components/Categories';
import { PizzaBlock } from './components/PizzaBlock';



function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title='mexican' price = {246}/>
            <PizzaBlock title='bezmyasa' price = {100}/>
            <PizzaBlock title='mu-mu' price = {378}/>
            <PizzaBlock title='chuxecan' price = {500}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
