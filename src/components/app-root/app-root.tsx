import { Component } from '@stencil/core';
import { SocketIoService } from './app-io';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  
  /**
   * socket io instance 
   */
  _socketService: SocketIoService = SocketIoService.getInstance();
  
  constructor() {
    this._socketService 
  }

  /**
   * inital socket usage
   */
  componentDidLoad() {    
    this._socketService.onSocketReady(() => {
      console.log('i am proud');
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='app-home' exact={true} />
              <stencil-route url='/profile/:name' component='app-profile' />
            </stencil-route-switch>
          </stencil-router>
        </main>

      </div>
    );
  }
}
