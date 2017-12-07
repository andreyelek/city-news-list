import { kea } from 'kea'
import PropTypes from 'prop-types'
import axios from 'axios'

const api = 'http://example.spider.ru/api'

export default kea({
  actions: ({ constants }) => ({
    getCatalog: value => ({ value }),
    getNews: value => ({ value }),
    getDetailedNews: value => ({ value }),
  }),

  reducers: ({ actions, constants }) => ({
    catalog: [{}, PropTypes.object, {
      [actions.getCatalog]: (state, payload) => {
        const { value } = payload

        return {
          ...state,
          ...value
        }
      },
   
    }],
    news: [{results:[]}, PropTypes.object,{
      [actions.getNews]: (state, payload) => {
        const { value } = payload

        return {
          ...value
        }
      },
    }],
    detailedNews: [{city:{}}, PropTypes.object,{
      [actions.getDetailedNews]: (state, payload) => {
        const { value } = payload
        return {
          ...value
        }
      },
    }]
  }),


  thunks: ({ actions }) => ({
    fetchData: async (options) => {
      try{
        const payload1 = await axios.get(`${api}/catalog`);
        actions.getCatalog(payload1.data);
        const payload2 = await axios.get(`${api}/page`,{params: options});
        actions.getNews(payload2.data);
      }
      catch(e){
        console.log(e,e.message)
      }

    },
    fetchDetailedNews: async (id)=>{
      try{
        const payload = await axios.get(`${api}/page/detail/${id}/`);
        actions.getDetailedNews(payload.data);
      }
      catch(e){
        console.log(e,e.message)
      }
    },
    editNews: async (id, data)=>{
      try{
        const payload = await axios.put(`${api}/page/update/${id}/`,data);
        actions.fetchDetailedNews(payload.data.id);
      }
      catch(e){
        console.log(e,e.message)
      }
    },
    createNews: async (data)=>{
      try{
        axios.post(`${api}/page/create/`,data);
        actions.fetchData()
        
      }
      catch(e){
        console.log(e,e.message)
      }
    },


  })
})
