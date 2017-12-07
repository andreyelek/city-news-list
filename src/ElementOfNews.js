import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'kea'
import logic from './logic'
import {Button, Select, Input, Checkbox} from 'antd'
import { withRouter } from 'react-router'
const { TextArea } = Input
const {Option} = Select;
const listItemLogic = connect({
    props: [
        logic, [
          'detailedNews',
          'catalog'
        ]
    ],
    actions:[
      logic,[
        'fetchDetailedNews',
        'editNews'
      ]
    ]
 })
class ElementOfNews extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
        formEdit: false,
        text: undefined,
        title: undefined,
        active: undefined,
        city: undefined
    }

  }

  componentDidMount(){
      this.props.actions.fetchDetailedNews(this.props.match.params.id)

  }

  onSubmit(){
    const {detailedNews}= this.props
    const {text, title, active,city}= this.state
    const payload = {
      text:text===undefined?detailedNews.text:text, 
      title:title===undefined?detailedNews.title:title,
      active:active===undefined?detailedNews.active:active,
      city:city===undefined?detailedNews.city.id:city
    }
    const {actions:{editNews},match:{params:{id:newsId}}} = this.props
    editNews(newsId, payload)
    this.setState({formEdit:false,
        text: undefined,
        title: undefined,
        active: undefined,
        city: undefined})

  }
  render(){
    const{ catalog, detailedNews} = this.props
    const { formEdit } = this.state
    return (
      <div style={{padding: 30}}>
        <Link to='/'>Ссылка на главную</Link>

        <h3>ID новости: {this.props.match.params.id}</h3>
        {formEdit?
          <div ref='form' style={{width: 500}}>
            Заголовок: <Input onChange={e=>{this.setState({title:e.target.value})}} style={{ width: 250, marginLeft: 50}} defaultValue = {detailedNews.title} /><br/><br/>

            Город на который ссылается новость: 
              <Select defaultValue={detailedNews.city.id} style={{ width: 120, marginLeft: 10}} onChange={e=>this.setState({city:e})}>
                {Object.values(catalog).map(e=> <Option key={e.id} value={e.id}>{e.name}</Option> )}
              </Select>   
            <br/><br/>

             Текст новости:<br/><br/> <TextArea onChange={e=>{this.setState({text:e.target.value})}} style={{width: 350}} defaultValue = {detailedNews.text}/><br/><br/>
          
             <Checkbox onChange={e=>{this.setState({active:e.target.checked})}} defaultChecked={detailedNews.active}>Активная новость</Checkbox><br/><br/>
          </div>:  
          <div>
            <p>Заголовок: {detailedNews.title}</p>
            <p>Город на который ссылается новость: {detailedNews.city.name}</p>    
            <p>Текст новости: {detailedNews.text}</p>
            <p>{detailedNews.active?'Активная':'Неактивная'} новость</p>
          </div>
        }
        <p>Создан: {detailedNews.created}</p>
        <p>Последний раз изменён: {detailedNews.modified}</p>

        <div className="actions">
          <Button type={formEdit ? '' : 'primary'} style={{marginRight: 20}} onClick={()=>this.setState({formEdit:!formEdit})}>
              {formEdit ? 'Отмена' : 'Редактировать'}
          </Button>
          {formEdit ?<Button type="primary" onClick={()=>this.onSubmit()}>Сохранить</Button>: null}
        </div>
      </div>

    )
  }
}

export default withRouter(listItemLogic(ElementOfNews))