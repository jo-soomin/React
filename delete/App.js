import { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state={
      mode:"read",
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
  getReadContent(){
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i]
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i = i +1;
    }    
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === "welcome"){
      _title= this.state.welcome.title;    
      _desc= this.state.welcome.desc; 
      _article =<ReadContent title={_title} desc={_desc}></ReadContent> 
    }else if(this.state.mode === "read"){
      var _content = this.getReadContent();    
      _article =<ReadContent title={_content.title} desc={_content.desc}></ReadContent>   
    }else if(this.state.mode ==="create"){
      _article =<CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id+1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title: _title, desc: _desc}
        // ); // push 보다는 concat 사용하기!
        var result = this.state.contents.concat(
          {id:this.max_content_id, title: _title, desc: _desc}
        ); 
        this.setState({
          contents:result,
          selected_content_id :this.max_content_id, 
          mode:"read",
        });        
      }.bind(this)}></CreateContent>   
    }else if(this.state.mode ==="update"){
      _content =this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){       
       // this.state.contents.push(
        //   {id:this.max_content_id, title: _title, desc: _desc}
        // ); // push 보다는 concat 사용하기!
        var _contents = Array.from(this.state.contents); // 기존의 contents 배열 복제한 새로운 배열(immutable)     

        var i =0;

        while(i<_contents.length){
          if(_contents[i].id === _id){
            _contents[i] ={id:_id, title: _title, desc: _desc};
            break;
          }
          i = i +1;
        }
        
        this.setState({
          contents:_contents,
          mode: "read"
        });        
      }.bind(this)}></UpdateContent>         
    }
    return _article;
  }
  render() {       
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
        <Control onChangeMode={function(_mode){
          if(_mode === "delete"){
            if(window.confirm("삭제 하시겠습니까?")){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i, 1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                contents: _contents,
                mode:"welcome"
              });
            }
          }else{
            this.setState({
              mode: _mode            
            });
          }          
        }.bind(this)}></Control>        
        {this.getContent()}
      </div>
    );
  }
}

export default App;
