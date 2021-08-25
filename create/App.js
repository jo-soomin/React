import { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode:"welcome",
      selected_content_id:2,
      subject:{title:"WEB", sub:"world wide web!"},
      welcome: {title:"welcome", desc:"hello, React!!"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is HyperText ..."},
        {id:2, title:"CSS", desc:"CSS is design ..."},
        {id:3, title:"JavaScript", desc:"JavaScript is interactive ..."},
      ]//contents 배열
    } 
  }
  render() {    
    var _title, _desc, _article = null;
    if(this.state.mode === "welcome"){
      _title= this.state.welcome.title;    
      _desc= this.state.welcome.desc; 
      _article =<ReadContent title={_title} desc={_desc}></ReadContent> 
    }else if(this.state.mode === "read"){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i]
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i +1;
      }    
      _article =<ReadContent title={_title} desc={_desc}></ReadContent>   
    }else if(this.state.mode ==="create"){
      _article =<CreateContent></CreateContent>   
    }
    return (
      <div className="App">
         {/* <header>
              <h1><a href="/" onClick={function(e){
                alert("hi");
                e.preventDefault();// 해당 태그의 가장 기본 기능을 막아준다.
                //this.state.mode = "welcome"; 틀린문법
                this.setState({
                  mode:"welcome"
                });           
              }.bind(this)}>{this.state.subject.title}</a></h1>
              {this.state.subject.sub}
          </header>      */}
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage = {function(){ // props의 형태로 함수가 전해짐            
            this.setState({
              mode: "welcome"              
            });
          }.bind(this)}
        >
        </Subject>               
        <TOC
          onChangePage={function(id){                   
            this.setState({
              mode: "read",
              selected_content_id:Number(id)
          });
        }.bind(this)}
          data={this.state.contents}>
        </TOC>       
        <Control onChangeMode={function(mode){
          this.setState({
            mode: mode            
          });
        }.bind(this)}></Control>        
        {_article}
      </div>
    );
  }
}

export default App;
