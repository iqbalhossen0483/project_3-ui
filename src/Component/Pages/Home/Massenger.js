import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const Massenger = () => {
    return (
        <div>
            <MessengerCustomerChat
                pageId="<PAGE_ID>"
                appId="<APP_ID>"
                htmlRef="<REF_STRING>"
            />,
        </div>
    );
};

export default Massenger;