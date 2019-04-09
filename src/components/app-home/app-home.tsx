import { Component, Element, Method } from '@stencil/core';
import { SocketIoService } from './../app-root/app-io';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  @Element() element: any;

  _socketService: SocketIoService = SocketIoService.getInstance();

  componentDidLoad() {
    this._socketService.onSocketReady(() => {
      this._socketService.onSocket('chat message', () => {
        const chatMessage = document.createElement('div');
        chatMessage.textContent = "msg";
        this.element.appendChild(chatMessage);
      });
    });
  }

  @Method() chat(event: MouseEvent, msg: string) {
    this._socketService.emitSocket('chat message', msg);
    console.log(msg);
    console.log(event);
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

        <button onClick={(event) => this.chat(event, "test")}>
          Press Me
        </button>

        <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link>
        
      </div>
    );
  }
}
