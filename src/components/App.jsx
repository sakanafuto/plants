import React, { Component, useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { listNotes } from './graphql/queries'
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations'
import Form from './Form'
import List from './List'
import Auth from './Auth'

const initialFormState = { name: '', caption: '' }

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

    const [notes, setNotes] = useState([])
    const [formData, setFormData] = useState(initialFormState)
  
    useEffect(() => {
      fetchNotes()
    }, [])

    async function fetchNotes() {
      const apiData = await API.graphql({ query: listNotes })
      setNotes(apiData.data.listNotes.items)
    }
  
    async function createNote() {
      if (!formData.name || !formData.description) return
      await API.graphql({ query: createNoteMutation, variables: { input: formData } })
      setNotes([ ...notes, formData ])
      setFormData(initialFormState)
    }
  
    async function deleteNote({ id }) {
      const newNotesArray = notes.filter(note => note.id !== id)
      setNotes(newNotesArray)
      await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }})
    }

  render() {
    return (
      <div className="siimple-box siimple--bg-dark">
        <h1 className="siimple-box-title siimple--color-white">plants</h1>
        <Form handleAdd={this.handleAdd}/>
        <div className="siimple-rule"></div>
        <List plantss={this.state.plants} handleRemove={this.handleRemove}/>
        <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <button onClick={createNote}>Create Note</button>
      <div style={{marginBottom: 30}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(note)}>Delete note</button>
            </div>
          ))
        }
      </div>
        <Auth />
      </div>
    )
  }
}