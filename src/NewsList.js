import React ,{Component}from 'react'
import { List, Button, Select,Radio,Icon} from 'antd';
import {connect} from 'kea'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logic from './logic'
import CreatePieceOfNews from './CreatePieceOfNews'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {Option} = Select;

const listLogic = connect({
    props: [
        logic, [
        'news',
        'catalog'
        ]
    ],
    actions: [
      logic, [
        'fetchData',
        ]
    ]
  })

const pullOurUrlParams = str =>{
   // eslint-disable-next-line
  const regex = /([?&])([^=\n]+)\=([^&\n]+)/g;
  let m;
  let params = {}
   // eslint-disable-next-line
  while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      params[m[2]]=m[3]
  }
  return params
}

class NewsList extends Component {
  constructor(props){
    super(props)
    this.currentOptions={}
    this.state={
      createNewsVisible: false
    }
  }
  handleChange(name, value){
    this.currentOptions[name] = value
    this.props.actions.fetchData(this.currentOptions)
  }
  componentDidMount() {
      this.interval = setInterval(()=>this.forceUpdate(), 1000);
      this.props.actions.fetchData()
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render(){
    const {news,catalog} = this.props

    return(
      <div style={{margin: '20px'}}>
        <Button.Group style={{margin:10}}>
          <Button onClick={()=>this.handleChange('cursor',pullOurUrlParams(news.previos).cursor)} disabled={!news.previous} type="primary">
            <Icon type="left" />Backward
          </Button>
          <Button onClick={()=>this.handleChange('cursor',pullOurUrlParams(news.next).cursor)} disabled={!news.next} type="primary">
            Forward<Icon type="right"/>
          </Button>
        </Button.Group>

        <RadioGroup style={{margin:10}} onChange={e=>this.handleChange('active',e.target.value)} defaultValue=''>
          <RadioButton value=''>Все новости</RadioButton>
          <RadioButton value={true}>Только активные</RadioButton>
          <RadioButton value={false}>Только неактивные</RadioButton>
        </RadioGroup>

          
        <Select defaultValue='' style={{ width: 120, margin:10}} onChange={e=>this.handleChange('city',e)}>
          <Option key={99} value={''}>Все города</Option>
          {Object.values(catalog).map(e=> <Option key={e.id} value={e.id}>{e.name}</Option> )}
        </Select>   
        <Button style={{margin:10}} onClick={()=>this.setState({createNewsVisible:true})}>Создать новость</Button>

        <List
          itemLayout="horizontal"
          dataSource={news.results}
          renderItem={item => (
            <List.Item actions={[<Link to={`/${item.id}`}>More</Link>]}>
              <List.Item.Meta
                title={item.id}
                description={item.title}
                 key={item.id}
              />
            </List.Item>
          )}
        />
        <CreatePieceOfNews 
          visible={this.state.createNewsVisible} 
          handleModal={()=>this.setState({createNewsVisible:false})} 
        />
      </div>  
    )
  }
}

export default withRouter(listLogic(NewsList))


