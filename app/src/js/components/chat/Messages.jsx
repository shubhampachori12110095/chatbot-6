import React from 'react';
import Message from './Message.jsx';
import * as Constants from '../Constants.jsx';

class Messages extends React.Component {

    constructor(props) {
        super();
        this.messageLength = 0;
    }

    scrollToMessage() {
      const element = document.getElementById("messages-container");
      if(!this.props.isAdmin) {
        var target = $('.bubble-user').last().parent();
        if(target.length) {
          $(element).animate({
            scrollTop: target.offset().top - $(element).offset().top + $(element).scrollTop()
          });
        }
      }
    }

    render() {
        const messages = this.props.messages.map((message, i) => {
            return (
                <Message
                    key={i}
                    isAdmin={this.props.isAdmin}
                    message={message.message}
                    fromBot={message.fromBot}
                    onSend={this.props.onSend} />
            );
        });

        if(this.messageLength < messages.length) {
          this.scrollToMessage();
          this.messageLength = messages.length;
        }

        return (
            <div id="messages-container">
                {messages}
                {this.props.loading && <Message
                    message={{messageType: Constants.response.ResponseType.LOADING_MESSAGE}}
                    fromBot={true} /> }
            </div>
        );
    }
}

Messages.defaultProps = {
    messages: [],
    loading: false
};

export default Messages;