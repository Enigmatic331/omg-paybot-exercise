import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { steps } from './steps/steps'

// all available props
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#1a56f0',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#3c414d',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

class App extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <ChatBot
            headerTitle="OMG PayBot"
            steps={steps}
            width="400px"
            userDelay={0}
            botDelay={0}
            style={{margin: "auto", marginTop: "2em"}}
            bubbleOptionStyle={{color: "#1a56f0", backgroundColor: "#fff"}}
            customStyle={{background: "none", boxShadow: "none"}}
            />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
