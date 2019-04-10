import { Component, Method, State } from '@stencil/core';
import { SocketIoService } from './../app-root/app-io';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false
})
export class AppHome {

  _socketService: SocketIoService = SocketIoService.getInstance();  

  //@Element() element: HTMLElement;
  @State() textInput: string;
  @State() messageStack: Array<any> = [];

  componentDidLoad() {
    this._socketService.onSocketReady(() => {
      this._socketService.onSocket('chat message', (msg: string) => {
        console.log('chat message from server', msg);
        this.messageStack = [this.messageStack, (
          <div>{msg}</div>
        )];

        //const chatMessage = document.createElement('div');
        //const textContent = document.createTextNode(msg);
        //chatMessage.appendChild(textContent);
        //this.element.appendChild(chatMessage);
      });
    });
  }

  @Method() chat(msg: string) {
    this._socketService.emitSocket('chat message', msg);
    this.textInput = "";
  }

  handleTextInput(event) {
    this.textInput = event.target.value;
  }

  render() {
    return (
      <div class='app-home'>
        <p>
          Welcome to the Stencil App Starter.
          You can use this starter to build entire apps all with
          web components using Stencil!
          Check out our docs on <a href='https://stenciljs.com'>stenciljs.com</a> to get started.
        </p>

        <input type="text" value={this.textInput} onInput={(event) => this.handleTextInput(event)}></input>

        <button onClick={() => this.chat(this.textInput)}>
          Press Me
        </button>

        <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link>

        <p>
          {this.messageStack}
        </p>
        
      </div>
    );
  }
}
