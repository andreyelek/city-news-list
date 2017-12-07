/* eslint-disable */
import React from 'react';
import { Modal,Button,Input, Select,Checkbox} from 'antd';
import {connect} from 'kea'
import logic from './logic'

const {Option} = Select;
const {TextArea} = Input


const createNewsLogic = connect({
    props: [
        logic, [
        'catalog'
        ]
    ],
    actions: [
      logic, [
        'createNews',
        ]
    ]
  })


class CreatePieceOfNews  extends React.Component{
	constructor(props) {
    super(props);

    this.state={
    	active: false,
        text:'текст',
        city: 1,
        title: 'Заголовок'
    }
  }

	handleAddNews(){
		const {active, text, city, title} = this.state
		const {actions:{createNews}, handleModal} = this.props
		const options = {
			active, text, city, title
		}
		createNews(options)
  	handleModal()
  }

	render(){
		const {visible, handleModal, catalog} = this.props
		const {active, text, city, title} = this.state
		return (
		    <Modal
		      title="Добавить новость"
		      visible={visible}
		      onOk={()=>this.handleAddNews()}
		      onCancel={()=>handleModal()}
		      footer={[
	            <Button key="back" size="large" onClick={()=>handleModal()}>Отмена</Button>,
	            <Button key="submit" type="primary" size="large" onClick={()=>this.handleAddNews()}>
	              Добавить новость
	            </Button>
	          ]}
		    >	    
		       	Заголовок: 
		       	<Input 
			       onChange={e=>{this.setState({title:e.target.value})}} 
			       style={{ width: 250, marginLeft: 50}} 
			       value = {title} 
		       	/><br/><br/>

		        Город на который ссылается новость: <Select style={{marginLeft: 40}} value={city} onChange={e=>this.setState({city:e})}>
		          {Object.values(catalog).map(e=> <Option key={e.id} value={e.id}>{e.name}</Option> )}
		        </Select>   
						<TextArea style={{margin: '10px 0', width: '93%'}} 
							value={text} 
							rows={4} onChange={(e)=>{this.setState({text: e.target.value})}}
						/>
						<Checkbox onChange={e=>{this.setState({active:e.target.checked})}} checked={active}>Активная новость</Checkbox>
		  </Modal>

		);
	}
}
export default createNewsLogic(CreatePieceOfNews)