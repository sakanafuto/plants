import React, { Component } from 'react'
import Form from './Form'
import List from './List'
import Auth from './Auth'

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      plants: []
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  // データ保存
  handleAdd(e){
    e.preventDefault()
    // フォームから受け取ったデータをオブジェクトに挿入して、stateのplants配列に追加
    this.state.plants.push({name: e.target.name.value})
    // setStateを使ってstateを上書き
    this.setState({plants: this.state.plants})
    // inputのvalueを空に
    e.target.name.value = ''
  }

  // データ削除
  handleRemove(i){
    // plants配列からi番目から1つ目のデータを除外
    this.state.plants.splice(i,1)
    // setStateでplants配列を上書き
    this.setState({plants: this.state.plants})
  }

  render() {
    return (
      <div className="siimple-box siimple--bg-dark">
        <h1 className="siimple-box-title siimple--color-white">plants</h1>
        <Form handleAdd={this.handleAdd}/>
        <div className="siimple-rule"></div>
        <List plantss={this.state.plants} handleRemove={this.handleRemove}/>
        <Auth />
      </div>
    )
  }
}