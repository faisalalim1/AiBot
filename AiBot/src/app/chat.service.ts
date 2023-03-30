import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export class Message{
  constructor(public author:string, public content:string){}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  conversation = new Subject<Message[]>();
  messageMap:any = {
    "hi": "Hello! How can I assist you today?",
    "Hi": "Hello",
    "who are you" : "I am AiBot, a large language model developed by OpenAI. I am designed to assist users in generating natural language responses to a wide range of questions and tasks. How can I assist you today?",
    "what is angular" : "Angular is a popular open-source web application development framework that was originally created by Google. It is based on TypeScript, a superset of JavaScript, and is used for building complex and scalable web applications.",
    "default" : "I can't understand you. please contact to faisal alim"
    

  }


  getBotAnswer(msg:any){
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(()=>{
      this.conversation.next([botMessage])
    },1500);
  }
  getBotMessage(question:any){
    let answer = this.messageMap[question];
    return answer || this.messageMap['default']
  }

}
