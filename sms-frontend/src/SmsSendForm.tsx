import React, {useEffect, useState} from "react";
import {Form, Input, Button, TextArea} from "semantic-ui-react";
import {useAuth} from "@clerk/clerk-react";
import precan from "./precan";


const FormComponent = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [textMessage, setTextMessage] = useState("");

    const { getToken} = useAuth();
    const [SendState, setSendState] = useState<string | null>(null);

    //use effect to set sendState after 5 seconds
    useEffect(() => {
        setTimeout(() => {
            setSendState(null);
        }, 6000);
    }, [SendState]);

    const handleChange = (event: any) => {
        const {name, value} = event.target;

        switch (name) {
            case "phoneNumber":
                setPhoneNumber(value);
                break;
            case "textMessage":
                setTextMessage(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event: any) => {

        console.log(phoneNumber, textMessage);
        //make a post request to the backend
        //fetch('http://localhost:3000/api/sms', {
        const thisToken = await getToken();
        try {
            var msg = precan.gmiHeader + textMessage + precan.gmiFooter;
            let resp = await fetch(BACKEND_URL.toString(), {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + thisToken!,
                },
                body: JSON.stringify({phoneNumber, msg}),
            });
            //read body and log it
            if(resp.status == 500) {
                setSendState("Error sending message");
                return;
            }

            let body = await resp.text();
            console.debug(msg);
            console.debug(body);
            setPhoneNumber("");
            setTextMessage("");
            setSendState("Message sent successfully");

        } catch (err) {
            console.log(err);
            setSendState("Error sending message");
        }
    };


    return (
        <div className="centered">
            <div className="text-2xl p-1">Phone Number</div>
            <input
                name="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={handleChange}
                className="p-3 rounded-3xl w-96"
            />
            <div className="text-2xl p-1">Enter your text</div>
            <textarea
                name="textMessage"
                value={textMessage}
                placeholder="Enter your text"
                onChange={handleChange}
                className="p-3 rounded-3xl w-96 h-40"
            />
            <div className="p-2"> </div>
            {/*generate an error msg if handleSubmit returns false*/}
            <Button className="outline outline-2 px-4 py-2 rounded-md bg-green-500 hover:bg-green-700" onClick={handleSubmit}>Send</Button>
            {SendState === "Error sending message" && <div className="accent-red-600 text-red-600 text-xl p-2">{SendState}</div>}
            {SendState === "Message sent successfully" && <div className="accent-green-600 text-green-500 text-xl p-2">{SendState}</div>}
        </div>
    );
};

export default FormComponent;
